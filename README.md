# NodeJSTemplates
## Content
1. [how to use **NodeJSTemplates**](https://github.com/Laurenz1606/NodeJSTemplates#how-to-use-nodejstemplates)
2. [template](https://github.com/Laurenz1606/NodeJSTemplates#template)
3. [jwtauth](https://github.com/Laurenz1606/NodeJSTemplates#jwtauth)
4. [paginated-api](https://github.com/Laurenz1606#paginated-api)
5. [FAQ](https://github.com/Laurenz1606#faq)
## how to use **NodeJSTemplates**
Many of this code is form the tutorials from Kyle aka. Wev Deb Simplified<br /> 
[His Youtube](https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw) <br />
[His GitHub](https://github.com/WebDevSimplified)<br />
First of all, you can use the code every where you want, im thankful if you mention Kyle or this Repository in your project, but you dont have to. I'll work on constantly adding more Parts to it.
1. Check that you have nodeJS on your machine.
2. Clone this repo.
3. (Optional) Delete every folder, execpt the part you want to use.
4. In the folder of your choosen part run ```npm install``` to install the needed dependencies.
5. (Optional) in some cases you'll need extra programms like MongoDB, etc.
6. On step 4 you've installed a dependency called dotenv. With this dependency you can set environment variables in a special file. In your part folder create a .env file. Now go to your specific part in this README and search for the environment variables you need to set, to get the App runnig.
7. You can either run your code with ```node app.js```, or if you want to restart your server every time you changed something in a file run ```npm run devStart```
## template
The template folder is a clean nodeJS project with express, dotenv and nodemon ready. All my projects are based on this template.
## jwtauth
This project focus on the backend of a jwt auth server. The tutorial link is: [JWT Authentication Tutorial - Node.js
](https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified) The code is slightliy modified, but in the core works the same. To use this Part follow the steps on "[how to use **NodeJSTemplates**](https://github.com/Laurenz1606/NodeJSTemplates#how-to-use-nodejstemplates)". <br />
It will install some dependencies:
* Express
* jsonwebtoken
* dotenv
* nodemon
* cors  
<!-- -->
### Environment variables
PORT: <br />
The "PORT" variable will set the port of your application  <br /><br />
AUTH_PORT: <br />
The "AUTH_PORT" variable will set the port of your authentication application  <br /><br />
EXPIRESIN: <br />
Set "EXPIRESIN" to the amount of seconds, that need to pass, that a jwt token gets invalid(i would recomend something like 900 which are 15 minutes).<br /><br />
ACCESS_TOKEN_SECRET: <br />
The "ACCESS_TOKEN_SECRET" will set our jwt acces-token-secret to generate a secure key first run ```node``` and then run ```require('crypto').randomBytes(64).toString('hex')``` and copy the given string of random chars to your ACCESS_TOKEN_SECRET variable.<br /><br />
REFRESH_TOKEN_SECRET:<br />
Run the same 2 commands (```node```, ```require('crypto').randomBytes(64).toString('hex')```) again and set the REFRESH_TOKEN_SECRET to the given value. For security reasons dont use the same token, as on ACCESS_TOKEN_SECRET. <br /><br />
Your .env should look something like:<br /><br />
PORT=3000<br />
AUTH_PORT=4000<br />
EXPIRESIN=900<br />
ACCESS_TOKEN_SECRET=239c81bf99f89a8e19f8b29c82e189f08a90<br />
REFRESH_TOKEN_SECRET=29a77f2bf34d29c82a39f089e890b90c8d29a8<br />
### Start server
One difference to a normal part is, that there are 2 servers runnig one for the api requests and one only used for api calls. To use them run ```node app.js``` and ```npm auth_app.js``` or ```npm run devStart``` and ```npm run devStartAuth```. I would recommend to run these server with normal node, because when you're using nodemon when you save one server sometimes the other one crashes(in my case).
### Usage
Replace the [TOKEN] and the [REFRESH] with the access token and the refresh token. Replace [your_auth_server_ip] with the ip of your auth server, [your_app_server_ip] with the ip of your api. Do the same thing for the ports.<br />
```
//request the api
GET http://[your_app_server_ip]:[your_app_server_port]/posts
Authorization: Bearer [TOKEN]

//log a user out(delete the refresh token)
DELETE http://[your_auth_server_ip]:[your_auth_server_port]/logout
Content-Type: application/json

{
    "token": "[REFRESH]"
}

//refresh an expired access token
POST http://[your_auth_server_ip]:[your_auth_server_port]/token
Content-Type: application/json

{
    "token": "[REFRESH]"
}

//get an acces token for a specific user from the username
POST http://[your_auth_server_ip]:[your_auth_server_port]/login
Content-Type: application/json

{
    "username": "Tom"
}
```
## paginated-api
This project is an api which paginates the data on multiple sites which are dynamicly generated based on the ```limit``` query parameter. Like other projects its a slightly modified version of the paginated api from Web Dev Simplified. His tutorial is following [Create A Paginated API With Node.js - Complete Tutorial](https://www.youtube.com/watch?v=ZX3qt0UWifc&t=52s&ab_channel=WebDevSimplified). To use this part you can simply run the commands on "[how to use **NodeJSTemplates**](https://github.com/Laurenz1606/NodeJSTemplates#how-to-use-nodejstemplates)".<br />
It will install some dependencies:
* Express
* dotenv
* nodemon
* cors
<!-- -->
### Environment variables
PORT: <br />
The "PORT" variable will set the port of your application  <br /><br />
Your .env should look something like:<br /><br />
PORT=3000<br />
### Usage
Replace [your_server_ip] with the ip of your server and [port] with the value of your port environment variable. Replace [limit] with the results you want on one page and [page] to your requested page
```
//request the user api
GET http://[your_server_ip]:[port]/users?page=[page]&limit=[limit]

//request the post api
GET http://[your_server_ip]:[port]/posts?page=[page]&limit=[limit]
```
At the end of Kyles video, he's connecting his api to a database, in my case i only want to focus on the pagination of the api, if you want to use it with a database, maybe try it yourself(small hint: a good dependency to use is mongoose with mongodb) or watch kyles video to the api.
## FAQ
What is the **NodeJSTemplates**?
>**NodeJSTemplates** is a small libary of many common nodeJS projects, that i've bundled to one Repository.