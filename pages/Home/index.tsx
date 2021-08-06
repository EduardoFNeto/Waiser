import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, Text, useTheme } from "react-native-paper";
import { Posts } from "../../components/Posts";
import { TagItem } from "../../components/TagItem";
import { Post } from "../../models/post";
import { Tag } from "../../models/tag";
import { postService } from "../../services/api/posts";
import { tagService } from "../../services/api/tags";

const Home = ({}) => {
  const navigation = useNavigation();

  const [selectedTag, setSelectedTag] = useState<null | undefined | Tag>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function getResources() {
        await Promise.all([
          postService.getFeed().then((results) => {
            setPosts(results);
            setIsLoadingPosts(false);
          }),
          tagService.getAllTags().then((results) => {
            setTags(results);
          }),
        ]).finally(() => {
          setIsLoading(false);
        });
      }

      getResources();
    }, [])
  );

  const handleTag = (tag?: Tag) => () => {
    setIsLoadingPosts(true);
    setSelectedTag(tag);
    postService
      .getFeed(tag?.id)
      .then((results) => {
        setPosts(results);
      })
      .finally(() => {
        setIsLoadingPosts(false);
      });
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
      <ScrollView
        horizontal
        style={{
          maxHeight: 50,
        }}
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 8,
          flex: 1,
        }}
      >
        <TagItem
          name="Para você"
          onPress={handleTag()}
          checked={!selectedTag}
        />
        {tags.map((tag) => {
          return (
            <TagItem
              key={tag.id}
              name={tag.name}
              checked={selectedTag?.id === tag.id}
              onPress={handleTag(tag)}
            />
          );
        })}
      </ScrollView>
      <Posts posts={posts} isLoading={isLoadingPosts} />
      <FAB
        style={styles.createButton}
        icon="plus"
        onPress={() => {
          navigation.push("CreatePost");
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

export default Home;
