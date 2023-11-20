import { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";

import WeatherInfo from "./components/WeatherInfo";
import getLocation from "./util/getLocation";
import reverseGeocode from "./util/reverseGeocode";
import fetchWeather from "./util/fetchWeather";

import { styles } from "./style";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([{ temp: 0, weather: "sunny" }]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    try {
      const { latitude, longitude } = await getLocation(setOk);
      const city = await reverseGeocode(latitude, longitude);
      const weatherInfo = await fetchWeather(latitude, longitude);

      setCity(city);
      setDays([weatherInfo]);
    } catch (error) {
      console.error("Error getting weather:", error);
    }
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
        <WeatherInfo temp={days[0].temp} weather={days[0].weather} />
      </ScrollView>
    </View>
  );
}
