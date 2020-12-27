import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

// **Transparent Overlay** ; set above the AnimatedScrollView.
// Renders Two buttons both covering half of the curent Image.
// Clicking on the left or right half of image will scroll the View in the correct direction.

const ScrollButtonOverlay = ({ scrollHandler }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => scrollHandler("left")}
        style={styles.scrollButton}
      />
      <TouchableOpacity
        onPress={() => scrollHandler("right")}
        style={styles.scrollButton}
      />
    </View>
  );
};

export default ScrollButtonOverlay;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
  scrollButton: {
    width: "50%",
  },
});
