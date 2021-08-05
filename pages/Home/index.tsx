import React from "react";
import { StyleSheet, Text, Button, View } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Login é aqui</Text>
      <Button
        title="Go to Login Social"
        onPress={() => navigation.navigate('SocialLogin')}
      />
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
    width: 200,
    height: 200 
  },
  text: { 
    fontSize: 18,
    textAlign: "center" },
});

export default Home;