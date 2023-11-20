import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";

import { API_KEY } from "@env";

import { styles } from "./style";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([{ temp: 0, weather: "sunny" }]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].region);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    const json = await response.json();

    setDays([
      {
        ...days,
        temp: Math.round(json.main.temp - 273.15),
        weather: json.weather[0].main,
      },
    ]);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>{days[0].temp}</Text>
          <Text style={styles.description}>{days[0].weather}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
