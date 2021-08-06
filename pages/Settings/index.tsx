import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { UserContext } from "../../contexts/user";
import { logOut } from "../../services/api/authentication";

const Settings = ({ navigation }) => {
  const [, setUser] = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <TouchableOpacity
        onPress={async () => {
          await logOut();
          setUser(null);
          navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
          });
        }}
      >
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default Settings;
