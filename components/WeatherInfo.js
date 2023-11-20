import { View, Text } from "react-native";

import { styles } from "../style";

export default function WeatherInfo({ temp, weather }) {
  return (
    <View style={styles.day}>
      <Text style={styles.temp}>{temp}</Text>
      <Text style={styles.description}>{weather}</Text>
    </View>
  );
}
