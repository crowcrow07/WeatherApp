import { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";

import WeatherInfo from "./components/WeatherInfo";
import getLocation from "./util/getLocation";
import reverseGeocode from "./util/reverseGeocode";

import { API_KEY } from "@env";
import { styles } from "./style";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([{ temp: 0, weather: "sunny" }]);
  const [ok, setOk] = useState(true);

  const fetchWeather = async (latitude, longitude) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    const json = await response.json();

    return {
      temp: Math.round(json.main.temp - 273.15),
      weather: json.weather[0].main,
    };
  };

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
