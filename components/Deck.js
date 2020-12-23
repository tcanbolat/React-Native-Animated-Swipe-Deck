import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions,
  Text,
  LayoutAnimation,
  UIManager,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.45 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 120;

const Deck = ({
  data,
  renderCard,
  onSwipeRight,
  onSwipeLeft,
  renderNoCards,
  loading,
}) => {
  const position = new Animated.ValueXY();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setCurrentIndex(0);
  }, [loading]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
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
  });

  const forceSwipe = (direction) => {
    Animated.timing(position, {
      toValue: {
        x: direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH,
        y: 0,
      },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => {
      onSwipeComplete(direction);
    });
  };

  const onSwipeComplete = (direction) => {
    const item = data[currentIndex];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.9, 0, SCREEN_WIDTH * 1.9],
      outputRange: ["40deg", "0deg", "-40deg"],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate: rotate }],
    };
  };

  const likeOverlay = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const nopeOverlay = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });

  const scaleInNextCard = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>LOADING...</Text>
      </View>
    );
  }

  const renderCards = data
    .map((item, index) => {
      if (index < currentIndex) return null;
      if (index === currentIndex) {
        return (
          <Animated.View
            key={item.login.uuid}
            style={[getCardStyle(), styles.cardStyle]}
            {...panResponder.panHandlers}
          >
            <Animated.Text style={{ ...styles.likeText, opacity: likeOverlay }}>
              LIKE
            </Animated.Text>
            <Animated.Text style={{ ...styles.nopeText, opacity: nopeOverlay }}>
              Nope
            </Animated.Text>
            {renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <Animated.View
          key={item.login.uuid}
          style={[
            styles.cardStyle,
            { transform: [{ scale: scaleInNextCard }] },
          ]}
        >
          {renderCard(item)}
        </Animated.View>
      );
    })
    .reverse();

  if (currentIndex >= data.length) {
    return renderNoCards();
  }

  return <View style={{ top: 40 }}>{renderCards}</View>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "blue",
  },
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
  likeText: {
    position: "absolute",
    zIndex: 1,
    left: 45,
    top: 45,
    color: "green",
    fontSize: 42,
    fontWeight: "bold",
    transform: [{ rotate: "-20deg" }],
    borderWidth: 5,
    borderColor: "green",
    borderRadius: 5,
    padding: 5,
    letterSpacing: 9,
  },
  nopeText: {
    position: "absolute",
    zIndex: 1,
    right: 45,
    top: 45,
    color: "red",
    fontSize: 42,
    fontWeight: "bold",
    transform: [{ rotate: "20deg" }],
    borderWidth: 5,
    borderColor: "red",
    borderRadius: 5,
    padding: 5,
    letterSpacing: 9,
  },
});

export default Deck;
