import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useMemo, useLayoutEffect, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  TextInput,
  IconButton,
  Text,
  Button,
  Caption,
  Portal,
  Dialog,
  Snackbar,
  ActivityIndicator,
  Title,
  Avatar as PaperAvatar,
} from "react-native-paper";
import { Avatar } from "../../components/Avatar";
import { TagItem } from "../../components/TagItem";
import { Group } from "../../models/group";
import { Tag } from "../../models/tag";
import { User } from "../../models/user";
import { groupService } from "../../services/api/groups";
import { postService } from "../../services/api/posts";
import { profileService } from "../../services/api/profiles";
import { tagService } from "../../services/api/tags";

const CreatePost = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const groupId = route.params?.groupId;
  const profileId = route.params?.profileId;

  const [form, setForm] = useState({
    title: "",
    text: "",
  });

  const [isTagModalVisible, setIsTagModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [group, setGroup] = useState<Group>();
  const [profile, setProfile] = useState<User>();

  useEffect(() => {
    tagService.getAllTags().then((results) => {
      setTags(results);
    });

    if (groupId) {
      groupService.getGroupById(groupId).then((result) => {
        setGroup(result);
      });
    }

    if (profileId) {
      profileService.getProfileById(profileId).then((result) => {
        setProfile(result);
      });
    }
  }, [groupId, profileId]);

  const isFormValid = useMemo(() => form.text && form.title, [form]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Perguntar",
      headerRight: () =>
        isLoading ? (
          <ActivityIndicator />
        ) : (
          <IconButton
            disabled={!isFormValid}
            icon="send"
            onPress={createPost}
          />
        ),
    });
  }, [navigation, isLoading, isFormValid, createPost]);

  function createPost() {
    setIsLoading(true);

    postService
      .createPost(form.title, form.text, selectedTags, groupId)
      .then(() => {
        setMessage("Pergunta enviada com sucesso!");
        navigation.goBack();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const removeTag = (tag: Tag) => () => {
    setSelectedTags((prevTags) => {
      return prevTags.filter((t) => t.id !== tag.id);
    });
  };

  return (
    <ScrollView style={styles.container}>
      {group && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <PaperAvatar.Text size={32} label={group.title.charAt(0)} />
          <Text style={{ marginLeft: 8 }}>{group.title}</Text>
        </View>
      )}
      {profile && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Avatar size={32} user={profile} />
          <Text style={{ marginLeft: 8 }}>{profile.name}</Text>
        </View>
      )}
      <TextInput
        multiline
        mode="flat"
        label="Adicione um título"
        style={styles.input}
        value={form.title}
        onChangeText={(value) =>
          setForm((prevForm) => ({
            ...prevForm,
            title: value,
          }))
        }
        maxLength={100}
      />
      <TextInput
        multiline
        mode="flat"
        label="Adicione seu texto..."
        style={styles.input}
        numberOfLines = {6}
        value={form.text}
        onChangeText={(value) =>
          setForm((prevForm) => ({
            ...prevForm,
            text: value,
          }))
        }
        maxLength={500}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 30
          }}
        >
          <Text>#Tags</Text>
          <Button
            onPress={() => {
              setIsTagModalVisible(true);
            }}
          >
            Adicionar
          </Button>
        </View>
        <View
          style={{
            backgroundColor: "#f4f4f4",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 15,
            marginTop: 15,
            borderRadius: 16,
          }}
        >
          {selectedTags.length ? (
            selectedTags.map((tag) => (
              <TagItem key={tag.id} name={tag.name} onPress={removeTag(tag)} />
            ))
          ) : (
            <Caption>
              Adicione #tags para mandar sua pergunta para todas as pessoas
              interessadas nesses assntos
            </Caption>
          )}
        </View>
      </View>

      <Snackbar
        visible={!!message}
        onDismiss={() => {
          setMessage(null);
        }}
      >
        {message}
      </Snackbar>

      <AddTags
        tags={tags}
        onClose={() => {
          setIsTagModalVisible(false);
        }}
        isVisible={isTagModalVisible}
        selectedTags={selectedTags}
        handleSelectTag={(tag: Tag) => {
          setSelectedTags((prevTags) => {
            if (prevTags.some((t) => t.id === tag.id)) {
              return prevTags.filter((t) => t.id !== tag.id);
            }
            return [...prevTags, tag];
          });
        }}
      />
    </ScrollView>
  );
};

const AddTags = ({
  tags,
  onClose,
  isVisible,
  selectedTags,
  handleSelectTag,
}) => {
  const hideDialog = () => onClose();

  const mergedTags = useMemo(() => [...tags], [tags]);

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={hideDialog}>
        <Dialog.ScrollArea>
          <Title style={{ marginTop: 16, marginBottom: 16 }}>
            Selecione suas tags
          </Title>
          <ScrollView
            horizontal
            style={{
              minHeight: 200,
            }}
            contentContainerStyle={{
              flexWrap: "wrap",
            }}
          >
            {mergedTags.map((tag) => (
              <TagItem
                key={tag.id}
                name={tag.name}
                onPress={() => {
                  handleSelectTag(tag);
                }}
                checked={selectedTags.some((t) => t.id === tag.id)}
              />
            ))}
          </ScrollView>
          <Button
            mode="contained"
            onPress={hideDialog}
            style={{
              marginBottom: 16,
            }}
          >
            Fechar
          </Button>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#dadada",
    elevation: 0,
    borderBottomWidth: 0
  }
});

export default CreatePost;
