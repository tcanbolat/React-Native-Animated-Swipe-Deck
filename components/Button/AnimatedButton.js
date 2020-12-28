import React, { useRef } from "react";
import {
  TouchableWithoutFeedback,
  Image,
  Animated,
  StyleSheet,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import Nope from "../Button/SVGComponents/Nope";
import Star from "./SVGComponents/Star";

const AnimatedButton = ({ index, children }) => {
  const buttonSpring = useRef(new Animated.Value(1)).current;

  const animatedStyle = {
    transform: [{ scale: buttonSpring }],
  };

  const lightFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.light);
  };

  const handleOnPress = () => {
    lightFeedback();
    return Animated.spring(buttonSpring, {
      toValue: 0.5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    lightFeedback();
    return Animated.spring(buttonSpring, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handleOnPress}
      onPressOut={handlePressOut}
    >
      <Animated.View key={index} style={[styles.item, animatedStyle]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 50,
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.3,
    elevation: 3, // for android so that shadows appear
  },
  image: {
    width: 15,
    height: 15,
    padding: 10,
  },
});

export default AnimatedButton;
