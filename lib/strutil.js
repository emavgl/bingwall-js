var	path = require('path');
	
exports.isAnImage = function(filename) {
  	var ext = path.extname(filename);
	if (ext == '.png' || ext == '.jpg' || ext == '.jpeg') return true;
	return false;
};

exports.getPictureNameFromUrl = function(url){
	var filename = url.split('/').pop();
	return filename.split('_')[0];
}
