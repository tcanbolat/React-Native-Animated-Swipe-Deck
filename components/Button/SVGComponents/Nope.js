import React from "react";
import { View } from "react-native";
import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg";

// Close by Bingge Liu from thenounproject.com

const Nope = () => {
  return (
    <View style={{ paddingTop: 7 }}>
      <Svg viewBox="0 0 847 1058.75" width="35pt" height="35pt">
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
            <Stop offset="1" stopColor="red" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <G fill="url(#grad)">
          <Path d="M423 530l-273 273c-70,70 -176,-37 -106,-107l273 -273 -273 -273c-70,-70 36,-176 106,-106l273 273 273 -273c70,-70 177,36 107,106l-273 273 273 273c70,70 -37,177 -107,107l-273 -273z" />
        </G>
      </Svg>
    </View>
  );
};

export default Nope;
