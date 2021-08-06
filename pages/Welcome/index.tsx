import React, { useContext } from "react";
import { StyleSheet, View, Alert, Image } from "react-native";
import { Caption, Text, Button } from "react-native-paper";

import * as Facebook from "expo-facebook";

import { UserContext } from "../../contexts/user";
import { facebookLogin } from "../../services/api/authentication";
import { FACEBOOK_APP_ID } from "../../config/constants";

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
          routes: [{ name: "FinishRegister" }],
        });
      } else {
        Alert.alert("Erro");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleEmailLogin = () => {
    navigation.push("Login");
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/images/logo2.png')} />
      <Text style={styles.text}>Pergunte, aprenda e conecte-se!</Text>
      <Button 
        mode="contained"
        labelStyle={{ color: "#fff", fontSize: 16, fontFamily: "InterMedium" }}
        uppercase={false}
        onPress={signUpFacebook} 
        style={styles.facebookBtn}
      >
        Entrar com Facebook
      </Button>
      <Button 
        mode="contained"
        labelStyle={{ color: "#21CA8E", fontSize: 16, fontFamily: "InterMedium" }}
        uppercase={false}
        onPress={handleEmailLogin} 
        style={styles.emailBtn}
      >
        Entrar com Email
      </Button>
      <Caption style={styles.caption}>Ao entrar você concorda com os Termos e condições.</Caption>
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
  text: {
    color: "#333333",
    fontSize: 20,
    fontFamily: "InterRegular",
    marginTop: 30,
    marginBottom: 120
  },
  facebookBtn: {
    backgroundColor: "#4267B2",
    color: "#ffffff",
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "InterMedium",
    textTransform: "lowercase",
    padding: 10,
    borderRadius: 58,
    elevation: 0,
    minWidth: 280,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emailBtn: {
    borderWidth: 1,
    borderColor: "#21CA8E",
    backgroundColor: "transparent",
    textTransform: "lowercase",
    padding: 10,
    borderRadius: 58,
    elevation: 0,
    minWidth: 280,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 315,
    height: 120,
  },
  caption: {
    fontSize: 12,
    fontFamily: "InterLight",
    color: "#333",
    marginTop: 60
  }
});

export default Welcome;
