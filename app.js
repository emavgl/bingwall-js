"use strict";
var fs = require('fs'),
	util = require('util'),
	path = require('path'),
	strutil = require('./lib/strutil.js'),
	wallpaper = require('./lib/wallpaper-lib/wallpaper.js'),
	program = require('commander'),
	request = require('request');
	
var jsonLink = "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=";
var bingBase = "http://www.bing.com";
var directory = __dirname + "/download/";

var setWallpaper = function(path, cb){
	wallpaper.set(path);
	cb(null);
}

var downloadImage = function(url, cb){
		var filename = directory + url.split('/').pop();
		var pictureName = strutil.getPictureNameFromUrl(url);
		
		if (typeof(downloadedPictures) == 'undefined' || downloadedPictures.indexOf(pictureName) < 0){
			var f = fs.createWriteStream(filename);
			request(url).pipe(f);
			f.on('finish', function() {
				cb(null, path.resolve(filename));
			});	
		}
}

var downloadJson = function(url, cb){
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var json = JSON.parse(body);
		}
		cb(error, json);
	})
}

var extractUrl = function (json, resolution, cb) {
	var complete_url = bingBase + json.images[0].urlbase + "_" + resolution + ".jpg";
	cb(null, complete_url);
}


var downloadAllPictures = function(){
	var nationsjson = require('./config/nations.json');
	var jsonData = nationsjson;
	
	var newImages = { };
	
	for (var i = 0; i < jsonData.nations.length; i++) {
    	var nationIsoCode = jsonData.nations[i];
    	var url = jsonLink + nationIsoCode;
		
		downloadJson(url, function(error, json){
			if (error){ console.error("error"); process.exit(); }	
			extractUrl(json, resolution, function(error, complete_url){
				if (error){ console.error("error"); process.exit();  }
				var pictureName = strutil.getPictureNameFromUrl(complete_url);
				if (typeof(newImages[pictureName]) == 'undefined'){
					newImages[pictureName] = complete_url;
					
					downloadImage(complete_url, function(error, imagePath){
						if (error){ console.error("error"); process.exit(); }
					});
				}
			})
		});
	}
}

var downloadSinglePicture = function (url, resolution, setAsWallpaper){
		downloadJson(url, function(error, json){
		if (error){ console.error("error"); process.exit(); }	
		extractUrl(json, resolution, function(error, completeUrl){
			if (error){ console.error("error"); process.exit();  }
			downloadImage(completeUrl, function(error, imagePath){
				if (error){ console.error("error"); process.exit(); }
				if (setAsWallpaper){
					setWallpaper(imagePath, function(error){
						if (error){ console.error("error"); process.exit(); }
					});
				}
			});
		})
	});	
}

var getDownloadedPictures = function(dir){
	var files = fs.readdirSync(dir);
	var array = [];
	files.forEach(function(element, i) {
		if (strutil.isAnImage(element)){
			array.push(strutil.getPictureNameFromUrl(element));
		}
	});
	return array;
}

program
  .version('0.0.1')
  .option('-s, --set', 'set as wallpaper (works on windows, gnome and mac)')
  .option('-i, --isocode [isocode]', 'specify an iso code (es. en-US)')
  .option('-p, --portrait', 'download the portrait wallpaper')
  .option('-a, --all', 'download all different images')
  .parse(process.argv);
  
var url = jsonLink + program.isocode;

var resolution = "1920x1080";
if (program.portrait) { resolution = "1080x1920"; }

if (program.all) {
	var downloadedPictures = getDownloadedPictures(directory);
	downloadAllPictures(resolution);
} else {
	downloadSinglePicture(url, resolution, program.set);
}
