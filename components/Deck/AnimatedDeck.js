import React, { useState, useRef, useEffect } from "react";
import {
  PanResponder,
  StyleSheet,
  Dimensions,
  Animated,
  View,
  Platform,
  Text,
} from "react-native";
import * as Haptics from "expo-haptics";
import AnimatedScrollView from "../ScrollView/AnimatedScrollView";
import AnimatedOverlay from "./AnimatedOverlay";
import HelperView from "../HelperView";
import handleDragRange from "../../helper/handleDragRange";

const { width, height } = Dimensions.get("window");
const HORIZONTAL_SWIPE_THRESHOLD = 0.45 * width;
const VERTICALL_SWIPE_THRESHOLD = 0.45 * -height;
const SWIPE_OUT_DURATION = 125;

const AnimatedDeck = ({ dogData }) => {
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
      console.log("FORCE SWIPE", currentIndex);
      onSwipeComplete(direction);
    });
  };

  const onSwipeComplete = (direction) => {
    position.setValue({ x: 0, y: 0 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const item = dogData[currentIndex];
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

  const topCardd = (item) => {
    return (
      <Animated.View
        style={[
          styles.deck,
          {
            ...position.getLayout(),
            transform: [{ rotate: rotate }],
          },
          { elevation: 7 },
          { borderWidth: 5 },
        ]}
        key={Platform.OS === "android" ? item.id : null}
        {...panResponder.panHandlers}
      >
        <AnimatedOverlay text="NOPE" position="right" animation={position} />
        <AnimatedOverlay text="LIKE" position="left" animation={position} />
        <Text style={styles.cardTitle}>{item.breed}</Text>
        <AnimatedScrollView imageData={item.images} />
      </Animated.View>
    );
  };

  const cardStack = (item, index) => (
    <Animated.View
      key={Platform.OS === "android" ? item.id : null}
      style={[
        styles.deck,
        {
          transform: [{ scale: scaleIn }],
          opacity: opacity,
        },
        { elevation: 7 },
        Platform.OS === "android" ? { position: "absolute" } : null,
      ]}
    >
      <Text style={styles.cardTitle}>{item.breed}</Text>
      <AnimatedScrollView imageData={item.images} />
    </Animated.View>
  );

  if (currentIndex >= dogData.length) {
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
    [dogData[currentIndex]].map((item) => {
      return Platform.OS === "android" ? (
        topCardd(item)
      ) : (
        <View style={styles.deckShadow} key={item.id}>
          {topCardd(item)}
        </View>
      );
    }),
    currentIndex >= dogData.length - 1
      ? null
      : [dogData[currentIndex + 1]].map((item) => {
          if (Platform.OS === "android") {
            return cardStack(item);
          }
          return (
            <View
              style={[
                styles.deckShadow,
                { position: "absolute", height: "100%", width: "100%" },
              ]}
              key={item.id}
            >
              {cardStack(item)}
            </View>
          );
        }),
  ].reverse();
};

export default AnimatedDeck;

const styles = StyleSheet.create({
  deck: {
    alignSelf: "center",
    width: "95%",
    height: "100%",
    borderRadius: 7,
    overflow: "hidden",
  },
  deckShadow: {
    shadowOffset: { height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  cardTitle: {
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    left: 12,
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    textShadowOffset: { height: 2 },
    textShadowColor: "black",
    textShadowRadius: 3,
    elevation: 3,
  },
});
