import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { ActivityIndicator, IconButton, TextInput } from "react-native-paper";
import { PostItem } from "../../components/PostItem";
import { Post } from "../../models/post";
import { postService } from "../../services/api/posts";

export const PostDetail = () => {
  const [post, setPost] = useState<Post>();
  const router = useRoute();

  const [form, setForm] = useState({ text: "" });
  const [submittingAnswer, setSubmittingAnswer] = useState(false);

  const postId = router.params!.postId;

  useEffect(() => {
    postService.getPostById(postId).then((result) => {
      setPost(result);
    });
  }, [postId]);

  const sendPostAnswer = () => {
    setSubmittingAnswer(true);
    postService
      .createPostAnswer(postId, form.text)
      .then(() => {})
      .finally(() => {
        setSubmittingAnswer(false);
      });
  };

  if (!post) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PostItem post={post} showText/>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            margin: 4,
            borderTopRightRadius: 100,
            borderTopLeftRadius: 100,
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
          }}
          maxLength={500}
          disableFullscreenUI
          multiline
          underlineColor="transparent"
          underlineColorAndroid="transparent"
          label="Escreva sua resposta..."
          value={form.text}
          onChangeText={(value) => setForm({ text: value })}
        />
        <IconButton
          icon="send"
          onPress={sendPostAnswer}
          disabled={submittingAnswer}
        />
      </View>
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
