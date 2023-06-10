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

username = ""; 


@views.route('/user', methods=['GET', 'POST'])
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