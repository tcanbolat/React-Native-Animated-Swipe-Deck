import React, { useRef } from "react";
import { TouchableWithoutFeedback, Animated, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";

const AnimatedButton = ({ children, swipe, type }) => {
  const buttonSpring = useRef(new Animated.Value(1)).current;
  let buttonRotation = 0;
  type === "star"
    ? (buttonRotation = useRef(new Animated.Value(0)).current)
    : null;

  const animationStyle = {
    transform: [{ scale: buttonSpring }, { rotateX: buttonRotation }],
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
    swipe();
    Animated.spring(buttonSpring, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
      restSpeedThreshold: 1000,
      restDisplacementThreshold: 100,
    }).start(() => {
      type === "star" ? rotate() : null;
    });
  };

  const rotate = () => {
    Animated.spring(buttonRotation, {
      toValue: 5,
      useNativeDriver: true,
      restSpeedThreshold: 1000,
      restDisplacementThreshold: 100,
    }).start(() => {
      Animated.spring(buttonRotation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    });
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
    elevation: 3, // for android so that shadows appear
  },
  image: {
    width: 15,
    height: 15,
    padding: 10,
  },
});

export default AnimatedButton;
