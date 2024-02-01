"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import smtplib
from flask import Flask, request, jsonify, url_for, send_from_directory, make_response
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import *
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS

from flask_jwt_extended import create_access_token #Token creation
from flask_jwt_extended import get_jwt_identity #Get User ID that created token
from flask_jwt_extended import jwt_required #Protect route requiring token
from flask_jwt_extended import JWTManager #Link our app with JWT

from flask_bcrypt import Bcrypt

# EMAIL
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from api.email_utils import send_password_reset_email, generate_reset_link

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = os.environ.get('C08D16F86116A1345802D6A77BE186F662A88B144A72D191BFBD80CACF9BFE20')
jwt = JWTManager(app)


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/register', methods=['POST'])
def register(): 
    body = request.get_json(silent=True)

    if body is None: 
        return jsonify({'msg': 'You must send data in your body'}), 400
    
    if 'email' not in body or 'password' not in body:
        return jsonify({'msg': 'Email and password fields are obligatory'}), 400
    
    required_fields = ['username', 'firstname', 'lastname', 'phone', 'country']
    if any(field not in body or not body[field] for field in required_fields):
        return jsonify({'msg': 'Missing or empty values for required fields'}), 400

    if '@' not in body['email']:
        return jsonify({'msg': 'Invalid email format'}), 400

    if len(body['password']) < 8:
        return jsonify({'msg': 'Password must be at least 8 characters long '}), 400

    if not any(char.isdigit() for char in body['password']):
        return jsonify({'msg': 'Password must contain at least 1 digit'}), 400

    user_exists = Users.query.filter_by(email='email').first() is not None
    if user_exists:
        return jsonify({'msg': 'User already exists'}), 409
    
    user = Users()
    user.email = body['email']
    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    user.password = pw_hash
    user.is_active = True
    db.session.add(user)
    db.session.commit()
    
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

@app.route('/login', methods=['POST'])
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
    access_token = create_access_token(identity=user.id) 
    return jsonify({'msg': 'Login successful!', 'token': access_token}), 200


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'msg': 'Ok', 'user': current_user}), 200

@app.route('/events', methods=['GET'])
def get_all_events():
    try:
        events = Events.query.all()
        if not events: 
            return jsonify({'msg': 'No hay eventos disponibles'})
        
        serialized_events = [event.serialize() for event in events]
        response = jsonify(serialized_events)
        response.headers['Content-Type'] = 'application/json'

        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    try:
        event = Events.query.get(event_id)
        if not event:
            return jsonify({'msg': 'Evento no encontrado'}), 404

        serialized_event = event.serialize()

        response = make_response(jsonify(serialized_event))
        response.headers['Content-Type'] = 'application/json'

        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/photo_uploader', methods=['POST'])
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

@app.route('/reset_password', methods=['POST'])
def reset_password():
    body = request.get_json(silent=True)
    if body is None or 'email' not in body:
        return jsonify({'msg': 'Invalid request'}), 400

    user = Users.query.filter_by(email=body['email']).first()

    if user is None:
        return jsonify({'msg': 'User not found'}), 404

    # Genera un token único para el enlace de restablecimiento de contraseña
    reset_token = generate_reset_link()
    reset_link = f'https://jubilant-spork-x4wj5rv54qgfgw7-3000.app.github.dev/forgot-password/{reset_token}'

    # Almacena el token en la base de datos o en un sistema de caché para su verificación posterior

    # Envía el enlace de restablecimiento al correo del usuario
    send_password_reset_email(user.email, reset_link)

    return jsonify({'msg': 'Password reset link sent successfully'}), 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
