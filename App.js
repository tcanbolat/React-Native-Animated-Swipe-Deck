import React, { useState, useRef } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import ButtonConatiner from "./components/ButtonCotainer/ButtonContainer";
import AnimatedDeck from "./components/Deck/AnimatedDeck";
import DATA from "./data/dummy-data";

const SWIPE_OUT_DURATION = 150;
const { width, height } = Dimensions.get("window");

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const updateIndex = (value) => {
    if (value === "reset") {
      setCurrentIndex(0);
    } else setCurrentIndex(currentIndex + 1);
  };

  const swipe = (direction, isButtonSwipe) => {
    Animated.timing(position, {
      toValue: {
        x:
          direction === "right"
            ? width + 100
            : direction === "left"
            ? -width - 100
            : 0,
        y: direction === "vertical" ? -height - 100 : 0,
      },
      duration: isButtonSwipe ? SWIPE_OUT_DURATION + 250 : SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => {
      updateIndex();
      onSwipeCompleted(isButtonSwipe);
    });
  };

  const onSwipeCompleted = (isButtonSwipe) => {
    position.setValue({ x: 0, y: 0 });
    !isButtonSwipe && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar hidden />
      <View style={styles.header}></View>
      <View style={styles.body}>
        <AnimatedDeck
          data={DATA}
          position={position}
          currentIndex={currentIndex}
          updateIndex={updateIndex}
          swipe={swipe}
        />
      </View>
      <View
        pointerEvents={currentIndex === DATA.length ? "none" : "auto"}
        style={[
          styles.footer,
          currentIndex === DATA.length ? { opacity: 0.4 } : null,
        ]}
      >
        <ButtonConatiner swipe={swipe} />
      </View>
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
  body: { flex: 6, zIndex: 1, elevation: 1 },
  footer: {
    flex: 1,
    // borderWidth: 4,
    // borderColor: "blue",
  },
});
