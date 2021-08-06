import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Avatar, Headline, Text } from "react-native-paper";
import { PostItem } from "../../components/PostItem";
import { Post } from "../../models/post";
import { postService } from "../../services/api/posts";

export const PostDetail = () => {
  const [post, setPost] = useState<Post>();
  const navigation = useNavigation();
  const router = useRoute();

  const postId = router.params!.postId;

  useEffect(() => {
    postService.getPostById(postId).then((result) => {
      setPost(result);
    });
  }, [postId]);

  if (!post) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PostItem post={post} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
