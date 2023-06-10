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


# YDL_OPTIONS = YoutubeDL({'format':'bestaudio'})

def donwload_video(arg):
    with YoutubeDL(YDL_OPTIONS) as ydl:
        try:
            get(arg)
        except:
            video = ydl.extract_info(f"ytsearch:{arg}", download=True)['entries'][0]
        else:
            video = ydl.extract_info(arg, download=True)

        print(video["duration"])

    return video


donwload_video("see you again tyler the creator")

results = YoutubeSearch('see you again tyler the creator', max_results=10).to_dict()

for data in results:
    print(data["duration"])
    if len(data['duration'].split(":")) < 3:
        time = data["duration"].split(":")[0] * 60 + data["duration"].split(":")[1]
        if abs(int(time) - int(time)) < 3:
            donwload_video(data["title"])
            break
