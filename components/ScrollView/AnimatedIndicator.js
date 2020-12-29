import React from "react";
import { StyleSheet, View, Animated } from "react-native";

const AnimatedIndicator = ({ indicatorCount, scrollPosition, width }) => {
  return (
    <View style={styles.indicatorContainer}>
      {indicatorCount.map((element, imageIndex) => {
        const backgroundColor = scrollPosition.interpolate({
          inputRange: [
            width * (imageIndex - 1),
            width * imageIndex,
            width * (imageIndex + 1),
          ],
          outputRange: [
            "rgba(192,192,192, 0.6)",
            "white",
            "rgba(192,192,192, 0.6)",
          ],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={imageIndex}
            style={[
              styles.indicator,
              { width: (width * 0.91) / indicatorCount.length },
              { backgroundColor: backgroundColor },
            ]}
          />
        );
      })}
    </View>
  );
};

export default AnimatedIndicator;

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 5,
    alignSelf: "center",
    width: "98%",
  },
  indicator: {
    height: 4,
    borderRadius: 7,
  },
});
