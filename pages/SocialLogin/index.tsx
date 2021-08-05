import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as Facebook from "expo-facebook";
import { FACEBOOK_APP_ID }from '../../config/constants';

const Login = () => {
  const [user, setUser] = useState<any>(null);

  const signUpFacebook = async () => {
    try {
      await Facebook.initializeAsync({ appId: FACEBOOK_APP_ID});
      const { expirationDate, type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,picture.type(large),email&access_token=${token}`
        );
        const data = await response.json();
        setUser(data);
      } else {
        console.log('Deu ruim')
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Image style={styles.image} source={{ uri: user.picture.data.url }} />
          <Text style={styles.text}>{user.name}</Text>
          <Text style={styles.text}>{user.email}</Text>
        </View>
      ) : (
        <Button title="Login Facebook" onPress={signUpFacebook} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
  },
  image: { 
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  text: { 
    fontSize: 18,
    textAlign: "center" },
});

export default Login;