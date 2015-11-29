# bingwall-js

Download the Bing's picture of the day
--------------

Typically the picture is photo about nature or beautiful place with a resolution of 1920x1080 pixels.

**How to use:**  

1. git clone this repo  
2. npm install to install dependencies

Download the default picture and place it in download directory  
 `$ node app.js`

Download the picture of a specific country (in this example, Canada)  
 `$ node app.js -i=en-CA`

Download the picture of Bing Canada and set it as wallpaper (Note. -s option works only on Windows and Gnome)  
 `$ node app.js -i=en-CA  -s`