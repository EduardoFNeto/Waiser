import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export const TagItem = ({ name, onPress, checked }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        backgroundColor: checked ? theme.colors.primary : "#ebebeb",
        paddingHorizontal: 12,
        marginRight: 8,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        height: 32,
        alignSelf: 'flex-start'
      }}
    >
      <Text
        style={{
          color: checked ? "#fff" : "#333",
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
