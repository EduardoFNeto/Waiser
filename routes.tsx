import React, { useContext, useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { UserContext } from "./contexts/user";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

import Register from "./pages/Register";
import FinishRegister from "./pages/Register/finish";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import { PostDetail } from "./pages/PostDetail";

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import merge from "deepmerge";
import TagsView from "./pages/Tags";
import CreateGroup from "./pages/CreateGroup";
import GroupDetail from "./pages/GroupDetail";
import ExploreGroups from "./pages/ExploreGroups";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const Stack = createStackNavigator();

const Routes = () => {
  const [user] = useContext(UserContext);

  const theme = useMemo(
    () => ({
      ...CombinedDefaultTheme,
      colors: {
        ...CombinedDefaultTheme.colors,
        primary: "#585EED",
        accent: "#21CA8E",
        background: "#fff",
        card: "#fff",
      },
    }),
    [CombinedDefaultTheme]
  );

  return (
    <PaperProvider theme={theme}>
      <Stack.Navigator
        initialRouteName={user ? "Main" : "Welcome"}
        screenOptions={{
          headerBackTitleVisible: false
        }}
      >
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="FinishRegister" component={FinishRegister} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="PostDetail" component={PostDetail} />
        <Stack.Screen name="GroupDetail" component={GroupDetail} />
        <Stack.Screen name="ExploreGroups" component={ExploreGroups} />
        <Stack.Screen name="Tags" component={TagsView} />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default Routes;
