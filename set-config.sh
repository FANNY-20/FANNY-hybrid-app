#!/bin/bash

if [ -d "android" ]; then
  cp resources/android/strings.xml android/app/src/main/res/values
fi


if [ -d "ios" ]; then
  cp resources/ios/Info.plist ios/App/App
fi
