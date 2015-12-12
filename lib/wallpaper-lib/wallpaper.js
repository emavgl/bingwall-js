var isWin = /^win/.test(process.platform);
var isMac = /^darwin/.test(process.platform);

if (isWin) {
    module.exports = require('./winpaper.js');
} else if(isMac) {
	module.exports = require('./macpaper.js');
} else {
	module.exports = require('./linuxpaper.js');
}