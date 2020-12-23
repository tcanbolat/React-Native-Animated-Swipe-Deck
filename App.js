import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { Dimensions } from "react-native";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import Banner from "./components/Banner";
import Deck from "./components/Deck";
import Rewind from "./assets/icons/Tinder-Rewind.png";
import Nope from "./assets/icons/Tinder-Nope.png";
import SuperLike from "./assets/icons/Tinder-Super-Like.png";
import Like from "./assets/icons/Tinder-Like.png";
import Boost from "./assets/icons/Tinder-Boost.png";

export default function App() {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [imageData, setImageData] = useState([]);

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://randomuser.me/api/?results=8");
      const resData = await response.json();
      setUserData(resData.results);
    } catch (err) {
      console.log("ERROR! COULD NOT FETCH USER DATA! ", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setImageData([Rewind, Nope, SuperLike, Like, Boost]);
    getUserData();
  }, []);

  const renderCard = (item) => {
    return (
      <View style={styles.card}>
        <ImageBackground
          style={styles.backgroundImage}
          source={{ uri: item.picture.large }}
        >
          <Text style={styles.cardText}>
            {item.name.first + " " + item.dob.age}
          </Text>
        </ImageBackground>
      </View>
    );
  };

  const renderNoCards = () => {
    return (
      <Card>
        <Card.Title>ALL DONE</Card.Title>
        <Text style={styles.cardText}>No more cards left.</Text>
        <Button
          title="GET MORE"
          backgroundColor="#03a9f4"
          onPress={getUserData}
        />
      </Card>
    );
  };

  return (
    <SafeAreaView>
      {/* <Banner images={Rewind} /> */}
      <View style={styles.cardContainer}>
        <Deck
          data={userData}
          loading={isLoading}
          renderCard={renderCard}
          onSwipeRight={() => {
            console.log("SWIPED RIGHT>>>>");
          }}
          onSwipeLeft={() => {
            console.log("SWIPED LEFT<<<<");
          }}
          renderNoCards={renderNoCards}
        />
      </View>
      <Banner images={imageData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 15,
  },
  cardText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    position: "absolute",
    bottom: 15,
    left: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  card: {
    alignSelf: "center",
    borderRadius: 15,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.7,
    shadowColor: "rgba(0, 0, 0, 0.75)",
    shadowOffset: { width: -1, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  cardContainer: {
    height: Dimensions.get("window").height * 0.7,
  },
});
