"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, make_response
from sqlalchemy.exc import IntegrityError
from api.models import *
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_cors import cross_origin
from cloudinary.uploader import *
import datetime
import os

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


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200


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

## SUBIR FOTO A API CLOUDINARY
@api.route('/upload-photos', methods=['POST'])
@jwt_required()
def upload_photos():
    try:
        if 'photos' not in request.files:
            return jsonify({'msg': 'No files part in the request'}), 400

        files = request.files.getlist('photos')

        import datetime
        unique_folder_name = datetime.datetime.now().strftime("%Y%m%d%H%M%S")

        img_urls = []

        for file in files:
            if file.filename == '':
                return jsonify({'msg': 'No selected file'}), 400

            allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}
            if file.filename.split('.')[-1].lower() not in allowed_extensions:
                return jsonify({'msg': 'Invalid file format'}), 400

            try:
                cloudinary_response = upload(file, folder=unique_folder_name)
                img_url = cloudinary_response['secure_url']
                img_urls.append(img_url)
            except cloudinary.api.Error as e:
                return jsonify({'msg': f'Cloudinary error: {str(e)}'}), 500

        return jsonify({'msg': 'ok', 'img_urls': img_urls, 'folder_name': unique_folder_name}), 200

    except Exception as e:
        return jsonify({'msg': str(e)}), 500

## CREAR PHOTO EN BD CON URLS DE CLOUDINARY
@api.route('/create-photos', methods=['POST'])
@jwt_required()
@cross_origin() 
def create_photos():
    try:

        body = request.get_json(silent=True)

        if body is None:
            return jsonify({'msg': 'Invalid JSON in request body'}), 400

        name = body.get('name')
        description = body.get('description')
        category_id = body.get('category_id')
        user_id = body.get('user_id')
        event_id = body.get('event_id')
        img_urls = body.get('img_urls')

        user = Users.query.filter_by(id=user_id).first()
        if user is None:
            return jsonify({'msg': 'The user is incorrect or not exist'}), 400

        photo_category = Photo_categories.query.filter_by(id=category_id).first()
        if photo_category is None:
            return jsonify({'msg': 'The photo category is incorrect or not exist'}), 400

        for img_url in img_urls:
            photo = Photos(
                name=name,
                img_url=img_url,
                description=description,
                category_id=category_id,
                user_id=user_id,
                event_id=None
            )

            # Assign event_id only if present in the request and not an empty string
            if event_id and event_id.strip():  # Asegúrate de que event_id no sea una cadena vacía
                # Validation event exists
                event = Events.query.filter_by(id=event_id).first()
                if event is None:
                    return jsonify({'msg': 'The event is incorrect or not exist'}), 400
                photo.event_id = event_id

            # Save the Photo instance to the database
            db.session.add(photo)

        # Commit changes after processing all photos
        db.session.commit()
        print("Photos created successfully!")

        return jsonify({'msg': 'ok', 'img_urls': img_urls}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'msg': str(e)}), 500
#borrar foto de cloudinary y de la bbdd
@api.route('/delete-photo/<int:photo_id>', methods=['DELETE'])
@jwt_required()
def delete_photo(photo_id):
    try:
        # Obtén la foto de la base de datos
        photo = Photos.query.get(photo_id)
        if photo is None:
            return jsonify({'msg': 'Photo not found'}), 404

        # Obtén la URL de la imagen desde la base de datos
        # img_url = photo.img_url

        # # Elimina la imagen de Cloudinary
        # cloudinary_response = cloudinary.uploader.destroy(img_url)
        # if cloudinary_response.get('result') != 'ok':
        #     return jsonify({'msg': 'Failed to delete photo from Cloudinary'}), 500

        # Elimina la foto de la base de datos
        db.session.delete(photo)
        db.session.commit()

        return jsonify({'msg': 'Photo deleted successfully'}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'msg': str(e)}), 500




##traer datos de mi foto por id 
@api.route('/get-photo/<int:photo_id>', methods=['GET'])
@jwt_required()
@cross_origin() 
def get_photoData(photo_id): 
    try:
        photo = Photos.query.filter_by(id=photo_id).first()
        
        if photo is None:
            return jsonify({'msg': 'Photo not found'}), 404
        
        photo_data = {
            'id': photo.id,
            'name': photo.name,
            'img_url': photo.img_url,
            'description': photo.description,
            'category_id': photo.category_id,
            'user_id': photo.user_id,
            'event_id': photo.event_id
        }

        return jsonify({'msg': 'ok', 'photo': photo_data}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'msg': str(e)}), 500

