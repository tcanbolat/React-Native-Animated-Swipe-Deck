import React from "react";
import { StyleSheet, Dimensions, Animated } from "react-native";

const { width, height } = Dimensions.get("window");

const AnimatedOverlay = ({ text, position, animation }) => {
  const conditionalStyles = [
    {
      right: position === "right" ? 45 : null,
      left: position === "left" ? 45 : null,
      bottom: position === "bottom" ? 10 : null,
      borderColor:
        position === "left"
          ? "green"
          : position === "right"
          ? "red"
          : "#4169E1",
      color:
        position === "left"
          ? "green"
          : position === "right"
          ? "red"
          : "#4169E1",
    },
    position === "bottom"
      ? { alignSelf: "center" }
      : {
          transform: [{ rotate: position === "left" ? "-20deg" : "20deg" }],
          top: 45,
        },
  ];

  const leftRightOpacity = animation.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: position === "left" ? [0, 0, 1] : [1, 0, 0],
    extrapolate: "clamp",
  });

  const bottomOpacity = animation.y.interpolate({
    inputRange: [-height / 1.5, -height / 2.6, 0],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.Text
      style={[
        styles.text,
        conditionalStyles,
        {
          opacity: position === "bottom" ? bottomOpacity : leftRightOpacity,
        },
      ]}
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
    fontSize: 42,
    fontWeight: "bold",
    borderWidth: 5,
    borderRadius: 5,
    padding: 5,
    letterSpacing: 9,
  },
});
