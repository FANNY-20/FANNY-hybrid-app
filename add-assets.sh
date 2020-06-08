#!/bin/bash

if [ -d "android" ]; then
  cp -R resources/android/assets/* android/app/src/main/res
  cp resources/android/AndroidManifest.xml android/app/src/main
  cp resources/android/strings.xml android/app/src/main/res/values
fi


if [ -d "ios" ]; then
  cp -R resources/ios/assets/* ios/App/App/Assets.xcassets
  cp resources/ios/Info.plist ios/App/App
fi
