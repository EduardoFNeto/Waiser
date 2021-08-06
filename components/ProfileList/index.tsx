import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, FlatList } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Colors,
  Divider,
  IconButton,
} from "react-native-paper";
import MiniTagList from "../MiniTagList";
import { User } from "../../models/user";

const ProfileList = ({ users, isLoading }: { users: User[], isLoading: boolean }) => {
  console.log(users, 'USUÁRIOS')
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: User }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("Profile", { userId: item.id });
        }}
        style={{ paddingLeft: 16 }}
      >
        <View style={{ flexDirection: "row", alignItems: 'flex-start' }}>
          <Avatar.Text size={50} label={item.name.charAt(0)} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
              {item.name}
            </Text>
            <MiniTagList tags={item.tags} />
          </View>
          <IconButton icon="chevron-right" color={Colors.grey500} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <Divider style={{ marginVertical: 12 }} />
        )}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  createButton: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    elevation: 0,
  },
});

export default ProfileList;
