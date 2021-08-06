import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  FAB,
  Headline,
  Text,
  Button,
  Colors,
} from "react-native-paper";
import MiniTagList from "../../components/MiniTagList";
import { Posts } from "../../components/Posts";
import { Group } from "../../models/group";
import { Post } from "../../models/post";
import { groupService } from "../../services/api/groups";
import { postService } from "../../services/api/posts";

const GroupDetail = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const groupId = route?.params?.groupId;

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const [isJoined, setIsJoined] = useState(true);

  const [group, setGroup] = useState<Group>();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setIsJoined(!!group?.isJoined);
  }, [group]);

  useEffect(() => {
    async function getResources() {
      await Promise.all([
        groupService.getGroupById(groupId).then((result) => {
          setGroup(result);
        }),
        postService.getFeed().then((results) => {
          setPosts(results);
          setIsLoadingPosts(false);
        }),
      ]).finally(() => {
        setIsLoading(false);
      });
    }

    getResources();
  }, [groupId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: group?.title || "Grupo de estudo",
    });
  }, [navigation, group]);

  const joinGroup = () => {
    setIsJoined(!isJoined);
    groupService.joinGroup(groupId);
  };

  const renderHeader = () => {
    if (!group) {
      return null;
    }

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 16,
          marginBottom: 16,
          borderBottomWidth: 4,
          borderBottomColor: Colors.grey200,
          paddingHorizontal: 24,
        }}
      >
        <Avatar.Text
          label={group?.title.charAt(0)}
          style={{ marginBottom: 12 }}
        />
        <Headline style={{ textAlign: "center" }}>{group.title}</Headline>
        <Text style={{ textAlign: "center", marginBottom: 12 }}>
          {group.description}
        </Text>
        <MiniTagList tags={group.tags} />
        <View style={{ marginTop: 24 }}>
          <Button
            mode={isJoined ? "outlined" : "contained"}
            onPress={joinGroup}
          >
            {isJoined ? "Deixar o grupo" : "Participar"}
          </Button>
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
    <View style={styles.container}>
      <Posts
        posts={posts}
        isLoading={isLoadingPosts}
        renderHeader={renderHeader}
      />
      <FAB
        style={styles.createButton}
        icon="plus"
        onPress={() => {
          navigation.push("CreatePost", { groupId });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  createButton: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    elevation: 0,
  },
});

export default GroupDetail;
