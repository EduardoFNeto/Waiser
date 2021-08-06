import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Divider, ActivityIndicator, Caption } from "react-native-paper";
import { Post } from "../../models/post";
import { PostItem } from "../PostItem";

export const Posts = ({
  posts,
  isLoading,
  renderHeader,
}: {
  posts: Post[];
  isLoading: boolean;
  renderHeader?: any;
}) => {
  const navigation = useNavigation();

  const renderItem = useCallback(({ item }: { item: Post }) => {
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
  }, []);

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
        ListEmptyComponent={() =>
          !isLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Caption>Nenhuma publicação encontrada</Caption>
            </View>
          ) : null
        }
        ListHeaderComponent={renderHeader}
        ListFooterComponent={() => {
          if (isLoading) {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator />
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
};
