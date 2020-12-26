import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const AnimatedScrollView = ({ imageData }) => {
  const [scrollCount, setScrollCount] = useState(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    scrollCount === null
      ? null
      : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scroll.scrollTo({ x: width * 0.95 * scrollCount });
  }, [scrollCount]);

  const handleScroll = (direction) => {
    if (direction === "right") {
      setScrollCount((prevCount) => {
        return prevCount === imageData.length - 1 ? prevCount : prevCount + 1;
      });
    } else {
      setScrollCount((prevCount) => {
        return prevCount === 0 || prevCount === null
          ? prevCount
          : prevCount - 1;
      });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.scrollContainer}>
        <TouchableOpacity
          onPress={() => handleScroll("left")}
          style={styles.scrollButton}
        />
        <TouchableOpacity
          onPress={() => handleScroll("right")}
          style={styles.scrollButton}
        />
      </View>
      <ScrollView
        style={{ borderRadius: 10 }}
        scrollEnabled={false}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={2}
        ref={(node) => (scroll = node)}
      >
        {imageData.map((image, imageIndex) => {
          return (
            <ImageBackground
              key={imageIndex}
              source={{ uri: image }}
              style={styles.imageStyle}
            />
          );
        })}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {[...Array(imageData.length)].map((element, imageIndex) => {
          const backgroundColor = scrollX.interpolate({
            inputRange: [
              width * (imageIndex - 1),
              width * imageIndex,
              width * (imageIndex + 1),
            ],
            outputRange: [
              "rgba(192,192,192, 0.7)",
              "white",
              "rgba(192,192,192, 0.7)",
            ],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={imageIndex}
              style={[
                styles.indicator,
                { width: (width * 0.93) / imageData.length },
                { backgroundColor: backgroundColor },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default AnimatedScrollView;

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
  scrollButton: {
    width: "50%",
  },
  imageStyle: {
    width: width * 0.95,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    width: "100%",
  },
  indicator: {
    height: 4,
    borderRadius: 4,
  },
});
