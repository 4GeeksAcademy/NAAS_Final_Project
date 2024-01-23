from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '{}'.format(self.email)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breachs
        }

class User_data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    country = db.Column(db.String(50))

    ## RELATIONSHIP
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_id_relationship = db.relationship(Users)

    def __repr__(self):
        return '{}'.format(self.username)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "phone": self.phone,
            "country": self.country,
        }
    
class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
 
    ## RELATIONSHIP user_id
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_id_relationship = db.relationship('Users', foreign_keys=[user_id])

    ## RELATIONSHIP following_user_id
    following_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_user_relationship = db.relationship('Users', foreign_keys=[following_user_id])

    def __repr__(self):
        return '{}'.format(self.id)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "following_user_id": self.following_user_id,
        }

class Achievements(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    img_url = db.Column(db.String(250))
    
    def __repr__(self):
        return '{}'.format(self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "img_url": self.img_url,
        }
    
class User_achievements(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    achievement_date = db.Column(db.DateTime, default=datetime.utcnow() - timedelta(hours=3))


    ## RELATIONSHIP achievement_id
    achievement_id = db.Column(db.Integer, db.ForeignKey('achievements.id'))
    achievement_relationship = db.relationship('Achievements')

    ## RELATIONSHIP user_id
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_relationship = db.relationship('Users')

    def __repr__(self):
        return '{} {}'.format(self.id, self.name)

    def serialize(self):
        return {
            "id": self.id,
            "achievement_date": self.achievement_date,
            "achievement_name": self.achievement_relationship.name,
            "user_email": self.user_relationship.email,
        }

class Photo_categories(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    def __repr__(self):
        return '{}'.format(self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

class Events(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

    ## Relationship photo_categories
    category_id = db.Column(db.Integer, db.ForeignKey('photo_categories.id'))
    category_relationship = db.relationship('Photo_categories')

    start_date = db.Column(db.DateTime, default=datetime.utcnow() - timedelta(hours=3))
    end_date = db.Column(db.DateTime, default=datetime.utcnow() - timedelta(hours=3))


    def __repr__(self):
        return '{}'.format(self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "photo_category": self.category_relationship.name,
            "start_date": self.start_date,
            "end_date": self.end_date,
        }

class Photos(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    description = db.Column(db.String(250))
    img_url = db.Column(db.String(250))

    ## Relationship photo_categories
    category_id = db.Column(db.Integer, db.ForeignKey('photo_categories.id'))
    category_relationship = db.relationship('Photo_categories')

    ## Relationship users
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_relationship = db.relationship('Users')

    ## Relationship events
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    event_relationship = db.relationship('Events')

    def __repr__(self):
        return '{}'.format(self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "img_url": self.img_url,
            "description": self.description,
            "photo_category": self.category_relationship.name,
            "user": self.user_relationship.email,
            "event": self.event_relationship.name,
        }

class Photo_comments(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String(250))
    date_time = db.Column(db.DateTime, default=datetime.utcnow() - timedelta(hours=3))

    ## Relationship photos
    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'))
    photo_relationship = db.relationship('Photos')

    ## Relationship users
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_relationship = db.relationship('Users')

    def __repr__(self):
        return '{}'.format(self.id)

    def serialize(self):
        return {
            "id": self.id,
            "comment_text": self.comment_text,
            "date_time": self.date_time,
            "photo": self.photo_relationship.name,
            "user": self.user_relationship.email,
        }

class Photo_likes(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    ## Relationship photos
    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'))
    photo_relationship = db.relationship('Photos')

    ## Relationship users
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_relationship = db.relationship('Users')

    def __repr__(self):
        return '{}'.format(self.id)

    def serialize(self):
        return {
            "id": self.id,
            "favorite_photo": self.photo_relationship.name,
            "user": self.user_relationship.email,
        }

class Favorite_Photos(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    ## Relationship photos
    favorite_photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'))
    favorite_photo_relationship = db.relationship('Photos')

    ## Relationship users
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_relationship = db.relationship('Users')

    def __repr__(self):
        return '{}'.format(self.id)

    def serialize(self):
        return {
            "id": self.id,
            "favorite_photo": self.favorite_photo_relationship.name,
            "user": self.user_relationship.email,
        }




