# FANNY hybrid application

![Release](https://img.shields.io/badge/Release-0.1.2-blue.svg)

## Context

This project is part of the implementation of the FANNY protocol, divided into 2 main distinct projects
([the API backend](https://github.com/FANNY-20/FANNY-backend) and
[the hybrid mobile application](https://github.com/FANNY-20/FANNY-hybrid-app)).
A third project ([the geolocation simulator](https://github.com/FANNY-20/FANNY-geolocation-simulator))
is also available as a development tool or for manual testing.
You can learn more about the FANNY protocol itself [here](https://github.com/FANNY-20/The_FANNY_protocol_V0.1).

## Application stack

This application uses a stack of many different technologies.

### VueJS / NuxtJS

A conjunction of the famous VueJS web component oriented framework and the NuxtJS universal-ready web application framework.
This helps writing blazing fast reactive interfaces and component logic.

### VuetifyJS

This is a material component framework designed to work well with VueJS.

### Capacitor / Ionic-native / Cordova plugins

These 3 technologies are used to provide a bridge towards mobile development. Capacitor has been chosen for its simplicity
as much as for the Ionic deep experience in hybrid application development.

## Why such a stack ?

As you can see, it is mainly based on web technologies. This way, you can take benefits of the HMR
(Hot Module Replacement) during the logic development phase, helping improving the productivity.
You can experience your application using a simple browser instead of being forced to compile for a mobile target or emulator.
Capacitor is designed to allow multiple targets such as browser, iOS, Android and even Electron apps.

## Quick start

The followings steps consider you already have set the bound [API backend server](https://github.com/FANNY-20/FANNY-backend).
Let's say this API is listening on **http://localhost:8000** (default Laravel host and port when serving an app).

- Copy `.env.default` to `.env` if you want to work in a development environment
- Add your env variables in it (the `.env` file is only read while in development mode)

```
# .env

# Usually used for SEO purposes, you can leave it blank
BASE_URL=
# The API host: here it should be http://localhost:8000
API_HOST=
# A bearer token used to communicate with the API (see the backend conf - outside of this scope)
AUTHORIZATION_TOKEN=
# Used for WebRTC communication as a broker,
# you can set your own PeerJS server host, port and key or leave them blank
PEER_SERVER_HOST=
PEER_SERVER_PORT=
PEER_SERVER_KEY=
```

- Run `yarn` to install dependencies
- Run `yarn dev` if you want to run a development server listening on localhost:3000 (with HMR)
- Create a `dist/` directory in the root directory
- Run `yarn cap add android` to deploy an Android sub-project in the root directory (AndroidStudio required)
- Run `yarn cap add iOS` to deploy an iOS sub-project in the root directory (MacOS with Xcode required)
- Run `yarn cap sync` to copy all Cordova plugins to both mobile sub-projects
- Finally run `yarn build:native` in order to automatically:
  - build your webapp (don't forget to set your env variables since as stated the `.env` is not read for a production build)
  - copy your assets from the `dist/` directory to both mobile sub-projects
  - open one or another of mobile IDE (Xcode or AndroidStudio)

### Important, please note !

You will have to manually add some stuff directly in your mobile projects:

#### For Android

- Open `AndroidManifest.xml` and add `android:usesCleartextTraffic="true"` attribute to `<application>` (allow non-HTTPS traffic)
- Open `res/values/strings.xml` and add:

```xml
<resources>
  <!-- [...] -->

  <string name="mauron85_bgloc_account_name">$ACCOUNT_NAME</string>
  <string name="mauron85_bgloc_account_type">$ACCOUNT_TYPE</string>
  <string name="mauron85_bgloc_content_authority">$CONTENT_AUTHORITY</string>
</resources>
```

#### For iOS

- Open `Info.plist` file and make sure you have the following entries:

```xml
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>$ALWAYS_USAGE_DESCRIPTION</string>

<key>UIBackgroundModes</key>
<array>
    <string>fetch</string>
    <string>location</string>
    <string>processing</string>
</array>

<key>CFBundleURLTypes</key>
<array>
    <dict>
      <key>CFBundleTypeRole</key>
      <key>CFBundleURLSchemes</key>
      <string>Editor</string>
      <array>
        <string>prefs</string>
      </array>
    </dict>
</array>
```

## Commands

### Install dependencies

```bash
$ yarn
```

### Run application with HMR on localhost:3000

```bash
$ yarn dev
```

### Run production build and start server

```bash
$ yarn build
$ yarn start
```

### Run production build for hybrid application

```bash
$ yarn build:native
```

### Run all linters - ESLint + StyleLint (with automatic fix)

```bash
$ yarn lint
```

### Run all linters - ESLint + StyleLint (report only)

```bash
$ yarn lint:check
```

### Run ESLint (with automatic fix)

```bash
$ yarn eslint
```

### Run ESLint (report only)

```bash
$ yarn eslint:check
```

### Run StyleLint (with automatic fix)

```bash
$ yarn stylelint
```

### Run StyleLint (report only)

```bash
$ yarn stylelint:check
```

### Run Prettier (write)

```bash
$ yarn prettify
```

### Run Prettier (no write)

```bash
$ yarn prettify:check
```

### Run all tests (unit + end-to-end)

```bash
$ yarn test
```

### Run end-to-end tests only

```bash
$ yarn e2e
```

### Run unit tests only

```bash
$ yarn unit
```

## Resources / documentation

[See documentation](./DOCS.md)

## Changelog

[See CHANGELOG](./CHANGELOG.md)

## Ideas / improvements / evolution

- [ ] Better BackgroundGeolocation config to increase battery saving while not degrading tracking precision
- [ ] Adding everything to become GDPR compliant
- [ ] Thinking about a public / private random UUIDs regeneration protocol (to improve anonymity) on a fixed or dynamic duration basis
- [ ] Trying to make the WebRTC implementation VPN friendly (to improve anonymity as well)
- [ ] ...

## License

[MIT](./LICENSE)
