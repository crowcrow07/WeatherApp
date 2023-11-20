import * as Location from "expo-location";

export default async function getLocation(setOk) {
  const { granted } = await Location.requestForegroundPermissionsAsync();
  if (!granted) {
    setOk(false);
  }

  const {
    coords: { latitude, longitude },
  } = await Location.getCurrentPositionAsync({ accuracy: 5 });

  return { latitude, longitude };
}
