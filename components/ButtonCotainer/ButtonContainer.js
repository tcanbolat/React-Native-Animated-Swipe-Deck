import React from "react";
import { StyleSheet, View } from "react-native";
import AnimatedButton from "./Button/AnimatedButton";
import Heart from "./Button/SVGComponents/Heart";
import Nope from "./Button/SVGComponents/Nope";
import Star from "./Button/SVGComponents/Star";

const ButtonConatiner = ({ swipe }) => {
  return (
    <View style={styles.container}>
      <AnimatedButton swipe={() => swipe("left", true)}>
        <Nope />
      </AnimatedButton>
      <AnimatedButton swipe={() => swipe("vertical", true)} type="star">
        <Star />
      </AnimatedButton>
      <AnimatedButton swipe={() => swipe("right", true)}>
        <Heart />
      </AnimatedButton>
    </View>
  );
};

export default ButtonConatiner;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