#traer fotos por usuario - con url y datos 
@api.route('/get-user-photos/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_photos(user_id):
    try:
        current_user_id = get_jwt_identity()

        # Verificar si el usuario actual coincide con el usuario solicitado
        if current_user_id != user_id:
            return jsonify({'msg': 'Unauthorized'}), 401
        
        user_photos = Photos.query.filter_by(user_id=user_id).all()

        # Si no hay fotos para el usuario, devolver un mensaje indicando que no se encontraron fotos
        if not user_photos:
            return jsonify({'msg': 'No photos found for the user'}), 200

        # Serializar cada objeto de foto
        serialized_photos = []
        for photo in user_photos:
            serialized_photos.append({
                'id': photo.id,
                'name': photo.name,
                'img_url': photo.img_url,
                'description': photo.description,
                'category_id': photo.category_id,
                'user_id': photo.user_id,
                'event_id': photo.event_id
            })

        return jsonify({'msg': 'ok', 'photos': serialized_photos}), 200

    except Exception as e:
        return jsonify({'msg': str(e)}), 500
    
#traer fotos por id del evento
@api.route('/get-event-photos/<int:event_id>', methods=['GET'])
@jwt_required()
def get_event_photos(event_id): 
    try:
        event_photos = Photos.query.filter_by(event_id=event_id).all()

        if not event_photos:
            return jsonify({'msg': 'No hay fotos disponibles para el evento con ID {}'.format(event_id)}), 200
        
        serialized_photos = []
        for photo in event_photos:
            serialized_photos.append({
                'id': photo.id,
                'name': photo.name,
                'img_url': photo.img_url,
                'description': photo.description,
                'category_id': photo.category_id,
                'user_id': photo.user_id,
                'event_id': photo.event_id
            })

        return jsonify({'msg': 'ok', 'photos': serialized_photos}), 200
    
    except Exception as e:
        return jsonify({'error': 'Error al procesar la solicitud: {}'.format(str(e))}), 500


#traer todas las fotos de la bbdd (para galeria)
@api.route('/get-all-photos', methods=['GET'])
def get_all_photos():
    try:
       
        all_photos = Photos.query.all()

        if not all_photos:
            return jsonify({'msg': 'No photos found'}), 404

        serialized_photos = []
        for photo in all_photos:
            serialized_photos.append({
                'id': photo.id,
                'name': photo.name,
                'img_url': photo.img_url,
                'description': photo.description,
                'category_id': photo.category_id,
                'user_id': photo.user_id,
                'event_id': photo.event_id
            })

        return jsonify({'msg': 'ok', 'photos': serialized_photos}), 200

    except Exception as e:
        return jsonify({'msg': str(e)}), 500

## BUSCAR FOTOS POR PUBLICACION PASANDO SEGUNDO PARAMETRO similar a este: 20240203163046
@api.route('/get-photos-by-post/<string:post_id>', methods=['GET'])
def get_photos_by_post(post_id):
    try:
        post_photos = Photos.query.filter(Photos.img_url.contains(post_id)).all()

        if not post_photos:
            return jsonify({'msg': 'No photos found for the post'}), 404

        img_urls = [photo.img_url for photo in post_photos]
        return jsonify({'msg': 'ok', 'img_urls': img_urls}), 200

    except Exception as e:
        return jsonify({'msg': str(e)}), 500

@api.route('/events', methods=['GET'])
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
        return jsonify({'error': 'Error al serializar los eventos'}), 500

@api.route('/events/<int:event_id>', methods=['GET'])
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


# Generate token to reset password
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

## Create event by admin user
@api.route('/event/create', methods=['POST'])
@jwt_required()
def crate_event():

    current_user_id = get_jwt_identity()
    user = Users.query.filter_by(id=current_user_id).first()

    if user.role != "admin":
        return {"message": "Unauthorized"}, 403

    try:
        data = request.get_json()

        new_event = Events(
            name=data.get("name"),
            description=data.get("description"),
            category_id=data.get("category_id"),
            start_date=data.get("start_date"),
            end_date=data.get("end_date")
        )

        db.session.add(new_event)
        db.session.commit()

        return {"message": "Event created successfully", "event": new_event.serialize()}, 201
    except Exception as e:
        return {"message": "Error creating event", "error": str(e)}, 500

@api.route('/event/update', methods=['PUT'])
@jwt_required()
def update_event():
    try:
        current_user_id = get_jwt_identity()
        event_id = request.json.get('event_id')
        new_data = request.json.get('new_data', {})
        
        event = Events.query.get(event_id)
        
        if not event:
            return jsonify({'msg': 'Evento no encontrado'}), 404
        
        # Actualizar los campos del evento con los nuevos datos
        event.name = new_data.get('name', event.name)
        event.description = new_data.get('description', event.description)
        event.category_id = new_data.get('category_id', event.category_id)
        event.start_date = new_data.get('start_date', event.start_date)
        event.end_date = new_data.get('end_date', event.end_date)

        db.session.commit()

        updated_event_data = event.serialize()  # Serializar el evento actualizado
        return jsonify(updated_event_data), 200
    
    except Exception as e: 
        return jsonify({'error': str(e)}), 500


# Agregar evento al usuario
@api.route('/events/<int:event_id>/join', methods=['POST'])
@jwt_required()
def join_event(event_id):
    try:
        current_user_id = get_jwt_identity()

        existing_registration = User_events.query.filter_by(user_id=current_user_id,event_id=event_id).first()

        print(existing_registration)

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

#crear categoria de foto (admin)
@api.route('/create-category', methods=["POST"])
def create_category():
    data = request.get_json()
    new_category = Photo_categories(name=data.get('name'))
    
    try: 
        db.session.add(new_category)
        db.session.commit()
        
        return jsonify({'msg': 'Categoria creada con exito'}),201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}),500
    
