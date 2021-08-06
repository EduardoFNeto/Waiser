import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useContext, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { Colors, Headline, Text, useTheme } from "react-native-paper";
import { UserContext } from "../../contexts/user";
import { Tag } from "../../models/tag";

const MiniTagList = ({ tags, center }: { tags: Tag[], center?: boolean }) => {
  const [user] = useContext(UserContext);
  const theme = useTheme();

  const isMyTag = useCallback(
    (tag: Tag) => {
      return user?.tags?.some((t: Tag) => t.id === tag.id);
    },
    [user]
  );

  const tagList = useMemo(
    () => tags.sort((a, b) => a.name.localeCompare(b.name)),
    [tags]
  );

  return (
    <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: center ? 'center' : 'flex-start' }}>
      {tagList?.map((tag) => (
        <View
          key={tag.id}
          style={{
            backgroundColor: isMyTag(tag)
              ? theme.colors.accent
              : Colors.grey100,
            height: 20,
            paddingHorizontal: 8,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 4
          }}
        >
          <Text numberOfLines={1} style={{ color: isMyTag(tag) ? Colors.white : Colors.grey800 }}>
            {tag.name}
          </Text>
        </View>
      ))}
    </View>
  );
};

MiniTagList.defaultProps = {
  tags: [],
};

export default MiniTagList;
