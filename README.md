# NodeJSTemplates
## Content
1. how to use **NodeJSTemplates**
2. template
3. jwtauth
4. FAQ
## how to use **NodeJSTemplates**
Many of this code is form the tutorials from Kyle aka. Wev Deb Simplified<br /> Youtube: https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw GitHub: https://github.com/WebDevSimplified  
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
## jwtauth (in progress)
This project focus on the backend of a jwt auth server. The tutorial link is: https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified The code is slightliy modified, but in the core works the same. To use this Part follow the steps on "how to use **NodeJSTemplates**". <br />
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
ACCESS_TOKEN_SECRET: <br />
The "ACCESS_TOKEN_SECRET" will set our jwt acces-token-secret to generate a secure key first run ```node``` and then run ```require('crypto').randomBytes(64).toString('hex')``` and copy the given string of random chars to your ACCESS_TOKEN_SECRET variable.<br /><br />
REFRESH_TOKEN_SECRET:<br />
Run the same 2 commands (```node```, ```require('crypto').randomBytes(64).toString('hex')```) again and set the REFRESH_TOKEN_SECRET to the given value. For security reasons dont use the same token, as on ACCESS_TOKEN_SECRET. <br /><br />
Your .env should look something like:<br /><br />
PORT=3000<br />
AUTH_PORT=3000<br />
ACCESS_TOKEN_SECRET=239c81bf99f89a8e19f8b29c82e189f08a90<br />
REFRESH_TOKEN_SECRET=29a77f2bf34d29c82a39f089e890b90c8d29a8<br />
### Start server
One difference to a normal part is, that there are 2 servers runnig one for the api requests and one only used for api calls. To use them run ```node app.js``` and ```npm authApp.js``` or ```npm run devStart``` and ```npm run devStartAuth```
## FAQ
What is the **NodeJSTemplates**?
>**NodeJSTemplates** is a small libary of many common nodeJS projects, that i've bundled to one Repository.
