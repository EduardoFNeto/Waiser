import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { FAB } from "react-native-paper";
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

  const [isExplore, setExplore] = useState(false);
  const [isDirect, setIsDirect] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const onRefresh = () => {
    return postService
      .getFeed(
        selectedTag === "explore" || selectedTag === "direct"
          ? selectedTag
          : selectedTag?.id
      )
      .then((results) => {
        setPosts(results);
        setIsLoadingPosts(false);
        return results;
      });
  };

  const getMoreResults = (currentPage: number) => {
    return postService
      .getFeed(
        selectedTag === "explore" || selectedTag === "direct"
          ? selectedTag
          : selectedTag?.id,
        currentPage
      )
      .then((results) => {
        setPosts((prev) => [...results, ...prev]);
        setIsLoadingPosts(false);
        return results;
      });
  };

  useFocusEffect(
    useCallback(() => {
      async function getResources() {
        await Promise.all([
          postService
            .getFeed(
              selectedTag === "explore" || selectedTag === "direct"
                ? selectedTag
                : selectedTag?.id
            )
            .then((results) => {
              setPosts(results);
              setIsLoadingPosts(false);
            }),
          tagService.getMyTags().then((results) => {
            setTags(results);
          }),
        ]).finally(() => {
          setIsLoading(false);
        });
      }

      getResources();
    }, [selectedTag])
  );

  const handleTag = (tag?: Tag | "explore" | "direct") => () => {
    setIsLoadingPosts(true);

    if (tag !== "explore" && tag !== "direct") {
      setSelectedTag(tag);
      setExplore(false);
      setIsDirect(false);
    } else {
      setSelectedTag(tag);

      if (tag === "explore") {
        setExplore(true);
      } else if (tag === "direct") {
        setIsDirect(true);
      }
    }

    postService
      .getFeed(tag === "explore" || selectedTag === "direct" ? tag : tag?.id)
      .then((results) => {
        setPosts(results);
      })
      .finally(() => {
        setIsLoadingPosts(false);
      });
  };

  const renderHeader = useCallback(() => {
    return (
      <ScrollView
        horizontal
        style={{
          marginTop: 12,
          maxHeight: 32,
        }}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Tags");
          }}
          activeOpacity={0.9}
          style={{
            width: 40,
            height: 32,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons name="cog" size={26} />
        </TouchableOpacity>
        <TagItem
          name="Seguindo"
          onPress={handleTag()}
          checked={!selectedTag && !isExplore}
        />
        <TagItem
          name="Para você"
          onPress={handleTag("direct")}
          checked={isDirect}
        />
        <TagItem
          name="Explorar"
          onPress={handleTag("explore")}
          checked={isExplore}
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
    );
  }, [tags, selectedTag, isExplore, isDirect]);

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Posts
        posts={posts}
        isLoading={isLoadingPosts}
        onRefresh={onRefresh}
        getMoreResults={getMoreResults}
      />
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
