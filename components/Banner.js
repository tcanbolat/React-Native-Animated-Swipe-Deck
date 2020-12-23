import React from "react";
import { View, StyleSheet } from "react-native";
import AnimatedButton from "../helper/AnimatedButton";

const Banner = ({ images }) => {
  const renderImages = images.map((image, index) => {
    return <AnimatedButton key={index} values={image} />;
  });

  return <View style={styles.container}>{renderImages}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25,
  },
});

export default Banner;
