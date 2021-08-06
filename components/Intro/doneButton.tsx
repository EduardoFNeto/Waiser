import React from "react";
import { View, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

export const renderDoneButton = () => {
  return (
    <View style={styles.buttonCircle}>
      <Icon
        name="md-checkmark"
        color="#fff"
        size={24}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    marginRight: 15,
    backgroundColor: "#585EED",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  }
});