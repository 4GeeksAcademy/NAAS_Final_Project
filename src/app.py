"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import smtplib
import datetime

from flask import Flask, request, jsonify, url_for, send_from_directory, make_response
from flask_migrate import Migrate
from flask_swagger import swagger

from api.utils import APIException, generate_sitemap
from api.models import *
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_cors import CORS

from cloudinary.uploader import upload
from cloudinary import config as cloudinary_config

from datetime import timedelta

from flask_jwt_extended import JWTManager, create_access_token
from flask_bcrypt import Bcrypt

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)

# Configuración de Cloudinary
cloudinary_config ( 
  cloud_name=os.environ.get('CLOUD_NAME'), 
  api_key=os.environ.get('API_KEY'),
  api_secret=os.environ.get('API_SECRET'),
)

app.url_map.strict_slashes = False

# Initialize the JWTManager with your app
jwt = JWTManager(app)
# Create a Bcrypt object
bcrypt = Bcrypt()

#CORS
CORS(app)

# Database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Add the admin
setup_admin(app)

# Add the admin
setup_commands(app)

# Add all endpoints from the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

ACCESS_TOKEN_EXPIRATION = timedelta(hours=1);

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
    if not check_password:
        return jsonify({'msg': 'Invalid email or password'}), 400
    
    # Generar el token con la expiración configurada
    access_token = create_access_token(identity=user.id, additional_claims={'role': user.role}, expires_delta=ACCESS_TOKEN_EXPIRATION)
    
    return jsonify({'msg': 'Login successful!', 'token': access_token}), 200


# @app.route('/events', methods=['GET'])
# def get_all_events():
#     try:
#         events = Events.query.all()
#         if not events: 
#             return jsonify({'msg': 'No hay eventos disponibles'})
        
#         serialized_events = [event.serialize() for event in events]
#         response = jsonify(serialized_events)
#         response.headers['Content-Type'] = 'application/json'

#         return response, 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500



# @app.route('/events/<int:event_id>', methods=['GET'])
# def get_event(event_id):
#     try:
#         event = Events.query.get(event_id)
#         if not event:
#             return jsonify({'msg': 'Evento no encontrado'}), 404

#         serialized_event = event.serialize()

#         response = make_response(jsonify(serialized_event))
#         response.headers['Content-Type'] = 'application/json'

#         return response, 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

