import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet, View, SafeAreaView } from "react-native";
import AnimatedDeck from "./components/Deck/AnimatedDeck";
import HelperView from "./components/HelperView";
import DATA from "./data/dummy-data";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const reloadData = () => {
    setIsError(false);
    setData(DATA);
  };

  useEffect(() => {
    setData(DATA);
    setIsLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar hidden />
      {isError ? (
        <HelperView
          title="Error Fetching Data!"
          button="Try Again"
          onPress={reloadData}
        />
      ) : (
        <React.Fragment>
          <View style={styles.header}></View>
          <View style={styles.body}>
            <AnimatedDeck dogData={data} loading={isLoading} />
          </View>
          <View style={styles.footer}></View>
        </React.Fragment>
      )}
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
    borderWidth: 4,
    borderColor: "orange",
  },
  body: { flex: 6 },
  footer: {
    flex: 1,
    borderWidth: 4,
    borderColor: "blue",
    zIndex: -1,
  },
});
