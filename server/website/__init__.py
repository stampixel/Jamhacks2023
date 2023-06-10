from flask import Flask
import os
import requests
import pymongo
import urllib.parse
import base64
import uuid
import random
import datetime
import io
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)


# Setting up Flask app
def create_app() -> object:
    app.config['SECRET_KEY'] = 'o7'
    app.config["DEBUG"] = True

    from .views import views

    app.register_blueprint(views, url_prefix='/')

    return app


# Setting up Mongo Database
def create_db():
    mongo_username = urllib.parse.quote_plus(os.getenv('MONGO_USERNAME'))
    print(mongo_username)
    mongo_password = urllib.parse.quote_plus(os.getenv('MONGO_PASSWORD'))
    print(mongo_password)
    uri = f"mongodb+srv://{mongo_username}:{mongo_password}@jamhacks2023.e610bpe.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    db = client.get_database('JamHacks')

    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    return db


db = create_db()
