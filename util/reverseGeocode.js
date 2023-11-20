import * as Location from "expo-location";

export default async function reverseGeocode(latitude, longitude) {
  const location = await Location.reverseGeocodeAsync(
    { latitude, longitude },
    { useGoogleMaps: false }
  );
  return location[0].region;
}