#traer categorías de foto 
@api.route('/categories', methods=["GET"])
def get_all_categories():
    try:
        categories = Photo_categories.query.all()
        
        if not categories:
            return jsonify({'msg': 'No se encontraron categorias'}),404
        
        serialized_categories = [category.serialize() for category in categories]
        response = jsonify(serialized_categories)
        response.headers['Content-Type'] = 'application/json'
        return response,200
    except Exception as e: 
        return jsonify({'error': str(e) }), 500

    
# dar de baja el evento 
@api.route('/events/<int:event_id>/leave', methods=['DELETE'])
@jwt_required()
def leave_event(event_id):
    try:
        current_user_id = get_jwt_identity()

        # Buscar la relación entre el usuario y el evento
        user_event = User_events.query.filter_by(user_id=current_user_id, event_id=event_id).first()

        if not user_event:
            return jsonify({'msg': 'User is not registered for this event'}), 404

        # Eliminar la relación
        db.session.delete(user_event)
        db.session.commit()

        return jsonify({'msg': 'Successfully left the event'}), 200

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred: IntegrityError'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/events/user-joined', methods=['GET'])
@jwt_required()
def get_user_joined_events():
    try:
        current_user_id = get_jwt_identity()

        # Obtener todos los eventos a los que el usuario se ha unido
        joined_events = User_events.query.filter_by(user_id=current_user_id).all()

        serialized_events = [event.event_relationship.serialize() for event in joined_events]

        return jsonify(serialized_events), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
#traer datos del usuario por el token
@api.route('/user-data', methods=['GET'])
@jwt_required() 
def get_user_data():
    try:
        current_user_id = get_jwt_identity()
        user_data = User_data.query.filter_by(user_id=current_user_id).first()

        if not user_data:
            return jsonify({'msg': 'Datos del usuario no encontrados'}), 404

        serialized_user_data = user_data.serialize()

        return jsonify(serialized_user_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

#traer datos del usuario por user_id
@api.route('/user-data/<int:user_id>', methods=['GET'])
def get_user_data_by_id(user_id):
    try:
        user_data = User_data.query.filter_by(user_id=user_id).first()

        if not user_data:
            return jsonify({'msg': 'Datos del usuario no encontrados'}), 404

        serialized_user_data = user_data.serialize()

        return jsonify(serialized_user_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@api.route('/update-user-data', methods=['PUT'])
@jwt_required() 
def update_user_data():
    try:
        current_user_id = get_jwt_identity()
        new_data = request.json
        user = User_data.query.get(current_user_id)
        
        if not user:
            return jsonify({'msg': 'usuario no encontrado'}),404
        
        user.firstname = new_data.get('firstname', user.firstname)
        user.lastname = new_data.get('lastname', user.lastname)
        user.username = new_data.get('username', user.username)
        user.phone = new_data.get('phone', user.phone)
        user.country = new_data.get('country', user.country)

        db.session.commit()

        update_user_data = {
            'firstname': user.firstname,
            'lastname': user.lastname,
            'username': user.username,
            'phone': user.phone,
            'country': user.country
        }
        return jsonify(update_user_data),200
    
    except Exception as e: 
        return jsonify({'error': str(e)}),500

#actualizar datos de la foto(like)
@api.route('/update-photo-likes/<int:photo_id>', methods=['PUT'])
@jwt_required()
def update_photo_like(photo_id):
    try: 
        
        new_likes_data = request.json
        photo = Photos.query.get(photo_id)

        if not photo:
            return jsonify({'msg': 'Foto no encontrada'}),404
        #actualiza los likes de la foto
        photo.like = new_likes_data.get('likes', photo.like)

        db.session.commit()
        updated_photo_data = {
            'id': photo.id,
            'name': photo.name,
            'img_url': photo.img_url,
            'description': photo.description,
            'likes': photo.like,
        }

        return jsonify(updated_photo_data), 200
    
    except Exception as e: 
        return jsonify({'error': str(e)}),500

@api.route('/deactivate_account', methods=['POST'])
@jwt_required()
def deactivate_account():
    current_user_id = get_jwt_identity()

    user = Users.query.get(current_user_id)

    if user is None:
        return jsonify({'msg': 'User not found'}), 404

    user.is_active = False
    db.session.commit()

    return jsonify({'msg': 'Account deactivated successfully!'}), 200

