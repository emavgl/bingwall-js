var path = require('path');
var exec = require('child_process').execFile;
	
exports.set = function(pathfile) {
	var bin = path.resolve("./lib/win-wallpaper.exe");
	exec(bin, [pathfile]);
};