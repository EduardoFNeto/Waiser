import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Colors, Text, useTheme } from "react-native-paper";
import { Post } from "../../models/post";

import { likeService } from "../../services/api/like";

export const Reactions = ({
  post,
  showCommentButton,
}: {
  post: Post;
  showCommentButton: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isDisliked, setIsDisliked] = useState(post.isDisliked);
  const [totalLikes, setTotalLikes] = useState(post.totalLikes);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    setIsLiked(post.isLiked);
    setIsDisliked(post.isDisliked);
    setTotalLikes(post.totalLikes);
  }, [post]);

  const likePost = () => {
    if (isLoading) return;
    setIsDisliked(false);
    setIsLiked(!isLiked);
    setTotalLikes((value) => value + 1);

    setIsLoading(true);
    likeService.like(post.id).finally(() => {
      setIsLoading(false);
    });
  };

  const dislikePost = () => {
    if (isLoading) return;
    setIsLiked(false);
    setIsDisliked(!isDisliked);
    if (totalLikes) setTotalLikes((value) => value - 1);

    setIsLoading(true);
    likeService.dislike(post.id).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}>
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
      {showCommentButton && (
        <View>
          <TouchableOpacity
            onPress={() => navigation.push("PostDetail", { postId: post.id })}
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
      )}
    </View>
  );
};

Reactions.defaultProps = {
  showCommentButton: true,
};
