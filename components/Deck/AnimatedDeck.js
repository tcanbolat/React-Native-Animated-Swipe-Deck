import React, { useState, useRef } from "react";
import { PanResponder, StyleSheet, Dimensions, Animated } from "react-native";
import * as Haptics from "expo-haptics";
import HelperView from "../HelperView";
import handleDragRange from "../../helper/handleDragRange";
import Card from "./DeckCard/Card";

const { width, height } = Dimensions.get("window");
const HORIZONTAL_SWIPE_THRESHOLD = 0.45 * width;
const VERTICALL_SWIPE_THRESHOLD = 0.45 * -height;
const SWIPE_OUT_DURATION = 125;

const AnimatedDeck = ({ data }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gesture) => !!handleDragRange(gesture),
    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
      // console.log("Y ", position.y);
      // console.log("X ", position.x);
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > HORIZONTAL_SWIPE_THRESHOLD) {
        forceSwipe("right");
      } else if (gesture.dx < -HORIZONTAL_SWIPE_THRESHOLD) {
        forceSwipe("left");
      } else if (gesture.dy < VERTICALL_SWIPE_THRESHOLD) {
        forceSwipe("vertical");
      } else {
        resetPosition();
      }
    },
    onPanResponderTerminationRequest: () => true,
  });

  const forceSwipe = (direction) => {
    Animated.timing(position, {
      toValue: {
        x:
          direction === "right"
            ? width + 100
            : direction === "left"
            ? -width - 100
            : 0,
        y: direction === "vertical" ? -height - 100 : 0,
      },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => {
      onSwipeComplete(direction);
    });
  };

  const onSwipeComplete = (direction) => {
    position.setValue({ x: 0, y: 0 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const item = data[currentIndex];
    setCurrentIndex((prevIndex) => prevIndex + 1);
    // direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const rotate = position.x.interpolate({
    inputRange: [-width * 1.9, 0, width * 1.9],
    outputRange: ["40deg", "0deg", "-40deg"],
  });
  const scaleIn = Animated.add(position.x, position.y).interpolate({
    inputRange: [-width / 2, 0.6, width / 2],
    outputRange: [1, 0.81, 1],
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
        onPress={() => {
          setCurrentIndex(0);
        }}
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
          gestureHandler={panResponder.panHandlers}
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
