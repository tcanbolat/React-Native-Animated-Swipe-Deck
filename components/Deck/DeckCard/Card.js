import React from "react";
import { Animated, StyleSheet, View } from "react-native";

const Card = ({ item, index }) => {
    const deckStyle = [
    styles.deck,
    index === currentIndex
      ? {
          ...position.getLayout(),
          transform: [{ rotate: rotate }],
          // elevation: 7,
        }
      : index === currentIndex + 1
      ? {
          transform: [{ scale: scaleIn }],
          opacity: opacity,
          // elevation: 7,
        }
      : { display: "none" },
    Platform.OS === "android" && index === currentIndex + 1
      ? { position: "absolute" }
      : null,
  ];

  const topCard = (item) => {
    return (
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
        index === currentIndex + 1 ? { elevation: 7 } : { display: "none" },
        Platform.OS === "android" ? { position: "absolute" } : null,
      ]}
    >
      <Text style={styles.cardTitle}>{item.breed}</Text>
      <AnimatedScrollView imageData={item.images} />
    </Animated.View>
  );

  return <Animated.View>

  </Animated.View>;
};

export default Card;

const styles = StyleSheet.create({});
