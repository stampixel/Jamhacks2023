import json
import uuid
from datetime import datetime
from flask import Blueprint, render_template, redirect, request, flash, url_for, abort, session
import random
from . import app
import os

views = Blueprint('views', __name__)


# Index page
@views.route('/profile')
def profile():

    response_body = {
        "name": "Kevin",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body


@views.route('/receive', methods=['GET', 'POST'])
def data():
    if request.method == 'POST':
        print("asd")
        data = request.get_data()
        print(data)

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
