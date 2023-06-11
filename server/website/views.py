import json
import uuid
from datetime import datetime
from flask import Blueprint, render_template, redirect, request, flash, url_for, abort, session
import random
from . import app
import os
from . import db
import youtube_dl
from bson import json_util
import shutil
from unidecode import unidecode
import librosa
import numpy as np

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
        data = json.loads(request.get_data())

        user = users.find_one({"username": data["username"]})
        if user:
            return json.loads(json_util.dumps(users.find_one({"username": data["username"]})))
            return users.find_one({"username": data["username"]})
        else:
            new_user = {
                "username": data["username"],
                "word_accuracy": 0,
                "pitch_accuracy": 0,
                "score": 0
            }
            users.insert_one(new_user)

            return json.loads(json_util.dumps(new_user))
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@views.route('/scores', methods=['GET', 'POST'])
def calcScore():
    if (request.method == 'POST'):
        data = request.get_data()
        newData = json.loads(data)

        user = users.find_one({"username": newData["username"]});
        if (user):
            users.updateOne(
                {"word_accuracy": newData["wordAccuracy"]},
                {"pitch_accuracy": newData["pitchAccuracy"]},
                {"score": newData["score"]}
            )
    elif (request.method == 'GET'):
       allUsers = users.find()

       # allUsers.sort(key=lambda x: x["score"])
       return json.loads(json_util.dumps(allUsers))
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


# renamed music_json -->  process_music
@views.route('/process_music', methods=['GET', 'POST'])
def process_music():
    if request.method == 'POST':
        import os

        data = json.loads(request.get_data())

        audio_file = download_video(data["name"], data["length"])

        if data["vocals"]:
            if not os.path.exists("../public/audio_output"):
                os.makedirs("../public/audio_output")
            filename = unidecode(audio_file).replace(" ", "")
            os.rename(audio_file, "../public/audio_output/" + filename)
            # os.rename(audio_file, "../public/audio_output/" + "bye2.mp3")

            pitches = []
            # for i in data["lines"]: 
            #      pitches.append(get_average_pitch("../public/audio_output/"+filename, i["timeTag"], i["endTag"]))

            for i in range(int(data["length"])): 
                # if (i >= data["lines"][i]["timeTag"] and i <= data["lines"][i]["endTag"]): 
                #     pitches.append((get_average_pitch("../public/audio_output/"+filename, i, i + 2))%220)
                # else:
                #     pitches.append(50)
                # i += 1

                pitches.append((get_average_pitch("../public/audio_output/"+filename, i, i + 2))%220)
                i += 1

            #return {"fileLocation": f"audio_output/{audio_file}"}
            return {"fileLocation": f"audio_output/{filename}", "timeTags": pitches}

        else:
            filename = separate_vocals(audio_file)
            os.rename("../public/audio_output/" + os.path.splitext(filename)[0],
                      "../public/audio_output/" + unidecode(os.path.splitext(filename)[0]).replace(" ", ""))
            
            pitches = []
            # for i in data["lines"]: 
            #     pitches.append(get_average_pitch("../../public/audio_output/"+os.path.splitext(filename)[0]+"/accompaniment.wav", i["timeTag"], i["endTag"]))

            for i in range(int(data["length"])): 
                pitches.append(get_average_pitch("../public/audio_output/"+os.path.splitext(filename)[0]+"/accompaniment.wav"+filename, i, i + 2))
                i += 1
                # if (i >= data["lines"][i]["timeTag"] and i <= data["lines"][i]["timeTag"]): 
                #     pitches.append(get_average_pitch("../public/audio_output/"+os.path.splitext(filename)[0]+"/accompaniment.wav"+filename, i, i + 2))
                # else:
                #     pitches.append(50)

                # i += 1
            
            return {"fileLocation": f"audio_output/{os.path.splitext(filename)[0]}/accompaniment.wav", "timeTags": pitches}

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


def download_video(song, time_length):
    results = YoutubeSearch(song, max_results=50).to_dict()

    for data in results:
        if len(data['duration'].split(":")) < 3:
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
                filename = os.path.splitext(ydl.prepare_filename(video))[:-1]
                break
    # return video.get("title", None)  # No need to take the return value
    return ''.join(filename) + ".mp3"


def get_average_pitch(wav_file, start_time, end_time):
    # Load the audio file
    audio, sr = librosa.load(wav_file)
    
    # Calculate the start and end samples based on time
    start_sample = int(start_time * sr)
    end_sample = int(end_time * sr)
    
    # Extract the desired segment from the audio
    segment = audio[start_sample:end_sample]
    
    # Define the pitch search range
    fmin = 100 
    fmax = 2000 

    pitches = librosa.yin(segment, fmin=fmin, fmax=fmax, sr=sr)
    pitch_values = pitches[np.nonzero(pitches)]
    
    # Calculate the average pitch
    average_pitch = np.mean(pitch_values)
    
    return average_pitch


def separate_vocals(filename):
    # files = [f for f in os.listdir('.') if os.path.isfile(f)]
    # subprocess.run(["../venv3/bin/python3.8", "-m", "spleeter", "separate", "-o", "../public/audio_output", filename])
    os.system(f"../venv3/bin/python3.8 -m spleeter separate -o '../public/audio_output' \"{filename}\"")
    # p = subprocess.run(["../venv3/bin/python3.8", "-m", "spleeter", "separate", "-o", "'../public/audio_output'", f"{filename}"])
    return filename


@views.route('/lyric_data', methods=['GET'])
def process_lyric():
    data = request.get_data()

    return json.dumps({"lyric_number": lyrics[data.lyric_number]})


@views.route('audio_ended', methods=['POST'])
def delete_audio():
    # end audio

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
