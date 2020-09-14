import { CrossPlatformGeolocation } from "@/utils/cross-platform-geolocation";

export default async function (ctx, inject) {
  const config = {
    desiredAccuracy: 0, // meters
    stationaryRadius: 1, // meters
    distanceFilter: 1, // meters
    interval: 1000, // milliseconds
    debug: false,
    stopOnTerminate: true,
    notificationTitle: "Suivi Anonymous Virus Tracing",
    notificationText: "Actif",
  };

  const geolocation = new CrossPlatformGeolocation(config);
  await geolocation.init();

  inject("geolocation", geolocation);
}
