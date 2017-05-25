var exec = require('child_process').exec,
	util = require('util'),
	child;
	
exports.set = function(path) {
	// there are multiple desktop environments
	var command = "echo $DESKTOP_SESSION";
	child = exec(command, function (err, stdout, stderr) {
		if(err) {
		  console.log('exec error: ' + err);
		}
		
		var desktopEnvironment = stdout.trim();
		console.log(desktopEnvironment);
		
		// Default: ubuntu/gnome
		set_command = 'gsettings set org.gnome.desktop.background picture-uri ' + '"file://' + path + '"';
		
		if (desktopEnvironment == 'xubuntu'){
			set_command = "xfconf-query --channel xfce4-desktop --property /backdrop/screen0/monitor0/workspace0/last-image --set " + path;
		}
		
		console.log(set_command);
		
		// run set_command
		child = exec(set_command, function (err, stdout, stderr) {
			if(err) {
			  console.log('exec error: ' + err);
			}
		});

	});
};
