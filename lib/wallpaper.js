var isWin = /^win/.test(process.platform);
if (isWin) {
  module.exports = require('./winpaper.js');
} else {
  module.exports = require('./linuxpaper.js');
}