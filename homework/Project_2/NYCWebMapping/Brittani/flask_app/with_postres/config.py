from os import environ

class Config: 

    TESTING = environ.get('TESTING')
    FLASK_DEBUG = environ.get('FLASK_DEBUG')
    SECRET_KEY = environ.get('SECRET_KEY')

    SQLALCHEMY_DATABASE_URI = environ.get('postgresql://postgres:Franklin#4@localhost:5432/urban_planning')
    SQLALCHEMY_TRACK_MODIFICATIONS = environ.get('QLALCHEMY_TRACK_MODIFICATIONS')