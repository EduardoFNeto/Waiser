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
  Paragraph,
} from "react-native-paper";
import { TagItem } from "../../components/TagItem";
import { Tag } from "../../models/tag";
import { groupService } from "../../services/api/groups";
import { tagService } from "../../services/api/tags";

const CreateGroup = ({ navigation }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [isTagModalVisible, setIsTagModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    tagService.getAllTags().then((results) => {
      setTags(results);
    });
  }, []);

  const isFormValid = useMemo(() => form.description && form.title, [form]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Criar grupo de estudo",
      headerRight: () =>
        isLoading ? (
          <ActivityIndicator />
        ) : (
          <IconButton
            disabled={!isFormValid}
            icon="send"
            onPress={createGroup}
          />
        ),
    });
  }, [navigation, isLoading, isFormValid, form, createGroup]);

  function createGroup() {
    setIsLoading(true);

    groupService
      .createGroup(form.title, form.description, selectedTags)
      .then(() => {
        setMessage("Grupo criado com sucesso!");
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
      <TextInput
        multiline
        mode="flat"
        label="Adicione um t??tulo"
        style={{ marginBottom: 16 }}
        value={form.title}
        onChangeText={(value) =>
          setForm((prevForm) => ({
            ...prevForm,
            title: value,
          }))
        }
        maxLength={50}
      />
      <TextInput
        multiline
        mode="flat"
        label="Adicione uma descri????o..."
        style={{ marginBottom: 16, minHeight: 150 }}
        value={form.description}
        onChangeText={(value) =>
          setForm((prevForm) => ({
            ...prevForm,
            description: value,
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
            backgroundColor: "#f2f2f2",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 12,
            borderRadius: 16,
          }}
        >
          {selectedTags.length ? (
            selectedTags.map((tag) => (
              <TagItem key={tag.id} name={tag.name} onPress={removeTag(tag)} />
            ))
          ) : (
            <Caption>
              Adicione #tags ajudar a definir quais assuntos ser??o discutidos nos seu grupo
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
          <View
            style={{
              justifyContent: "space-between",
              maxHeight: 250,
            }}
          >
            <Paragraph style={{ marginTop: 16, marginBottom: 16, }}>
              Selecione suas tags
            </Paragraph>
            <ScrollView
              style={{  }}
              contentContainerStyle={{
                flexWrap: "wrap",
                flexDirection: "row",
              
              }}
            >
              {mergedTags.map((tag) => (
                <View key={tag.id} style={{ marginBottom: 6 }}>
                  <TagItem
                    name={tag.name}
                    onPress={() => {
                      handleSelectTag(tag);
                    }}
                    checked={selectedTags.some((t) => t.id === tag.id)}
                  />
                </View>
              ))}
            </ScrollView>
            <Button
              onPress={hideDialog}
              style={{
                marginBottom: 16,
                position: 'absolute',
                top: 12,
                right: -16
              }}
            >Concluir</Button>
          </View>
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
});

export default CreateGroup;
