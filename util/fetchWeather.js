import { API_KEY } from "@env";

export default async function fetchWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  );
  const json = await response.json();

  return {
    temp: Math.round(json.main.temp - 273.15),
    weather: json.weather[0].main,
  };
}
