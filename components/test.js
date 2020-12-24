import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
} from "react-native";

const images = new Array(6).fill(
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4"
);

const ScrollComp = () => {
  const [scrollCount, setScrollCount] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    scroll.scrollTo({ x: windowWidth * scrollCount });
    console.log(scrollCount);
  }, [scrollCount]);

  const handleScroll = (direction) => {
    if (direction === "right") {
      setScrollCount((prevCount) => {
        return prevCount === images.length - 1 ? prevCount : prevCount + 1;
      });
    } else {
      setScrollCount((prevCount) => {
        console.log(prevCount);
        return prevCount === 0 ? prevCount : prevCount - 1;
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.ButtonViewContainer}>
          <TouchableWithoutFeedback onPress={() => handleScroll("left")}>
            <View style={styles.ButtonContainer}></View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleScroll("right")}>
            <View style={styles.ButtonContainer}></View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView
          scrollEnabled={false}
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ])}
          scrollEventThrottle={2}
          ref={(node) => (scroll = node)}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth, height: 250 }}
                key={imageIndex}
              >
                <ImageBackground source={{ uri: image }} style={styles.card}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {"Image - " + imageIndex}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const backgroundColor = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: ["silver", "white", "silver"],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[
                  styles.normalDot,
                  { width: windowWidth / images.length },
                  { backgroundColor: backgroundColor },
                ]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 4,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  normalDot: {
    height: 4,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    position: "absolute",
    top: 5,
  },
  ButtonViewContainer: {
    flexDirection: "row",
    zIndex: 5,
    height: "100%",
  },
  ButtonContainer: {
    padding: 30,
    width: "100%",
  },
});

export default ScrollComp;
