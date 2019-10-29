### detail.json Fields

- `appId` -  application id (check api project)
- `version` -  application data version. using for force update (check api project) 
- `androidAppName` -  android application name
- `androidVersionCode` -  android version code
- `androidVersionName` -  android version name
- `androidApplicationId` -  android application id
- `androidReleaseChannel` -  release channel for android app
- `androidKeystoreFile` -  keystore file name in resources folder
- `androidKeystoreAlias` -  keystore alias
- `androidKeystorePass` -  keystore pass
- `androidGoogleJson` -  android firebase json file name in resources folder
- `androidIconBgColor` -  android icon bg color for v26
- `iosBundleIdentifier` -  ios application id
- `iosBuildNumber` -  ios build number
- `iosVersionName` -  ios version name
- `iosAppName` -  ios application name
- `iosGoogleJson` -  ios firebase json file name in resources folder
- `slug` -  expo app name
- `scheme` -  app scheme
- `iosReleaseChannel` -  release channel for ios app
- `splashBgColor` -  bg color of splash page
- `splashImageId` -  splash image in resources folder
- `iconId` -  icon in resources folder
- `fabricApiKey` -  fabric key

Run these commands after changes;

```
cd scripts
yarn run prepareApp
yarn run prepareAndroid
```

### Change App Icon

Change icon file in `data/icon.png`. Then run command;

```
cd scripts
yarn run generateIcons
```