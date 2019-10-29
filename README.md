# react-native-ts-boilerplate

React Native Typescript Boilerplate. 

Provides a large scalable android and ios applications with using React Native.
Contains all components for developing an app.

## Installation

Clone or download then use npm or yarn.

```bash
git clone https://github.com/onka13/react-native-ts-boilerplate.git
cd react-native-ts-boilerplate/app
yarn
yarn start
```

### API

This application uses the API below;

- [Api Server](https://github.com/onka13/nodejs-ts-api-boilerplate)

#### Android

install app on android device

```bash
cd scripts
yarn run aInstall
```

### Customize App

> [details document](https://github.com/onka13/react-native-ts-boilerplate/tree/master/docs/customize-app.md)

Inspect `detail.json` file in `scripts/data` folder. Change whatever you want.

If you want to change app icon, firstly change icon file in data folder.
Then run below command to generate icons in all sizes.

```
cd scripts
yarn run generateIcons
```

Run these commands after changes;

```
cd scripts
yarn run prepareApp
yarn run prepareAndroid
```

## Project Structure

- `/app` - application folder 
    - `src`- app source files
        - `assets` - contains fonts, images...
        - `business` - all business 
            - `managers` - firebase, localization, storage ...
            - `redux_source` - redux files
                - `actions` - redux functions
                - `reducers` - redux reducers
            - `services` - business logic classes
        - `data`
            - `config` - configuration
            - `l10n` - localization files
            - `models` - enums, entities
        - `ui` - ui pages
            - `components` - some useful and custom components 
            - `pages` - pages
- `/commonlib` - shared native library (custom android and ios codes)
- `/infra` - shared typescript library 
- `/scripts`- scripts to manipulate application

## Todo

- [ ] Create documentation
- [ ] Add examples
- [ ] Add IOS project
- [ ] Fix Redux
- [ ] Add logging
- [ ] Add unit tests
- [ ] Publishing App documentation

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://github.com/onka13/nodejs-ts-api-boilerplate/blob/master/LICENSE)