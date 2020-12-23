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
    <Animated.View key={index} style={(styles.item, animatedStyle)}>
      <TouchableWithoutFeedback
        onPressIn={handleOnPress}
        onPressOut={handlePressOut}
      >
        <Image source={values} />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 5,
    width: 30,
    height: 30,
  },
});

export default AnimatedButton;
