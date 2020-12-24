import React, { useRef } from "react";
import {
  TouchableWithoutFeedback,
  Image,
  Animated,
  StyleSheet,
} from "react-native";

const AnimatedButton = ({ index, values }) => {
  const buttonSpring = useRef(new Animated.Value(1)).current;

  const animatedStyle = {
    transform: [{ scale: buttonSpring }],
  };

  const handleOnPress = () => {
    return Animated.spring(buttonSpring, {
      toValue: 0.5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    return Animated.spring(buttonSpring, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handleOnPress}
      onPressOut={handlePressOut}
    >
      <Animated.View key={index} style={[styles.item, animatedStyle]}>
        <Image style={styles.image} source={values} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    width: 50,
    height: 50,
    borderWidth: 4,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 50,
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.3,
    elevation: 3, // for android so that shadows appear
  },
  image: {
    width: 15,
    height: 15,
    padding: 10,
  },
});

export default AnimatedButton;
