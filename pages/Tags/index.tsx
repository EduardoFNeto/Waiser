import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Button, Headline, Text, useTheme } from "react-native-paper";
import { TagItem } from "../../components/TagItem";
import { UserContext } from "../../contexts/user";
import { Tag } from "../../models/tag";
import { tagService } from "../../services/api/tags";
import { userService } from "../../services/api/user";

enum FieldType {
  Text = "Text",
  Background = "Background",
}

const TagsView = ({ navigation }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [myTags, setMyTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    tagService.getAllTags().then((results) => {
      setTags(results);
    });

    tagService.getMyTags().then((results) => {
      setMyTags(results);
    });
  }, []);

  useEffect(() => {
    tags?.map((t) => {
      if (myTags?.some((myTag) => myTag.id === t.id)) {
        setSelectedTags((prevTags) => [...prevTags, t]);
      }
    });
  }, [myTags, tags]);

  const theme = useTheme();

  const removeTag = (tagId: string) => {
    const selectedTagsAftereRemove = selectedTags.filter(
      (tag) => tag.id !== tagId
    );
    setSelectedTags(selectedTagsAftereRemove);
  };

  const clickTag = (item: Tag) => {
    if (selectedTags.some((tag: Tag) => tag.id === item.id)) {
      return removeTag(item.id);
    } else {
      setSelectedTags((prevTags) => {
        return [...prevTags, item];
      });
    }
  };

  function linkTagsToUser() {
    setIsLoading(true);

    userService
      .addUserTags(selectedTags)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      })
      .catch((e) => {
        console.info(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const tagList = useMemo(
    () => tags.sort((a, b) => a.name.localeCompare(b.name)),
    [tags]
  );

  return (
    <View style={styles.container}>
      <Headline>Meus interesses</Headline>
      <Text style={{ marginBottom: 22 }}>
        Marque assuntos do seu interesse, assim você pode encontrar pessoas que
        gostam das mesmas coisas e receber perguntas.
      </Text>
      <ScrollView
        style={styles.flatlist}
        contentContainerStyle={{
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {tagList.map((tag) => (
          <View key={tag.id} style={{ marginBottom: 8 }}>
            <TagItem
              name={tag.name}
              checked={selectedTags.some((t) => t.id === tag.id)}
              key={tag.id}
              onPress={() => clickTag(tag)}
            />
          </View>
        ))}
      </ScrollView>
      <Button
        mode="contained"
        color={theme.colors.accent}
        labelStyle={{ color: "#fff", fontSize: 16, fontFamily: "InterMedium" }}
        onPress={linkTagsToUser}
        style={styles.button}
        disabled={!selectedTags.length}
      >
        Salvar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    padding: 15,
  },
  paragraph: {
    fontFamily: "PoppinsBlack",
    margin: 24,
    marginBottom: 15,
    fontSize: 24,
    textAlign: "center",
  },
  suggest: {
    fontFamily: "InterRegular",
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 90,
  },
  itemView: {
    margin: 4,
  },
  item: {
    borderRadius: 32,
    padding: 16,
    borderWidth: 1,
    borderColor: "#585EED",
    justifyContent: "flex-start",
    textAlign: "center",
  },
  flatlist: {
    flex: 1,
    overflow: "scroll",
  },
  button: {
    padding: 12,
    borderRadius: 100,
    elevation: 0,
  },
});

export default TagsView;
