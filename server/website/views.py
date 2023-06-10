import json
import uuid
from datetime import datetime
from flask import Blueprint, render_template, redirect, request, flash, url_for, abort, session
import random
from . import app
import os
from . import db

views = Blueprint('views', __name__)

users = db.Users; 

# THIS IS A TEST METHOD
@views.route('/profile')
def profile():
    response_body = {
        "name": "Kevin",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

# THIS IS A TEST METHOD
@views.route('/receive', methods=['GET', 'POST'])
def data():
    if request.method == 'POST':
        print("asd")
        data = request.get_data()
        print(data)

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@views.route('/receive', methods=['GET', 'POST'])
def data():
    if request.method == 'POST':
        data = request.get_data()
        print(data)

        user = users.find_one({"username": data.username})

        if (user): 
            username = user.username; 
        else: 
            users.insert_one({
                "username": data.username, 
                "word_accuracy": 0, 
                "pitch_accuracy": 0,
                "total_score": 0
            })

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@views.route('/music_json', methods=['GET', 'POST'])
def music_json():
    if request.method == 'POST':
        data = request.get_data()
        print(data)

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
