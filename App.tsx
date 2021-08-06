import React, { useContext, useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import * as Font from 'expo-font';

import { UserContext, UserProvider } from "./contexts/user";

import { buildUserFromParse } from "./models/user";
import Parse from "./services/parse";
import Routes from "./routes";
import { buildUserFromParse } from "./models/user";

function App() {
  const [, setIsFontsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setUser] = useContext(UserContext);

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
      });
      setIsFontsLoaded(true);
    }

    loadFonts();
  }, [setIsFontsLoaded])

  if (!isLoading) {
    return <View />;
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

export default Providers;
