import React from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import AnimatedOverlay from "./AnimatedOverlay";
import AnimatedScrollView from "../../ScrollView/AnimatedScrollView";

const Card = ({
  item,
  topCard,
  gestureStateHandler,
  rotate,
  scaleIn,
  opacity,
  position,
}) => {
  const cardStyle = [
    styles.card,
    topCard
      ? {
          ...position.getLayout(),
          transform: [{ rotate: rotate }],
        }
      : {
          transform: [{ scale: scaleIn }, { perspective: 1000 }],
          opacity: opacity,
        },
  ];

  return (
    <View
      style={[
        styles.cardShadow,
        !topCard && { position: "absolute", height: "100%", width: "100%" },
      ]}
    >
      <Animated.View
        style={cardStyle}
        key={Platform.OS === "android" ? item.id : null}
        {...(topCard && gestureStateHandler)}
      >
        {topCard && (
          <>
            <AnimatedOverlay
              text="NOPE"
              position="right"
              animation={position}
            />
            <AnimatedOverlay text="LIKE" position="left" animation={position} />
            <AnimatedOverlay
              text="SUPER LIKE"
              position="bottom"
              animation={position}
            />
          </>
        )}
        <Text style={styles.cardTitle}>{item.breed}</Text>
        <AnimatedScrollView imageData={item.images} />
      </Animated.View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: "95%",
    height: "100%",
    borderRadius: 7,
    overflow: "hidden",
    elevation: 7,
  },
  cardShadow: {
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
