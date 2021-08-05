import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  Avatar,
  Text,
  Headline,
  Divider,
  ActivityIndicator,
  Caption,
} from "react-native-paper";
import { Post } from "../../models/post";
import { useNavigation } from "@react-navigation/native";

export const Posts = ({
  posts,
  isLoading,
}: {
  posts: Post[];
  isLoading: boolean;
}) => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: Post }) => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.push("Profile", { userId: item.user.id });
            }}
          >
            {item.user.avatar ? (
              <Avatar.Image source={{ uri: item.user.avatar }} />
            ) : (
              <Avatar.Text size={24} label={item.user.name.charAt(0)} />
            )}
          </TouchableOpacity>
          <Text style={{ marginLeft: 8 }}>
            <Text
              onPress={() => {
                navigation.push("Profile", { userId: item.user.id });
              }}
              style={{ fontWeight: "bold" }}
            >
              {item.user.name}
            </Text>{" "}
            <Text style={{ marginLeft: 8, fontWeight: "normal" }}>· 4h</Text>
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Headline style={{ fontSize: 20, lineHeight: 26 }}>
            {item.title}
          </Headline>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
        >
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderRadius: 16,
              borderColor: "#e9e9e9",
              paddingHorizontal: 10,
              height: 32,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity style={{ marginRight: 4 }}>
                <MaterialCommunityIcons name="arrow-up" size={22} />
              </TouchableOpacity>
              <Text>Votar</Text>
            </View>
            <TouchableOpacity style={{ marginLeft: 8 }}>
              <MaterialCommunityIcons name="arrow-down" size={22} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                height: 32,
                width: 32,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 16,
                borderColor: "#e9e9e9",
              }}
            >
              <MaterialCommunityIcons name="comment" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingVertical: 16,
        }}
        ItemSeparatorComponent={() => <Divider style={{marginVertical: 16}} />}
        ListEmptyComponent={() => (
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Caption>Nenhuma publicação encontrada</Caption>
          </View>
        )}
      />
    </View>
  );
};
