import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { Colors, Headline, Text, useTheme } from "react-native-paper";
import { Post } from "../../models/post";
import dateUtils from "../../utils/dates";
import { AvatarWithProgress } from "../AvatarWithProgress";
import MiniTagList from "../MiniTagList";
import { Reactions } from "../Reactions";

export const PostItem = ({
  post,
  isDetail,
}: {
  post: Post;
  isDetail?: boolean;
}) => {
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
          <AvatarWithProgress user={post.user} createdAt={post.createdAt} />
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
          <MiniTagList tags={post.tags} />
        </View>
      </View>
      <View>
        <Headline style={{ fontSize: 20, lineHeight: 26, marginBottom: 0 }}>
          {post.title}
        </Headline>
        {post.text && isDetail && (
          <Headline style={{ fontSize: 16, lineHeight: 20, marginTop: 7 }}>
            {post.text}
          </Headline>
        )}
      </View>
      <Reactions post={post} showCommentButton={!isDetail} />
    </View>
  );
};
