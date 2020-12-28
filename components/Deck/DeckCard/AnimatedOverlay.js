import React from "react";
import { StyleSheet, Dimensions, Animated } from "react-native";

const { width } = Dimensions.get("window");

const AnimatedOverlay = ({ text, position, animation }) => {
  const conditionalStyles = {
    right: position === "left" ? null : 45,
    left: position === "left" ? 45 : null,
    transform: [{ rotate: position === "left" ? "-20deg" : "20deg" }],
    borderColor: position === "left" ? "green" : "red",
    color: position === "left" ? "green" : "red",
  };

  const outputRange = position === "left" ? [0, 0, 1] : [1, 0, 0];

  const animatedOpacity = animation.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: outputRange,
    extrapolate: "clamp",
  });

  return (
    <Animated.Text
      style={[styles.text, conditionalStyles, { opacity: animatedOpacity }]}
    >
      {text}
    </Animated.Text>
  );
};

export default AnimatedOverlay;

const styles = StyleSheet.create({
  text: {
    position: "absolute",
    zIndex: 1,
    top: 45,
    fontSize: 42,
    fontWeight: "bold",
    borderWidth: 5,
    borderRadius: 5,
    padding: 5,
    letterSpacing: 9,
  },
});
