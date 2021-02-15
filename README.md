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
This project focus on the backend of a jwt auth server. The code is slightliy modified, but in the core works the same. To use this Part follow the steps on "how to use **NodeJSTemplates**". It will install some dependencies:
* Express
* jsonwebtoken
* dotenv
* nodemon
* cros
## FAQ
What is the **NodeJSTemplates**?
>**NodeJSTemplates** is a small libary of many common nodeJS projects, that i've bundled to one Repository.
