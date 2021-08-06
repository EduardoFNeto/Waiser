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
import MiniTagList from "../../components/MiniTagList";
import { Group } from "../../models/group";

const GroupList = ({ groups, isLoading }: { groups: Group[], isLoading: boolean }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: Group }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("GroupDetail", { groupId: item.id });
        }}
        style={{ paddingLeft: 16 }}
      >
        <View style={{ flexDirection: "row", alignItems: 'flex-start' }}>
          <Avatar.Text size={50} label={item.title.charAt(0)} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
              {item.title}
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
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <Divider style={{ marginVertical: 12 }} />
        )}
        contentContainerStyle={{ paddingVertical: 16 }}
        ListFooterComponent={() => {
          if (isLoading) {
            return <ActivityIndicator />
          }
          return null
        }}
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

export default GroupList;
