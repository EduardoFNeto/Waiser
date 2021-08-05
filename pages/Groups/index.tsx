import React from "react";
import { StyleSheet, Text, Button, View } from "react-native";

const Groups = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Groups</Text>
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

export default Groups;
