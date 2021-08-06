import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { Colors, Headline, Text, useTheme } from "react-native-paper";
import { UserContext } from "../../contexts/user";
import { Tag } from "../../models/tag";

const MiniTagList = ({ tags }: { tags: Tag[] }) => {
  const [user] = useContext(UserContext);
  const theme = useTheme();

  const isMyTag = useCallback(
    (tag: Tag) => {
      return user.tags?.some((t: Tag) => t.id === tag.id);
    },
    [user]
  );

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {tags?.map((tag) => (
        <View
          key={tag.id}
          style={{
            backgroundColor: isMyTag(tag)
              ? theme.colors.accent
              : Colors.grey100,
            height: 20,
            paddingHorizontal: 12,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: isMyTag(tag) ? Colors.white : Colors.grey800 }}>
            #{tag.name}
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
