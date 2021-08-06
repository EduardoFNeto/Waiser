import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { Caption, Colors, Headline, Text } from "react-native-paper";
import { Post } from "../../models/post";
import dateUtils from "../../utils/dates";
import { Avatar } from "../Avatar";
import { Reactions } from "../Reactions";

export const AnswerItem = ({ post }: { post: Post }) => {
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
          <Avatar user={post.user} />
        </TouchableOpacity>
        <View style={{ marginLeft: 8 }}>
          <Text style={{ marginBottom: 4 }}>
            <Text
              onPress={() => {
                navigation.push("Profile", { userId: post.user.id });
              }}
              style={{ fontWeight: "bold" }}
            >
              {post.user.name}
            </Text>{" "}
            <Text style={{ marginLeft: 8, fontWeight: "normal" }}>
              · {dateUtils.timeAgo(post.createdAt)}
            </Text>
          </Text>
          <Text style={{marginTop: 0, lineHeight: 14, color: Colors.grey800}}>12 respostas · 325 curtidas</Text>
        </View>
      </View>
      <View>
        <Headline style={{ fontSize: 20, lineHeight: 26 }}>
          {post.title}
        </Headline>
      </View>

      <Reactions post={post} showCommentButton={false} />
    </View>
  );
};
