import requests

resp = requests.post("http://127.0.0.1:8000/account/signup/", data = {
        "username" : "123456",
        "password" : "helloworld",
        "group"    : "new_group",
    })


