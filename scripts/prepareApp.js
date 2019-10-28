const fs = require('fs');
var isMac = process.platform === 'darwin';

var root = '../app';
var localDir = process.argv[2] || 'data';

var detail = JSON.parse(fs.readFileSync(localDir + '/detail.json'));
var appJson = JSON.parse(fs.readFileSync(root + '/app.json'));

fs.copyFileSync(localDir + '/resources/' + detail.splashImageId, root + '/src/assets/splash.png');
fs.copyFileSync(localDir + '/resources/Icon-512.png', root + '/src/assets/icon.png');

appJson.expo.icon = './src/assets/icon.png';
appJson.expo.splash.image = './src/assets/splash.png';
appJson.expo.slug = detail.slug;
appJson.expo.ios.bundleIdentifier = detail.iosBundleIdentifier;
appJson.expo.ios.buildNumber = detail.iosBuildNumber;
appJson.expo.android.package = detail.androidApplicationId;
appJson.expo.splash.backgroundColor = detail.splashBgColor || '#000000';
appJson.expo.scheme = detail.scheme;
appJson.expo.extra = {
	appId: detail.id,
	name: detail.androidAppName,	
	dataVersion: detail.version
};

fs.writeFileSync(root + '/app.json', JSON.stringify(appJson, null, 2));

console.log('DONE');
