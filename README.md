# bingwall-js

Download the Bing's picture of the day
--------------

Bing features a different 1920x1080 wallpaper every day. This script allows downloading the latest image and setting it as wallpaper. If you prefer wgetting the image yourself, I'm running the same code at this address: [http://bingwall.azurewebsites.net/](http://bingwall.azurewebsites.net/). You can append a string like `?q=en-US` to the url for specify a country.

**How to use:**  

1. *git clone* to clone this repo  
2. *npm install* to install dependencies
 


**Usage:**  
app [options]

Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -s, --set                set as wallpaper (works on windows, gnome and mac)
    -i, --isocode [isocode]  specify an iso code (es. en-US)
    -p, --portrait           download the portrait wallpaper
    -a, --all                download all different images

**Example:**

Download the default picture and place it in download directory  
 `$ node app.js`

Download the picture of a specific country (in this example, Canada)  
 `$ node app.js --isocode=en-CA`

Download the picture of Bing Canada and set it as wallpaper (Note. -s option works only on Windows and Gnome)  
 `$ node app.js --isocode=en-CA  -s`
