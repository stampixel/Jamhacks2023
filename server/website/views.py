import json
import uuid
from datetime import datetime
from flask import Blueprint, render_template, redirect, request, flash, url_for, abort, session
import random
from . import app
import os
from . import db
import youtube_dl

YTDL_OPTIONS = {
    'format': 'bestaudio/best',
    'extractaudio': True,
    'audioformat': 'mp3',
    'outtmpl': '%(extractor)s-%(id)s-%(title)s.%(ext)s',
    'restrictfilenames': True,
    'noplaylist': True,
    'nocheckcertificate': True,
    'ignoreerrors': False,
    'logtostderr': False,
    'quiet': True,
    'no_warnings': True,
    'default_search': 'ytsearch',
    'source_address': '0.0.0.0',
}

views = Blueprint('views', __name__)
ytdl = youtube_dl.YoutubeDL(YTDL_OPTIONS)


users = db.Users

lyrics = []

# THIS IS A TEST METHOD
@views.route('/profile')
def test_profile():
    response_body = {
        "name": "Kevin",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body


# THIS IS A TEST METHOD
@views.route('/receive', methods=['GET', 'POST'])
def test_data():
    if request.method == 'POST':
        print("asd")
        data = request.get_data()
        print(data)

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@views.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_data()

        if users.find_one({"username": data.username}):
            # Login the user here

            pass
        else:
            users.insert_one({
                "username": data.username,
                "word_accuracy": 0,
                "pitch_accuracy": 0,
                "total_score": 0
            })

    return json.dumps({'success': True}), 200, {'ContentType': 'app~lication/json'}


@views.route('/music_json', methods=['GET', 'POST'])
def music_json():
    if request.method == 'POST':
        data = request.get_data()
        print(data)

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

@views.route('/lyric_data', methods=['GET'])
def process_lyric():
    data = request.get_data()

    return json.dumps({"lyric_number": lyrics[data.lyric_number]}); 