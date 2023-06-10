import json
import uuid
from datetime import datetime

import boto3
from flask import Blueprint, render_template, redirect, request, flash, url_for, abort, session
import random
from . import app
import os
from . import db
import youtube_dl

from requests import get
# from youtube_dl import YoutubeDL

import yt_dlp as youtube_dl
from yt_dlp import YoutubeDL
from youtube_search import YoutubeSearch

YDL_OPTIONS = {'format': 'bestaudio', 'noplaylist': 'True', 'postprocessors': [{
    'key': 'FFmpegExtractAudio',
    'preferredcodec': 'mp3',
    'preferredquality': '192',
}]}

views = Blueprint('views', __name__)

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
        data = request.get_data()
        download_video(data["name"])
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@views.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_data()

        if users.find_one({"username": data.username}):
            return json.dumps({'success': True}, 200, {'ContentType': 'application/json'}, {'user_info': users.find_one({"username": data.username})})
        else:
            users.insert_one({
                "username": data.username,
                "word_accuracy": 0,
                "pitch_accuracy": 0,
                "total_score": 0
            })

            return json.dumps({'success': True}, 200, {'ContentType': 'application/json'}, {'user_info': users.find_one({"username": data.username})})


# renamed music_json -->  process_music
@views.route('/process_music', methods=['GET', 'POST'])
def process_music():
    if request.method == 'POST':
        data = json.loads(request.get_data())
        print(data)
        print(str(data["name"]) + " " + str(data["lines"][-1]["timeTag"]))

        video_file = download_video(data["name"], data["length"])
        separate_vocals(video_file)
        # upload_file_to_s3()

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


def download_video(song, time_length):
    results = YoutubeSearch(song, max_results=10).to_dict()

    for data in results:
        if len(data['duration'].split(":")) < 3:
            print(data["duration"].split(":"))
            time = (int(data["duration"].split(":")[0]) * 60) + int(data["duration"].split(":")[1])
            if abs(int(time) - int(time_length)) < 3:
                title = data["title"]
                with YoutubeDL(YDL_OPTIONS) as ydl:
                    try:
                        get(title)
                    except:
                        video = ydl.extract_info(f"ytsearch:{title}", download=True)['entries'][0]
                    else:
                        video = ydl.extract_info(title, download=True)
                filename = ydl.prepare_filename(video).split(".")[:-1]
                break
    # return video.get("title", None)  # No need to take the return value
    return ''.join(filename) + ".mp3"


def average_pitch(filename):
    pass


def separate_vocals(filename):
    os.system("spleeter separate -o audio_output audio_example.mp3 ")


def upload_file_to_s3(file, bucket_name, acl="public-read"):
    try:
        s3 = boto3.client(
            "s3",
            aws_access_key_id=app.config['S3_KEY'],
            aws_secret_access_key=app.config['S3_SECRET']
        )
        file.seek(0)
        s3.upload_fileobj(
            file,
            bucket_name,
            session['username'] + "/" + file.filename,
            # file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        print("Something Happened: ", e)


@views.route('/lyric_data', methods=['GET'])
def process_lyric():
    data = request.get_data()

    return json.dumps({"lyric_number": lyrics[data.lyric_number]})

@views.route('audio_ended', methods=['POST'])
def delete_audio():
    # end audio

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}