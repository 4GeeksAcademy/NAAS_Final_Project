"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.models import *
from api.admin import setup_admin
from api.commands import setup_commands

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

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



# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
