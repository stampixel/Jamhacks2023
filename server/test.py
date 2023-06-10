# from requests import get
# # from youtube_dl import YoutubeDL
#
# import yt_dlp as youtube_dl
# from yt_dlp import YoutubeDL
#
#
# YDL_OPTIONS = {'format': 'bestaudio', 'noplaylist': 'True'}
#
#
# def search(arg):
#     with YoutubeDL(YDL_OPTIONS) as ydl:
#         try:
#             get(arg)
#         except:
#             video = ydl.extract_info(f"ytsearch:{arg}", download=False)['entries'][0]
#         else:
#             video = ydl.extract_info(arg, download=False)
#
#     return video
#
# search("see you again tyler the creator")


from savify import Savify
from savify.types import Type, Format, Quality

s = Savify()
# Spotify URL
s.download("SPOTIFY URL")

# Search Query
# Types: TRACK, ALBUM, PLAYLIST
s.download("QUERY", query_type=Type.TRACK)