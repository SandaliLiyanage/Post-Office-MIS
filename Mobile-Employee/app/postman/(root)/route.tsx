import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";

const Route = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -31,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Route;
