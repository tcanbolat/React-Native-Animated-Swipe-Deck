import React, { useState, useRef } from "react";
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
import AnimatedScrollView from "../AnimatedScrollView";
import AnimatedOverlay from "./AnimatedOverlay";
import HelperView from "../HelperView";
import handleDragRange from "../../helper/handleDragRange";

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = 0.45 * width;
const SWIPE_OUT_DURATION = 125;

const AnimatedDeck = ({ loading, dogData }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gesture) => !!handleDragRange(gesture),
    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe("right");
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe("left");
      } else {
        resetPosition();
      }
    },
    onPanResponderTerminationRequest: () => true,
  });

  const forceSwipe = (direction) => {
    Animated.timing(position, {
      toValue: {
        x: direction === "right" ? width : -width,
        y: 0,
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
    const item = dogData[currentIndex];
    // direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    setCurrentIndex((prevIndex) => prevIndex + 1);
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
  const scaleIn = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  });
  const opacity = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0, 1],
    extrapolate: "clamp",
  });

  if (loading) {
    return <HelperView title="Loading" />;
  }

  const topCard = (item) => (
    <Animated.View
      style={[
        styles.deck,
        {
          ...position.getLayout(),
          transform: [{ rotate: rotate }],
        },
        { elevation: 7 },
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

  const cardStack = (item, index) => (
    <Animated.View
      key={Platform.OS === "android" ? item.id : null}
      style={[
        styles.deck,
        {
          transform: [{ scale: scaleIn }],
          opacity: opacity,
        },
        index === currentIndex + 1 ? { elevation: 7 } : null,
        Platform.OS === "android" ? { position: "absolute" } : null,
      ]}
    >
      <Text style={styles.cardTitle}>{item.breed}</Text>
      <AnimatedScrollView imageData={item.images} />
    </Animated.View>
  );

  const renderCards = dogData
    .map((item, index) => {
      if (index < currentIndex) return null;
      if (index === currentIndex) {
        return Platform.OS === "android" ? (
          topCard(item, index)
        ) : (
          <View style={styles.deckShadow} key={item.id}>
            {topCard(item, index)}
          </View>
        );
      }
      return Platform.OS === "android" ? (
        cardStack(item, index)
      ) : (
        <View
          style={[
            index === currentIndex + 1 ? styles.deckShadow : { opacity: 0 },
            { position: "absolute", height: "100%", width: "100%" },
          ]}
          key={item.id}
        >
          {cardStack(item, index)}
        </View>
      );
    })
    .reverse();

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

  return renderCards;
};

export default AnimatedDeck;

const styles = StyleSheet.create({
  deck: {
    alignSelf: "center",
    width: "95%",
    height: "100%",
    borderRadius: 10,
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
