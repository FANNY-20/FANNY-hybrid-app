#!/bin/bash

export NODE_ENV=production
export BASE_URL=http://localhost:3000
export API_HOST=https://api.fanny.soyhuce.fr
export AUTHORIZATION_TOKEN=8im0qgacmw6w16uclemtk03oj477c2n2t8klpk64xfytgjev2d
export PEER_SERVER_HOST=peer.fanny.soyhuce.fr
export PEER_SERVER_PORT=443
export PEER_SERVER_KEY=f1nda32t9oqr79pf5txl

if [ -d "android" ]; then
  cp -R resources/android/assets/* android/app/src/main/res
  cp resources/android/AndroidManifest.xml android/app/src/main
  cp resources/android/strings.xml android/app/src/main/res/values
fi


if [ -d "ios" ]; then
  cp -R resources/ios/assets/* ios/App/App/Assets.xcassets
  cp resources/ios/Info.plist ios/App/App
fi

yarn build:native
