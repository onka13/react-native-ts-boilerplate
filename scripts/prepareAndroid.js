const fs = require("fs");

var folder = "./" + (process.argv[2] || "data") + "/";
var root = "../app/android/app";
var detail = JSON.parse(fs.readFileSync(folder + "detail.json"));

var copyList = [
	["ic_launcher", 192, ""],
	["ic_launcher", 72, "mipmap-hdpi"],
	["ic_launcher", 48, "mipmap-mdpi"],
	["ic_launcher", 96, "mipmap-xhdpi"],
	["ic_launcher", 144, "mipmap-xxhdpi"],
	["ic_launcher", 192, "mipmap-xxxhdpi"],
	["ic_foreground", 162, "mipmap-hdpi-v26"],
	["ic_foreground", 108, "mipmap-mdpi-v26"],
	["ic_foreground", 216, "mipmap-xhdpi-v26"],
	["ic_foreground", 324, "mipmap-xxhdpi-v26"],
	["ic_foreground", 432, "mipmap-xxxhdpi-v26"],
	["shell_launch_background_image", 50, "drawable-xxxhdpi"],
	["icon", 256, "drawable"]
];

for (const i in copyList) {
	var item = copyList[i];
	fs.copyFileSync(folder + "resources/Icon-" + item[1] + ".png", root + "/src/main/res/" + (item[2] ? item[2] + "/" : "") + item[0] + ".png");
}

// splash img
if (detail.splashImageId) {
	fs.copyFileSync(folder + "resources/" + detail.splashImageId, root + "/src/main/res/drawable-xxxhdpi/shell_launch_background_image.png");
}

// - colors
var colorsXml = fs.readFileSync(root + "/src/main/res/values/colors.xml", "UTF8");

var fixColor = (color, defaultColor) => {
	if (!color) return defaultColor;
	return color.length > 7 ? color.substr(0, 7) : color;
};

var splashBackground = fixColor(detail.splashBgColor, "#1b73b4");
var iconBackground = fixColor(detail.androidIconBgColor, "#FFFFFF");
colorsXml = colorsXml.replace(/<color name="splashBackground">(.*?)<\/color>/gim, '<color name="splashBackground">' + splashBackground + "</color>");
colorsXml = colorsXml.replace(/<color name="iconBackground">(.*?)<\/color>/gim, '<color name="iconBackground">' + iconBackground + "</color>");

fs.writeFileSync(root + "/src/main/res/values/colors.xml", colorsXml);

// - strings.xml
var stringsXml = fs.readFileSync(root + "/src/main/res/values/strings.xml", "UTF8");
stringsXml = stringsXml.replace(/<string name="app_name">(.*?)<\/string>/gim, '<string name="app_name">' + detail.androidAppName + "</string>");

fs.writeFileSync(root + "/src/main/res/values/strings.xml", stringsXml);

// - manifest
var manifestXml = fs.readFileSync(root + "/src/main/AndroidManifest.xml", "UTF8");
manifestXml = manifestXml.replace(/"(.*?).permission.C2D_MESSAGE"/gim, '"' + detail.androidApplicationId + '.permission.C2D_MESSAGE"');
manifestXml = manifestXml.replace(/<data android:scheme="([\w\d]+)"\/>/gim, '<data android:scheme="' + detail.scheme + '"/>');
manifestXml = manifestXml.replace(
	/android:name="io.fabric.ApiKey" android:value="([\w\d]+)"/gim,
	'android:name="io.fabric.ApiKey" android:value="' + detail.fabricApiKey + '"'
);
manifestXml = manifestXml.replace(
	/<action android:name="com.google.android.c2dm.intent.REGISTRATION"\/><category android:name="(.*?)"\/>/gim,
	'<action android:name="com.google.android.c2dm.intent.REGISTRATION"/><category android:name="' + detail.androidApplicationId + '"/>'
);

fs.writeFileSync(root + "/src/main/AndroidManifest.xml", manifestXml);

// - MainActivity
var mainActivity = fs.readFileSync(root + "/src/main/java/host/exp/exponent/MainActivity.java", "UTF8");
mainActivity = mainActivity.replace(/"exp:\/\/exp.host\/@onka13\/(.*)"/gim, '"exp://exp.host/@onka13/' + detail.slug + '"');

fs.writeFileSync(root + "/src/main/java/host/exp/exponent/MainActivity.java", mainActivity);

// - AppConstants
var appConstants = fs.readFileSync(root + "/src/main/java/host/exp/exponent/generated/AppConstants.java", "UTF8");
appConstants = appConstants.replace(/"exp:\/\/exp.host\/@onka13\/(.*)"/gim, '"exp://exp.host/@onka13/' + detail.slug + '"');
appConstants = appConstants.replace(/SHELL_APP_SCHEME = "([\w\d]+)"/gim, 'SHELL_APP_SCHEME = "' + detail.scheme + '"');
appConstants = appConstants.replace(/RELEASE_CHANNEL = "(.*)"/gim, 'RELEASE_CHANNEL = "' + detail.androidReleaseChannel + '"');

fs.writeFileSync(root + "/src/main/java/host/exp/exponent/generated/AppConstants.java", appConstants);

// - DetachBuildConstants
var detachBuildConstants = fs.readFileSync(root + "/src/main/java/host/exp/exponent/generated/DetachBuildConstants.java", "UTF8");
detachBuildConstants = detachBuildConstants.replace(/DEVELOPMENT_URL = "(.*):\/\//gim, 'DEVELOPMENT_URL = "' + detail.scheme + "://");

fs.writeFileSync(root + "/src/main/java/host/exp/exponent/generated/DetachBuildConstants.java", detachBuildConstants);

// build.gradle
var buildGradle = fs.readFileSync(root + "/build.gradle", "UTF8");
buildGradle = buildGradle.replace(/applicationId '(.*)'/gim, "applicationId '" + detail.androidApplicationId + "'");
buildGradle = buildGradle.replace(/versionCode ([\d]*)/gim, "versionCode " + detail.androidVersionCode);
buildGradle = buildGradle.replace(/versionName '(.*)'/gim, "versionName '" + detail.androidVersionName + "'");

fs.writeFileSync(root + "/build.gradle", buildGradle);

// google-services
if (detail.androidGoogleJson) fs.copyFileSync(folder + "resources/" + detail.androidGoogleJson, root + "/google-services.json");

// keystore
var keystoreContent =
	"storePassword=" +
	detail.androidKeystorePass +
	"\nkeyPassword=" +
	detail.androidKeystorePass +
	"\nkeyAlias=" +
	detail.androidKeystoreAlias +
	"\nstoreFile=app.keystore";

fs.writeFileSync(root + "/keystore.properties", keystoreContent);

try {
	fs.unlinkSync(root + "/app.keystore");
} catch (error) {}
fs.copyFileSync(folder + "resources/" + detail.androidKeystoreFile, root + "/app.keystore");

console.log("DONE");
