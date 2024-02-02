"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from sqlalchemy.exc import IntegrityError
from api.models import *
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import datetime

## JWT, PassWord Encrypt
from flask_jwt_extended import create_access_token #Token creation
from flask_jwt_extended import get_jwt_identity #Get User ID that created token
from flask_jwt_extended import jwt_required #Protect route requiring token

from flask_bcrypt import Bcrypt

# SMTP Email Sent
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from api.email_utils import send_password_reset_email

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Create a Bcrypt object
bcrypt = Bcrypt()


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def register():
    body = request.get_json(silent=True)

    if body is None: 
        return jsonify({'msg': 'You must send data in your body'}), 400
    
    if 'email' not in body or 'password' not in body:
        return jsonify({'msg': 'Email and password fields are obligatory'}), 400
    
    required_fields = ['username', 'firstname', 'lastname', 'country']

    if any(field not in body or not body[field] for field in required_fields):
        return jsonify({'msg': 'Missing or empty values for required fields'}), 400

    if '@' not in body['email']:
        return jsonify({'msg': 'Invalid email format'}), 400

    if len(body['password']) < 8:
        return jsonify({'msg': 'Password must be at least 8 characters long'}), 400

    # Check if the email already exists
    email_exists = Users.query.filter_by(email=body['email']).first()
    if email_exists:
        return jsonify({'msg': 'Email already exists'}), 400

    # Check if the username already exists
    username_exists = User_data.query.filter_by(username=body['username']).first()
    if username_exists:
        return jsonify({'msg': 'Username already exists'}), 400

    try:
        # Create the new user
        user = Users()
        user.email = body['email']
        pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
        user.password = pw_hash
        user.is_active = True
        db.session.add(user)
        db.session.commit()

        # Only create user_data if user creation is successful
        user_data = User_data()
        user_data.username = body['username']
        user_data.firstname = body['firstname']
        user_data.lastname = body['lastname']
        user_data.phone = body['phone']
        user_data.country = body['country']
        user_data.user_relationship = user 

        db.session.add(user_data)
        db.session.commit()

        return jsonify({'msg': 'User was successfully created!'}), 200

    except IntegrityError as e:
        db.session.rollback()  # Rollback the transaction
        return jsonify({'msg': 'An error occurred: IntegrityError'}), 400
    except Exception as e:
        return jsonify({'msg': f'An error occurred: {str(e)}'}), 500

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)

    if body is None:
        return jsonify({'msg': 'You must send data in your body'}), 400
    
    if 'email' not in body or 'password' not in body:
        return jsonify({'msg': 'Missing email or password fields'}), 400
    
    if '@' not in body['email']:
        return jsonify({'msg': 'Invalid email format'}), 400

    user = Users.query.filter_by(email=body['email']).first()

    if user is None:
        return jsonify({'msg': 'Invalid email or password'}), 400
    
    check_password = bcrypt.check_password_hash(user.password, body['password'])
    if check_password == False:
        return jsonify({'msg': 'Invalid email or password'}), 400
    access_token = create_access_token(identity=user.id, additional_claims={'role': user.role})
    return jsonify({'msg': 'Login successful!', 'token': access_token}), 200

@api.route('/photo-uploader', methods=['POST'])
def photo_uploader():
    
    body = request.get_json(silent=True)

    if body is None:
        return jsonify({'msg': 'You must send information in the body'}), 400
    if 'name' not in body:
        return jsonify({'msg': 'The name field is required'}), 400
    if 'img_url' not in body:
        return jsonify({'msg': 'The img_url field is required'}), 400
    if 'description' not in body:
        return jsonify({'msg': 'The description field is required'}), 400
    if 'category_id' not in body:
        return jsonify({'msg': 'The category field is required'}), 400
    if 'user_id' not in body:
        return jsonify({'msg': 'The user field is required'}), 400

    # Validation user exists
    user = Users.query.filter_by(id = body['user_id']).first()
    
    if user is None:
        return jsonify({'msg': 'The user is incorrect or not exist'}), 400
    
    # Validation category exists
    photo_category = Photo_categories.query.filter_by(id = body['category_id']).first()

    if photo_category is None:
        return jsonify({'msg': 'The photo category is incorrect or not exist'}), 400

    photo = Photos()
    photo.name = body['name']
    photo.img_url = body['img_url']
    photo.description = body['description']
    photo.category_id = body['category_id']
    photo.user_id = body['user_id']

    # Assign event_id only if present in the request
    if 'event_id' in body:
        # Validation event exists
        event = Events.query.filter_by(id=body['event_id']).first()

        if event is None:
            return jsonify({'msg': 'The event is incorrect or not exist'}), 400

        photo.event_id = body['event_id']

    db.session.add(photo)
    db.session.commit()
    return jsonify({'msg': 'ok'}), 200


def generate_change_password_token(email):
    expire = datetime.timedelta(hours=1)
    token = create_access_token(identity=email, expires_delta=expire)
    return token


@api.route('/reset-password', methods=['POST'])
def reset_password():
    body = request.get_json(silent=True)

    if body is None:
        return jsonify({'error': 'No JSON data provided in the request'}), 400
    
    if 'email' not in body:
        return jsonify({'message': 'Required fields are missing'}), 400

    existing_user = Users.query.filter_by(email=body['email']).first()

    if existing_user:
        existing_user = db.session.query(Users).filter_by(id=existing_user.id).options(db.joinedload('user_data')).first()
        print(existing_user.serialize())
        send_password_reset_email(existing_user.email, existing_user.user_data.firstname)
        return jsonify({'message': 'Request received. If the email is registered, you will receive a link to reset your password.'}), 200
    return jsonify({'message': 'Request received. If the email is registered, you will receive a link to reset your password.'}), 200


@api.route('/password-update', methods=['POST'])
@jwt_required()
def password_update():
    try:
        body = request.get_json(silent=True)

        if body is None:
            return jsonify({'error': 'No JSON data provided in the request'}), 400
    
        if 'password' not in body:
            return jsonify({'message': 'Required fields are missing'}), 400
        
        new_password = body['password']
        current_user = get_jwt_identity()

        user = Users.query.filter_by(email=current_user).first()

        if not user:
            return jsonify({"message": "User not found"}), 404
        
        user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')

        db.session.commit()

        return jsonify({"message": "Password update successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        print(f"Error updating password: {str(e)}")
        return jsonify({"message": "Error updating password"})

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'msg': 'Ok', 'user': current_user}), 200


# Agregar evento al usuario
@api.route('/events/int:event_id/join', methods=['POST'])
@jwt_required()
def join_event(event_id):
    try:
        current_user_id = get_jwt_identity()

        existing_registration = User_events.query.filter_by(user_id=current_user_id,event_id=event_id).first()
        if existing_registration:
            return jsonify({'msg': 'User is already registered for this event'}), 400
        
        event = Events.query.get(event_id)
        if not event:
            return jsonify({'msg': 'Event not found'}), 404
        
        user_event = User_events(user_id=current_user_id, event_id=event_id)
        db.session.add(user_event)
        db.session.commit()

        return jsonify({'msg': 'Successfully joined the event'}), 200
    
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred: IntegrityError'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500