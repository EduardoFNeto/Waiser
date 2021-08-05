import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import * as Facebook from "expo-facebook";
import { FACEBOOK_APP_ID } from "../../config/constants";
import { facebookLogin } from "../../services/api/authentication";
import { UserContext } from "../../contexts/user";

const Welcome = ({ navigation }) => {
  const [, setUser] = useContext(UserContext);

  const signUpFacebook = async () => {
    try {
      await Facebook.initializeAsync({ appId: FACEBOOK_APP_ID });
      const { expirationDate, type, token } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,picture.type(large),email&access_token=${token}`
        );
        const data = await response.json();
        const { id, name, picture } = data;

        const user = await facebookLogin({
          id,
          name,
          access_token: token,
          picture: picture.data.url,
        });

        setUser(user);

        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      } else {
        Alert.alert("Deu ruim");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Login Facebook" onPress={signUpFacebook} />
      <Button title="Entrar com Email" />
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
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default Welcome;
