import React from "react";
import { PanResponder, StyleSheet, Dimensions, Animated } from "react-native";
import * as Haptics from "expo-haptics";
import HelperView from "../HelperView";
import handleDragRange from "../../helper/handleDragRange";
import Card from "./DeckCard/Card";

const { width, height } = Dimensions.get("window");
const HORIZONTAL_SWIPE_THRESHOLD = 0.45 * width;
const VERTICALL_SWIPE_THRESHOLD = 0.45 * -height;

const AnimatedDeck = ({ data, currentIndex, updateIndex, position, swipe }) => {
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) =>
      !!handleDragRange(gestureState),
    onPanResponderMove: (event, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
      // console.log("Y ", position.y);
      // console.log("X ", position.x);
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dx > HORIZONTAL_SWIPE_THRESHOLD) {
        swipe("right");
      } else if (gestureState.dx < -HORIZONTAL_SWIPE_THRESHOLD) {
        swipe("left");
      } else if (gestureState.dy < VERTICALL_SWIPE_THRESHOLD) {
        swipe("vertical");
      } else {
        resetPosition();
      }
    },
    onPanResponderTerminationRequest: () => true,
  });

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const resetIndex = () => {
    updateIndex("reset");
  };

  const rotate = position.x.interpolate({
    inputRange: [-width * 1.9, 0, width * 1.9],
    outputRange: ["40deg", "0deg", "-40deg"],
  });
  const scaleIn = Animated.add(position.x, position.y).interpolate({
    inputRange: [-width / 2, 0.6, width / 2],
    outputRange: [1, 0.87, 1],
    extrapolate: "clamp",
  });
  const opacity = Animated.add(position.x, position.y).interpolate({
    inputRange: [-width / 2.5, 0, width / 2.5],
    outputRange: [1, 0.3, 1],
    extrapolate: "clamp",
  });

  if (currentIndex >= data.length) {
    return (
      <HelperView
        title="End of Deck"
        button="Reset List"
        onPress={resetIndex}
      />
    );
  }
  return [
    [data[currentIndex]].map((item) => {
      return (
        <Card
          key={item.id}
          item={item}
          topCard={true}
          position={position}
          gestureStateHandler={panResponder.panHandlers}
          rotate={rotate}
        />
      );
    }),
    currentIndex >= data.length - 1
      ? null
      : [data[currentIndex + 1]].map((item) => {
          return (
            <Card
              key={item.id}
              item={item}
              topCard={false}
              position={position}
              scaleIn={scaleIn}
              opacity={opacity}
            />
          );
        }),
  ].reverse();
};

export default AnimatedDeck;

const styles = StyleSheet.create({});
