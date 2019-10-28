const fs = require("fs");
const { spawnSync } = require("child_process");

var keystoreFilePath = process.argv[2];
var androidKeystoreAlias = process.argv[3];
var androidKeystorePass = process.argv[4];

// keytool -genkey -v -keystore releaseTest1.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000 -dname "cn=, ou=, o=, c=TR" -storepass pass
try {
	fs.unlinkSync(keystoreFilePath);
} catch (error) {}

const keytool = spawnSync("keytool", [
	"-genkey",
	"-v",
	"-keystore",
	keystoreFilePath,
	"-alias",
	androidKeystoreAlias,
	"-keyalg",
	"RSA",
	"-keysize",
	"2048",
	"-validity",
	"10000",
	"-dname",
	"cn=, ou=, o=, c=US",
	"-storepass",
	androidKeystorePass
]);
console.log(`keystore stderr: ${keytool.stderr.toString()}`);
console.log(`keystore stdout: ${keytool.stdout.toString()}`);

console.log("DONE");
