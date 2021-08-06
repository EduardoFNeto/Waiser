import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Colors, Headline, Text, useTheme } from "react-native-paper";
import { UserContext } from "../../contexts/user";
import { Post } from "../../models/post";
import { Tag } from "../../models/tag";
import { likeService } from "../../services/api/like";
import dateUtils from "../../utils/dates";

export const PostItem = ({
  post,
  showText,
}: {
  post: Post;
  showText: boolean;
}) => {
  const navigation = useNavigation();

  const [user] = useContext(UserContext);

  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isDisliked, setIsDisliked] = useState(post.isDisliked);
  const [totalLikes, setTotalLikes] = useState(post.totalLikes);

  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    setIsLiked(post.isLiked);
    setIsDisliked(post.isLiked);
    setTotalLikes(post.totalLikes);
  }, [post]);

  const likePost = () => {
    if (isLoading) return;
    setIsLiked(!post.isLiked);

    setIsLoading(true);
    likeService.like(post.id).finally(() => {
      setIsLoading(false);
    });
  };

  const dislikePost = () => {
    if (isLoading) return;
    setIsLiked(!post.isLiked);

    setIsLoading(true);
    likeService.like(post.id).finally(() => {
      setIsLoading(false);
    });
  };

  const isMyTag = useCallback(
    (tag: Tag) => {
      return user.tags?.some((t: Tag) => t.id === tag.id);
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
          {post.user.avatar ? (
            <Avatar.Image size={32} source={{ uri: post.user.avatar }} />
          ) : (
            <Avatar.Text size={32} label={post.user.name.charAt(0)} />
          )}
        </TouchableOpacity>
        <View style={{ marginLeft: 8 }}>
          <Text style={{marginBottom: 4}}>
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
        {post.text && showText && (
          <Text style={{ color: "#4d4d4d", fontSize: 16 }}>{post.text}</Text>
        )}
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
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
            <TouchableOpacity style={{ marginRight: 4 }} onPress={likePost}>
              <MaterialCommunityIcons
                name="arrow-up"
                size={22}
                color={isLiked ? theme.colors.accent : Colors.grey600}
              />
            </TouchableOpacity>
            {totalLikes ? <Text>{totalLikes}</Text> : <Text>Votar</Text>}
          </View>
          <TouchableOpacity style={{ marginLeft: 8 }} onPress={dislikePost}>
            <MaterialCommunityIcons
              name="arrow-down"
              size={22}
              color={isDisliked ? theme.colors.accent : Colors.grey600}
            />
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
            <MaterialCommunityIcons
              name="comment"
              size={16}
              color={Colors.grey600}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
