import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";

const HelperView = ({ onPress, title, button }) => {
  return (
    <View style={styles.helperView}>
      <Text style={styles.text}>{title}</Text>
      {button ? (
        <Button
          style={styles.button}
          title={button}
          onPress={onPress}
          color="purple"
        />
      ) : null}
    </View>
  );
};

export default HelperView;

const styles = StyleSheet.create({
  helperView: {
    flex: 1,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 35,
    padding: 15,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    color: "black",
  },
});
