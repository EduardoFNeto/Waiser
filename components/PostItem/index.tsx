import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { Colors, Headline, Text, useTheme } from "react-native-paper";
import { UserContext } from "../../contexts/user";
import { Post } from "../../models/post";
import { Tag } from "../../models/tag";
import dateUtils from "../../utils/dates";
import { AvatarWithProgress } from "../AvatarWithProgress";
import { Reactions } from "../Reactions";

export const PostItem = ({
  post,
  isDetail,
}: {
  post: Post;
  isDetail: boolean;
}) => {
  const navigation = useNavigation();
  const [user] = useContext(UserContext);
  const theme = useTheme();

  const isMyTag = useCallback(
    (tag: Tag) => {
      return user?.tags?.some((t: Tag) => t.id === tag.id);
    },
    [user]
  );

  const renderTags = () => {
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {post.tags?.map((tag) => (
          <View
            key={tag.id}
            style={{
              backgroundColor: isMyTag(tag)
                ? theme.colors.accent
                : Colors.grey100,
              height: 20,
              paddingHorizontal: 12,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: isMyTag(tag) ? Colors.white : Colors.grey800 }}
            >
              #{tag.name}
            </Text>
          </View>
        ))}
      </View>
    );
  };

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
          <AvatarWithProgress user={post.user} />
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
          {renderTags()}
        </View>
      </View>
      <View>
        <Headline style={{ fontSize: 20, lineHeight: 26, marginBottom: 8 }}>
          {post.title}
        </Headline>
        {post.text && isDetail && (
          <Text style={{ color: Colors.grey800, fontSize: 16 }}>
            {post.text}
          </Text>
        )}
      </View>
      <Reactions post={post} showCommentButton={!isDetail} />
    </View>
  );
};
