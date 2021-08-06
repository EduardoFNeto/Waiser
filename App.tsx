import React, { useContext, useEffect, useState } from "react";
import { StatusBar, View, Image, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import AppIntroSlider from 'react-native-app-intro-slider';
import { Text } from "react-native-paper";

import * as Font from 'expo-font';

import { UserContext, UserProvider } from "./contexts/user";

import { buildUserFromParse } from "./models/user";
import Parse from "./services/parse";
import Routes from "./routes";

import { introData } from "./constants/Intro";
import { renderDoneButton } from "./components/Intro/doneButton";

function App() {
  const [fontLoaded, setIsFontsLoaded] = useState(false);
  const [, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showApp, setShowApp] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    async function checkLogin() {
      const user = await Parse.User.currentAsync();
      if (user) {
        setUser(buildUserFromParse(user));
      }
      setIsLoading(true);
    }

    checkLogin();
  }, [setIsLoading]);

  // Load custom fonts
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        PoppinsBlack: require('./assets/fonts/Poppins-Black.ttf'),
        InterLight: require('./assets/fonts/Inter-Light.ttf'),
        InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
        InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
        InterBold: require('./assets/fonts/Inter-Bold.ttf'),
      });
      setIsFontsLoaded(true);
    }

    loadFonts();
  }, [setIsFontsLoaded])

  if (!isLoading) {
    return <View />;
  }

  if (!showApp && fontLoaded) {
    return (
      <AppIntroSlider
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        renderDoneButton={renderDoneButton}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <Text style={styles.title}>{item.title}</Text>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.text}</Text>
            </View>
          )
        }} 
        data={introData} onDone={() => {
          setShowApp(true);
        }} 
      />
    );
  }

  return (
    <>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Routes />
      </NavigationContainer>
    </>
  );
}

const Providers = () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 60,
    justifyContent: "space-evenly",
    backgroundColor: "#fafafa"
  },
  image: {
    width: 344,
    height: 286
  },
  activeDotStyle: {
    backgroundColor: "#1ECD8C"
  },
  dotStyle: {
    backgroundColor: "#ccc"
  },
  title: {
    fontFamily: "PoppinsBlack",
    fontSize: 32,
    color: "#1ECD8C"
  },
  text: {
    fontFamily: "InterRegular",
    fontSize: 16,
    color: "#333",
    textAlign: "center"
  }
})

export default Providers;
