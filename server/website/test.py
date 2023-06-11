import requests

url = "https://n2tz2aw2e6.execute-api.ca-central-1.amazonaws.com/Prod/hello"
myobj = {'somekey': 'somevalue'}

x = requests.post(url, json=myobj)

print(x.text)
