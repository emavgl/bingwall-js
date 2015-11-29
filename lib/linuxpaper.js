var exec = require('child_process').exec,
	util = require('util'),
	child;
	
exports.set = function(path) {
  	var command = 'gsettings set org.gnome.desktop.background picture-uri ' + 
    '"file://' + path + '"';

	child = exec(command, function (err, stdout, stderr) {
		if(err) {
		  console.log('exec error: ' + err);
		}
	});
};
