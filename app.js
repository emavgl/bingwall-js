"use strict";
var fs = require('fs'),
	util = require('util'),
	path = require('path'),
	wallpaper = require('./lib/wallpaper.js'),
	program = require('commander'),
	request = require('request');
	
var jsonLink = "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=";
var bingBase = "http://www.bing.com";
var directory = __dirname + /download/;

var setWallpaper = function(path, cb){
	wallpaper.set(path);
	cb(null);
}

var downloadImage = function(url, cb){
		var filename = directory + url.split('/').pop();
		var f = fs.createWriteStream(filename);
		request(url).pipe(f);
		f.on('finish', function() {
			cb(null, path.resolve(filename));
		});
}

var downloadJson = function(url, cb){
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var json = JSON.parse(body);
			var complete_url = bingBase + json.images[0].url;
		}
		cb(error, complete_url);
	})
}

program
  .version('0.0.1')
  .option('-s, --set', 'set as wallpaper (work on windows and gnome)')
  .option('-i, --isocode [isocode]', 'specify an iso code (es. en-US)')
  .parse(process.argv);
  
var url = jsonLink + program.isocode;

downloadJson(url, function(error, complete_url){
	if (error){
		console.error("error");
		process.exit();
	}
	
	downloadImage(complete_url, function(error, imagePath){
		if (error){ console.error("error"); process.exit(); }
		if (program.set){
			setWallpaper(imagePath, function(error){
				if (error){ console.error("error"); process.exit(); }
			});
		}
	});
});


