import React, { useContext } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Title, Text, Button } from 'react-native-paper'

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

  const signUpEmail = () => {
    navigation.push("Login");
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Waiser</Title>
      <Text style={styles.text}>Pergunte, aprenda e conecte-se!</Text>
      <Button mode="contained" onPress={signUpFacebook} style={styles.facebookBtn}>Entrar com Facebook</Button>
      <Button mode="contained" onPress={signUpEmail} style={styles.emailBtn}>Entrar com Email</Button>
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
  title: {
    fontSize: 32
  },
  text: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 60
  },
  facebookBtn: {
    backgroundColor: "#4267B2",
    color: "#ffffff",
    marginBottom: 15
  },
  emailBtn: {
    backgroundColor: "#1ECD8C",
    color: "#ffffff"
  }
});

export default Welcome;
