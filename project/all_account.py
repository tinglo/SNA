import requests

ip = '127.0.0.1'

data = [{
	"username": "user1",
	"password": "pass1",
	"group": 	"group1",
	
	},
	{
	"username": "user2",
	"password": "pass2",
	"group": 	"group2",
	},
	{
	"username": "user3",
	"password": "pass3",
	"group": 	"group3",
	},
	{
	"username": "user4",
	"password": "pass4",
	"group": 	"group4",
	},
	{
	"username": "user5",
	"password": "pass5",
	"group": 	"group5",
	}
]

for account in data:
	resp = requests.post("http://" + ip +":8000/account/signup/", data = account )