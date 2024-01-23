  
import os
from flask_admin import Admin
from .models import db, Users, User_data, Followers, Achievements, User_achievements, Photo_categories, Events, Photos, Photo_comments, Photo_likes, Favorite_Photos
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Users, db.session))
    admin.add_view(ModelView(User_data, db.session))
    admin.add_view(ModelView(Followers, db.session))
    admin.add_view(ModelView(Achievements, db.session))
    admin.add_view(ModelView(User_achievements, db.session))
    admin.add_view(ModelView(Photo_categories, db.session))
    admin.add_view(ModelView(Events, db.session))
    admin.add_view(ModelView(Photos, db.session))
    admin.add_view(ModelView(Photo_comments, db.session))
    admin.add_view(ModelView(Photo_likes, db.session))
    admin.add_view(ModelView(Favorite_Photos, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))