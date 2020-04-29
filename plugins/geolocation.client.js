import { CrossPlatformGeolocation } from "@/utils/cross-platform-geolocation";

export default async function (ctx, inject) {
  const config = {
    desiredAccuracy: 0,
    stationaryRadius: 1,
    distanceFilter: 1,
    debug: false,
    stopOnTerminate: true,
    notificationTitle: "Suivi Stop-Covid",
    notificationText: "Actif",
  };

  const geolocation = new CrossPlatformGeolocation(config);
  await geolocation.init();

  inject("geolocation", geolocation);
}
