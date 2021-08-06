import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useContext, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { Colors, Headline, Text, useTheme } from "react-native-paper";
import { UserContext } from "../../contexts/user";
import { Tag } from "../../models/tag";

const MiniTagList = ({
  tags,
  center,
  size,
}: {
  tags: Tag[];
  center?: boolean;
  size?: "medium" | "small";
}) => {
  const [user] = useContext(UserContext);
  const theme = useTheme();

  const isMyTag = useCallback(
    (tag: Tag) => {
      return user?.tags?.some((t: Tag) => t.id === tag.id);
    },
    [user]
  );

  const tagList = useMemo(
    () => tags.filter((t) => t).sort((a, b) => a.name?.localeCompare(b.name)),
    [tags]
  );

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: center ? "center" : "flex-start",
      }}
    >
      {tagList?.map((tag) => (
        <View
          key={tag.id}
          style={{
            backgroundColor: isMyTag(tag)
              ? theme.colors.accent
              : Colors.grey100,
            height: size == "medium" ? 32 : 22,
            paddingHorizontal: size == "medium" ? 14 : 10,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 4,
            marginRight: 4,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: size == "medium" ? 17 : 15,
              color: isMyTag(tag) ? Colors.white : Colors.grey800,
            }}
          >
            {tag.name}
          </Text>
        </View>
      ))}
    </View>
  );
};

MiniTagList.defaultProps = {
  tags: [],
  size: "small",
};

export default MiniTagList;
