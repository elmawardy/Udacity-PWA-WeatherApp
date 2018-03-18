# Udacity-PWA-WeatherApp

run >**npm install** in the root of the project directory to install node_modules , need [nodejs](https://nodejs.org/en/) for this

*writeServiceWorkerFile* function is where [sw-precache](https://github.com/GoogleChromeLabs/sw-precache) configured inside **gulpfile.js** 

if you edit *writeServiceWorkerFile* you need to run  >**gulp swdev** to regenerate the new *sw.js* (service-worker)
you can then run the applicaiton using any server of your choice you can use [**http-server**](https://github.com/indexzero/http-server) for example


have fun ;)