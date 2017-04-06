import requests

ip = '127.0.0.1'

data = [{
	"username": "group1",
	"password": "0g4sg",
	"group": 	"小象隊",
	},
	{
	"username": "group2",
	"password": "6kxqp",
	"group": 	"元芳隊",
	},
	{
	"username": "group3",
	"password": "eiqmf",
	"group": 	"Netizen.10",
	},
	{
	"username": "group4",
	"password": "g4jtu",
	"group": 	"今晚喝飲料",
	},
	{
	"username": "group5",
	"password": "o42ef",
	"group": 	"周佩錡",
	},
	{
	"username": "group6",
	"password": "qrtwt",
	"group": 	"balilarder",
	},
	{
	"username": "group7",
	"password": "ya3p2",
	"group": 	"拍森GOGOGO",
	},
	{
	"username": "testuser1",
	"password": "testpwd1",
	"group": 	"test1",
	},	
	{
	"username": "testuser2",
	"password": "testpwd2",
	"group": 	"test2",
	},	
	{
	"username": "testuser3",
	"password": "testpwd3",
	"group": 	"test3",
	},		
	{
	"username": "testuser4",
	"password": "testpwd4",
	"group": 	"test4",
	},		
	{
	"username": "testuser5",
	"password": "testpwd5",
	"group": 	"test5",
	}
]

for account in data:
	resp = requests.post("http://" + ip +":8000/account/signup/", data = account )