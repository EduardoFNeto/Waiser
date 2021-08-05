import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Register = () => {
  return (
    <View style={styles.container}>
      <Text>Register</Text>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default Register;