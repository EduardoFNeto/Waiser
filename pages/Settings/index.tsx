import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { UserContext } from "../../contexts/user";
import { logOut } from "../../services/api/authentication";

const Settings = ({ navigation }) => {
  const [, setUser] = useContext(UserContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logout}
        onPress={
          async () => {
            await logOut();
            setUser(null);
            navigation.reset({
              index: 0,
              routes: [{ name: "Welcome" }],
            });
          }}
        >
        <Text style={styles.text}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logout: {
    backgroundColor: "#F14336",
    padding: 15,
    minWidth: 100,
    borderRadius: 100,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "InterMedium",
    textAlign: "center"
  }
});

export default Settings;
