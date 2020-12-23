import React, { useEffect, useState } from "react";
import { StyleSheet, View, Animated } from "react-native";

const Ball = () => {
  const position = new Animated.ValueXY(0, 0);

  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 300, y: 650 },
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View style={position.getLayout()}>
      <View style={styles.ball} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: "black",
  },
});

export default Ball;
