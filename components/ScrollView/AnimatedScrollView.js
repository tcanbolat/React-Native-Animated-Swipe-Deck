import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Animated,
  Dimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import AnimatedIndicator from "./AnimatedIndicator";
import ScrollButtonOverlay from "./ScrollButtonOverlay";

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

  const AnimatedScroll = Animated.event(
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
  );

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
    <View style={styles.scrollViewContainer}>
      <ScrollButtonOverlay scrollHandler={handleScroll} />
      <ScrollView
        scrollEnabled={false}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={AnimatedScroll}
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
      <AnimatedIndicator
        indicatorCount={[...Array(imageData.length)]}
        scrollPosition={scrollX}
        width={width}
      />
    </View>
  );
};

export default AnimatedScrollView;

const styles = StyleSheet.create({
  scrollViewContainer: { flex: 1 },
  imageStyle: {
    width: width * 0.95,
  },
});
