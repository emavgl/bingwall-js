var exec = require('child_process').exec,
	util = require('util'),
	child;
	
exports.set = function(path) {
  	var command = 'osascript -e \'tell application "Finder" to set desktop picture to POSIX file "' + path + '"\'';

	child = exec(command, function (err, stdout, stderr) {
		if(err) {
		  console.log('exec error: ' + err);
		}
	});
};
