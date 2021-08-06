import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import React, { useCallback, useLayoutEffect } from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { TextInput, View } from "react-native";
import {
  ActivityIndicator,
  Colors,
  Divider,
  IconButton,
  Text,
} from "react-native-paper";
import { AnswerItem } from "../../components/AnswerItem";
import { Avatar } from "../../components/Avatar";
import { PostItem } from "../../components/PostItem";
import { UserContext } from "../../contexts/user";
import { Post } from "../../models/post";
import { postService } from "../../services/api/posts";

export const PostDetail = () => {
  const [post, setPost] = useState<Post>();
  const [answers, setAnswers] = useState<Post[]>([]);

  const navigation = useNavigation();
  const router = useRoute();

  const [user] = useContext(UserContext);

  const [form, setForm] = useState({ text: "" });
  const [submittingAnswer, setSubmittingAnswer] = useState(false);

  const [totalAnswers, setTotalAnswers] = useState(0);

  const postId = router.params!.postId;

  const getAnswers = () => {
    postService.getAnswersByPostId(postId).then((results) => {
      setAnswers(results);
    });
  };

  useEffect(() => {
    postService.getPostById(postId).then((result) => {
      setPost(result);
      setTotalAnswers(result.totalAnswers);
    });

    getAnswers();
  }, [postId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Pergunta",
    });
  }, [navigation]);

  const sendPostAnswer = () => {
    setSubmittingAnswer(true);
    postService
      .createPostAnswer(postId, form.text)
      .then(() => {
        setForm({
          ...form,
          text: "",
        });

        setTotalAnswers(totalAnswers + 1);

        getAnswers();
      })
      .finally(() => {
        setSubmittingAnswer(false);
      });
  };

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.container}>
        <PostItem post={post!} isDetail />
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 12,
            borderTopWidth: 8,
            borderColor: Colors.grey100,
            marginTop: 16,
          }}
        >
          <Text>{totalAnswers} respostas</Text>
        </View>
      </View>
    );
  }, [post, totalAnswers]);

  if (!post) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={answers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnswerItem post={item} />}
        ItemSeparatorComponent={() => (
          <Divider style={{ marginVertical: 12 }} />
        )}
        style={{
          backgroundColor: "#fff",
        }}
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 16,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: Colors.white,
        }}
      >
        <Avatar user={user} />
        <View
          style={{
            backgroundColor: Colors.grey100,
            flex: 1,
            marginLeft: 8,
            height: 50,
            justifyContent: "center",
            paddingLeft: 16,
            borderRadius: 100,
          }}
        >
          <TextInput
            style={{
              fontSize: 17,
            }}
            placeholderTextColor={Colors.grey700}
            maxLength={500}
            disableFullscreenUI
            multiline
            underlineColorAndroid="transparent"
            placeholder="Escreva sua resposta..."
            value={form.text}
            onChangeText={(value) => setForm({ text: value })}
            editable={!submittingAnswer}
          />
        </View>
        <IconButton
          icon="send"
          onPress={sendPostAnswer}
          disabled={!form.text || submittingAnswer}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
