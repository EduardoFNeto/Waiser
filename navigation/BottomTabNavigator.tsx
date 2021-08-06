import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useContext } from "react";
import { IconButton } from "react-native-paper";

import Colors from "../constants/Colors";
import { UserContext } from "../contexts/user";
import useColorScheme from "../hooks/useColorScheme";
import Explore from "../pages/Explore";
import Groups from "../pages/Groups";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Chat from "../pages/Chat";
import LiveChat from "../pages/Chat/LiveChat";
const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="GroupsScreen"
        component={GroupsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="account-group" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ExploreScreen"
        component={ExploreNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="account-plus" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ChatScreen"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="comment-account" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="account-circle" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const HomeStack = createStackNavigator();
function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: "Início" }}
      />
    </HomeStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();
function GroupsNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Groups"
        component={Groups}
        options={{ headerTitle: "Grupos de estudos" }}
      />
    </TabTwoStack.Navigator>
  );
}

const ChatStack = createStackNavigator();
function ChatNavigator() {
  return (
    <ChatStack.Navigator
    >
      <ChatStack.Screen
        name="Chat"
        component={Chat}
        options={{ headerTitle: 'Chat' }}
      />

      <ChatStack.Screen
        name="LiveChat"
        component={LiveChat}
        options={({ route }: { route: any }) => ({ title: route?.params?.name })}
      />
      
    </ChatStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileNavigator({ navigation }) {
  const [user] = useContext(UserContext);

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerRight: () => (
          <IconButton
            icon="dots-vertical"
            onPress={() => {
              navigation.push("Settings");
            }}
          />
        ),
      }}
    >
      <ProfileStack.Screen
        name="ProfileTab"
        initialParams={{
          userId: user?.id,
        }}
        component={Profile}
        options={{ headerTitle: "Profile" }}
      />
    </ProfileStack.Navigator>
  );
}



const ExploreStack = createStackNavigator();
function ExploreNavigator({ navigation }) {
  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerRight: () => (
          <IconButton
            icon="dots-vertical"
            onPress={() => {
              navigation.push("Settings");
            }}
          />
        ),
      }}
    >
      <ExploreStack.Screen
        name="Explore"
        component={Explore}
        options={{ headerTitle: "Conecte-se" }}
      />
    </ExploreStack.Navigator>
  );
}
