import React, { useContext, useState } from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Parse from "./services/parse";
import Routes from "./routes";
import { useEffect } from "react";
import { UserContext, UserProvider } from "./contexts/user";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setUser] = useContext(UserContext);

  useEffect(() => {
    async function checkLogin() {
      const user = await Parse.User.currentAsync();
      if (user) {
        setUser({
          id: user.id,
          username: user.getUsername(),
          name: user.get("name"),
          avatar: user.get("avatar"),
        });
      }
      setIsLoading(true);
    }

    checkLogin();
  }, [setIsLoading]);

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
