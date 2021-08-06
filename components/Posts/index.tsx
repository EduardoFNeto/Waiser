import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Divider, ActivityIndicator, Caption } from "react-native-paper";
import { Post } from "../../models/post";
import { PostItem } from "../PostItem";

export const Posts = ({
  posts,
  isLoading,
}: {
  posts: Post[];
  isLoading: boolean;
}) => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: Post }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.push("PostDetail", { postId: item.id });
        }}
      >
        <PostItem post={item} />
      </TouchableOpacity>
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
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingVertical: 16,
        }}
        ItemSeparatorComponent={() => (
          <Divider style={{ marginVertical: 16 }} />
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Caption>Nenhuma publicação encontrada</Caption>
          </View>
        )}
      />
    </View>
  );
};
