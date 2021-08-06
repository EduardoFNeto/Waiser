import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { useRef } from "react";
import { RefreshControl, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Divider, ActivityIndicator, Caption } from "react-native-paper";
import { Post } from "../../models/post";
import { PostItem } from "../PostItem";

export const Posts = ({
  posts,
  isLoading,
  renderHeader,
  onRefresh,
  getMoreResults,
}: {
  posts: Post[];
  isLoading: boolean;
  renderHeader?: any;
  onRefresh?: any;
  getMoreResults?: any;
}) => {
  const navigation = useNavigation();
  const currentPage = useRef(0);
  const isGetMoreLoading = useRef(false);
  const endList = useRef(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

  const onEndReached = async () => {
    if (
      !getMoreResults ||
      isGetMoreLoading.current ||
      endList.current ||
      isLoading || 
      !posts.length
    ) {
      return;
    }
    currentPage.current += 1;
    isGetMoreLoading.current = true;
    setIsLoadingMore(true)
    const results = await getMoreResults(currentPage.current);
    isGetMoreLoading.current = false;
    if (!results.length) {
      endList.current = true;
    }
    setIsLoadingMore(false)
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={false}  onRefresh={onRefresh} />}
        onEndReached={onEndReached}
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
          if (isLoading || isLoadingMore) {
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
