# NodeJSTemplates
## Content
1. [how to use **NodeJSTemplates**](https://github.com/Laurenz1606/NodeJSTemplates#how-to-use-nodejstemplates)
2. [template](https://github.com/Laurenz1606/NodeJSTemplates#template)
3. [jwtauth](https://github.com/Laurenz1606/NodeJSTemplates#jwtauth)
4. [paginated-api](https://github.com/Laurenz1606/NodeJSTemplates#paginated-api)
5. [URL shortener(ejs version)](https://github.com/Laurenz1606/NodeJSTemplates#url-shortenerejs-version)
6. [URL shortener(api version)](https://github.com/Laurenz1606/NodeJSTemplates#url-shortenerapi-version)
7. [Session based login(temp)](https://github.com/Laurenz1606/NodeJSTemplates#session-based-logintemp)
8. [Session based login(database)](https://github.com/Laurenz1606/NodeJSTemplates#session-based-logindatabase)
0. [FAQ](https://github.com/Laurenz1606/NodeJSTemplates#faq)
## how to use **NodeJSTemplates**
Many of this code is form the tutorials from Kyle aka. Wev Deb Simplified<br />
[His Youtube](https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw) <br />
[His GitHub](https://github.com/WebDevSimplified)<br />
First of all, you can use the code every where you want, im thankful if you mention Kyle or this Repository in your project, but you dont have to. I'll work on constantly adding more Parts to it.
1. Check that you have nodeJS and npm on your machine.
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
* express
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
ACCESS_TOKEN_SECRET=19bae9feacf4d4c276e6f452176e0d158dce7d836200251401d330ce36c15804c40f6f66a5753741d0306b1cbbac96bd171c85ada6a32e42f1f79533901e28b9<br />
REFRESH_TOKEN_SECRET=721cc759dada3f9c1f3321bebb22ef0e58d573fe88bf766519a7cff4ca86b0dd807366a3c8eb38248b6c79a19d1f92ee2886e36bdba689d1f2bc443b13368f43<br />
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
* express
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
## URL shortener(ejs version)
This project is an URL-shortener, not like many other projects, it also got a frontend view with the templating language ejs. The code comes form another video from kyle: [How To Build A URL Shortener With Node.js, express, and MongoDB](https://www.youtube.com/watch?v=SLpUKAGnm-g&t=972s&ab_channel=WebDevSimplified). To use this part run the commands on "[how to use **NodeJSTemplates**](https://github.com/Laurenz1606/NodeJSTemplates#how-to-use-nodejstemplates)", but you need to have mongoDB installed on your device, because, we'll need a database to store the shortened urls.<br />
Dependencies that will be installed:
* express
* dotenv
* ejs
* mongoose
* shortid
* nodemon
<!-- -->
### Environment variables
PORT: <br />
The "PORT" variable will set the port of your application  <br /><br />
DATABASE_URL: <br />
The "DATABASE_URL" variable will set the url of your mongo database.<br /><br />
Your .env should look something like:<br /><br />
PORT=3000<br />
DATABASE_URL=mongodb://localhost:27017/url-shortener-ejs<br />
### Usage
The usage of this project is pretty easy, to start your server simply run one of the commands from "[how to use **NodeJSTemplates**](https://github.com/Laurenz1606/NodeJSTemplates#how-to-use-nodejstemplates)". In your browser simply go to [your_server_ip]:[your_server_port] and test it. Since this project also include a frontend, you could try something like make a delete button or implement a login system, so that a user can only see his shortened urls.
## URL shortener(api version)
This project is pretty similar to the ejs version of the url shortener, the redirects are completly the same, but there is no user interface to add a url. The code form this is also inspired by Kyle, to see an explination of it, check out the video linked at the ejs version. To use this part run the commands on "[how to use **NodeJSTemplates**](https://github.com/Laurenz1606/NodeJSTemplates#how-to-use-nodejstemplates)", but you need to have mongoDB installed on your device, because, we'll need a database to store the shortened urls.<br />
Dependencies that will be installed:
* express
* dotenv
* mongoose
* shortid
* nodemon
* cros
<!-- -->
### Environment variables
PORT: <br />
The "PORT" variable will set the port of your application  <br /><br />
DATABASE_URL: <br />
The "DATABASE_URL" variable will set the url of your mongo database.<br /><br />
Your .env should look something like:<br /><br />
PORT=3000<br />
DATABASE_URL=mongodb://localhost:27017/url-shortener-api<br />
### Usage
The usage of this project is a little diffrent to the ejs version, you don't have an interface to add a url or view all urls. You have to get or post something via an api. To Start your server simply run the commands on "[how to use **NodeJSTemplates**](https://github.com/Laurenz1606/NodeJSTemplates#how-to-use-nodejstemplates)".<br />
```
//get all shorted urls
GET http://[YOUR_IP_OR_FQDN]/all

//get infos of a specific url, replace [URL] with the shortedUrl you want the infos
GET http://[YOUR_IP_OR_FQDN]/info/[URL]

//create a new shortedUrl, replace [URL] with the url you want to redirect
POST http://[YOUR_IP_OR_FQDN]/create
Content-Type: application/json

{
    "fullUrl": "[URL]"
}
```
The response from the POST request contains a "short" variable, when you go to http://[your_server_ip]:[your_server_port]/[short] you will be redirected.
### Example
Here im going to give an example, because its pretty complicated to understand, when you want to shorten a url follow these steps(as an example i am using https://example.com).
1. Make a post request to your server with your url:<br />
```
POST http://[YOUR_IP_OR_FQDN]/create
Content-Type: application/json

{
    "fullUrl": "https://example.com"
}
```
2. As a response you will get something like: <br />
```
//the response is
{
  "clicks": 0,
  "_id": "602d024e99a82b0b426e27ae",
  "full": "https://example.com",
  "short": "PPZZ3kYeX",
  "__v": 0
}
```
3. Your shorted url is:
```
http://[YOUR_IP_OR_FQDN]/PPZZ3kYeX
```
## Session based login(temp)
Before i go into too much detail, i DON'T recommend using this as your login system. This projects stores all data in an array on the server, which is very bad, because when you restart your server once all your user data will be gone. I also have built a version where i hooked the login system up to a database, which i recommend to use. This Project is a like many others a modified version of on of the videos from Kyle. The original version from him is this [Node.js Passport Login System Tutorial](https://www.youtube.com/watch?v=-RCnNyD0L-s&ab_channel=WebDevSimplified). To use this project as always, run the commands from "[how to use **NodeJSTemplates**](https://github.com/Laurenz1606/NodeJSTemplates#how-to-use-nodejstemplates)"<br />
Dependencies that will be installed:
* dotenv
* express
* express-flash
* express-session
* ejs
* method-override
* passport
* passport-local
* nodemon
* bcrypt
<!-- -->
### Environment variables
PORT: <br />
The "PORT" variable will set the port of your application  <br /><br />
SESSION_SECRET: <br />
The "SESSION_SECRET" variable will set the session secret of your session application. I've done the same thing as with the jwtauth project. I generated a random string of chars with following commands: ```node```, ```require('crypto').randomBytes(64).toString('hex')```.<br /><br />
Your .env should look something like:<br /><br />
PORT=3000<br />
SESSION_SECRET=702bbcd97d48e7bf5e68057bb54b3c3c5a97d7e6d44996b5e27367670fd1a26d4c5abf9c3bedebe33319cea0bc9f4df5556298d70bec82411c6594d38dc06b44<br />
### Usage
This application also includes a fronted with the templating language ejs. So you can simply start your server, go to your browser and go to [your_server_ip]:[your_server_port]. The "UI" i've included is pretty basic html, but feel free to remake it.
## Session based login(database)
This Session based login system is the recommend one for your project. You need to have mongoDB installed on your device, because thats the database type we're going to use. If you want to get an explination on how the login is working check ot this video from Kyle: [Node.js Passport Login System Tutorial](https://www.youtube.com/watch?v=-RCnNyD0L-s&ab_channel=WebDevSimplified). I've modifed his code, so it can be hooked up to a database. To use this project, run the commands from "[how to use **NodeJSTemplates**](https://github.com/Laurenz1606/NodeJSTemplates#how-to-use-nodejstemplates)"<br />
Dependencies that will be installed:
* dotenv
* express
* express-flash
* express-session
* ejs
* method-override
* passport
* passport-local
* nodemon
* bcrypt
* mongoose
<!-- -->
### Environment variables
PORT: <br />
The "PORT" variable will set the port of your application  <br /><br />
DATABASE_URL: <br />
The "DATABASE_URL" variable will set the url of your mongo database.<br /><br />
SESSION_SECRET: <br />
The "SESSION_SECRET" variable will set the session secret of your session application. I've done the same thing as with the jwtauth project. I generated a random string of chars with following commands: ```node```, ```require('crypto').randomBytes(64).toString('hex')```.<br /><br />
Your .env should look something like:<br /><br />
PORT=3000<br />
DATABASE_URL=mongodb://localhost/session-login-database
SESSION_SECRET=5614e9887d1de94f1e562dc94957f1837e33c609095c030478480a04ddd4051b94e346560c37609042ebd339f939926db2ea85093a2593a78b0c7a79b86ede99<br />
### Usage
This application also includes a fronted with the templating language ejs. So you can simply start your server, go to your browser and go to [your_server_ip]:[your_server_port]. The "UI" i've included is pretty basic html, but feel free to remake it.
## FAQ
What is the **NodeJSTemplates**?
>**NodeJSTemplates** is a small libary of many common nodeJS projects, that i've bundled to one Repository.
