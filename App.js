import React from "react";
import { StatusBar, StyleSheet, View, SafeAreaView } from "react-native";
import AnimatedDeck from "./components/Deck/AnimatedDeck";
import DATA from "./data/dummy-data";

const App = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar hidden />
      <View style={styles.header}></View>
      <View style={styles.body}>
        <AnimatedDeck data={DATA} />
      </View>
      <View style={styles.footer}></View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  header: {
    flex: 1,
    // borderWidth: 4,
    // borderColor: "orange",
  },
  body: { flex: 6 },
  footer: {
    flex: 1,
    // borderWidth: 4,
    // borderColor: "blue",
    zIndex: -1,
  },
});
