import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Headline, Text } from "react-native-paper";
import { Post } from "../../models/post";

export const PostItem = ({ post }: { post: Post }) => {
  const navigation = useNavigation();

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.push("Profile", { userId: post.user.id });
          }}
        >
          {post.user.avatar ? (
            <Avatar.Image size={24} source={{ uri: post.user.avatar }} />
          ) : (
            <Avatar.Text size={24} label={post.user.name.charAt(0)} />
          )}
        </TouchableOpacity>
        <Text style={{ marginLeft: 8 }}>
          <Text
            onPress={() => {
              navigation.push("Profile", { userId: post.user.id });
            }}
            style={{ fontWeight: "bold" }}
          >
            {post.user.name}
          </Text>{" "}
          <Text style={{ marginLeft: 8, fontWeight: "normal" }}>· 4h</Text>
        </Text>
      </View>
      <View>
        <Headline style={{ fontSize: 20, lineHeight: 26 }}>
          {post.title}
        </Headline>
        {post.text && <Text style={{marginTop: 10, color: "#4d4d4d"}}>
          {post.text}
        </Text>}
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
