import React, { useEffect, useRef, useState } from "react";
import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Easing,
} from "react-native";
import * as Haptics from "expo-haptics";

const AnimatedButton = ({ children, swipe, type }) => {
  const buttonSpring = useRef(new Animated.Value(1)).current;
  const buttonRotation = new Animated.Value(0);
  const buttonElevation = new Animated.Value(3); // for android 

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
    swipe();
    Animated.spring(buttonSpring, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start(type === "star" ? rotate() : null);
  };

  const rotate = () => {
    Animated.parallel([
      Animated.timing(buttonElevation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(buttonRotation, {
        toValue: 2,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const spin = buttonRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animationStyle = {
    transform: [{ scale: buttonSpring }, { rotateX: spin }],
    elevation: type == "star" ? buttonElevation : 3,
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handleOnPress}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.item, animationStyle]}>
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
  },
  image: {
    width: 15,
    height: 15,
    padding: 10,
  },
});

export default AnimatedButton;
