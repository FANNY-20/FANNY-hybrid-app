import { Plugins } from "@capacitor/core";
import {
  BackgroundGeolocation,
  BackgroundGeolocationEvents,
} from "@ionic-native/background-geolocation";

const { Device, Geolocation } = Plugins;

export class CrossPlatformGeolocation {
  constructor(config) {
    this._config = config;
    this._isWebPlatform = false;
    this._locationListeners = [];
    this._platform = null;
  }

  async init() {
    this._platform = (await Device.getInfo()).platform;

    if (this._platform === "web") {
      this._isWebPlatform = true;
    } else {
      await BackgroundGeolocation.configure(this._config);
    }
  }

  addLocationListener(listener) {
    if (this._isWebPlatform) {
      this._locationListeners.push(listener);
    } else {
      BackgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe(async (location) => {
          const { latitude, longitude } = location;

          listener({ latitude, longitude });

          try {
            if (this._platform === "ios") {
              await BackgroundGeolocation.finish();
            }
          } catch(e) {
            // Noop
          }
        });
    }
  }

  async start() {
    if (this._isWebPlatform) {
      this._watchId = Geolocation.watchPosition(
        {},
        (position) => {
          if (!position) {
            return;
          }

          const { coords } = position;
          const { latitude, longitude } = coords;

          for (const listener of this._locationListeners) {
            listener({ latitude, longitude });
          }
        }
      );
    } else {
      await BackgroundGeolocation.start();
    }
  }

  async stop() {
    if (this._isWebPlatform) {
      await Geolocation.clearWatch({
        id: this._watchId,
      });
    } else {
      await BackgroundGeolocation.stop();
    }
  }
}
