import React from "react";
import { View } from "react-native";
import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg";

//Heart by Vicons Design from thenounproject.com

const Heart = () => {
  return (
    <View style={{ paddingTop: 10 }}>
      <Svg viewBox="0 0 100 107.635" width="35pt" height="35pt">
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0.6" y2="0">
            <Stop offset="0" stopColor="#00FFFF" stopOpacity="1" />
            <Stop offset="1" stopColor="#76EE00" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <G fill="url(#grad)">
          <Path d="M72.748,0C55.736,0,50,15.099,50,15.099S44.271,0,27.252,0C10.245,0,0,16.214,0,29.578c0,22.396,50,56.53,50,56.53s50-34.126,50-56.526C100,16.214,89.76,0,72.748,0z" />
        </G>
      </Svg>
    </View>
  );
};

export default Heart;
