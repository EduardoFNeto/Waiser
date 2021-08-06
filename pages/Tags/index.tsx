
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Headline, Text } from "react-native-paper"
import { Tag } from "../../models/tag";
import { tagService } from '../../services/api/tags';
import { userService } from '../../services/api/user';

enum FieldType {
  Text = 'Text',
  Background = 'Background'
}


const TagsView = ({ navigation }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    tagService.getAllTags().then((results) => {
      setTags(results);
    });
  }, []);


  const setBackground = (item: any, where: string) => {
    if(where === FieldType.Background) {
      if(selectedTags.some(tag => tag.id === item.id)) {
        return '#585EED';
      } else {
        return '#FFF'
      }
    } else if(where === FieldType.Text) {
      if(selectedTags.some(tag => tag.id === item.id)) {
        return '#FFF'
      } else {
        return '#585EED';
      }
    }
  } 

  const Tag = ({ item, index }) => {
    return (
        <View key={index} style={styles.itemView}>
            <TouchableOpacity onPress={() => clickTag(item)}>
              <Text 
                style={[ styles.item, {
                  backgroundColor: setBackground(item, FieldType.Background),
                  color: setBackground(item, FieldType.Text)
                }]}>
                  {item.name}
              </Text>
            </TouchableOpacity>
        </View>
    );
  }

  const removeTag = (tagId: string) => {
    const selectedTagsAftereRemove = selectedTags.filter(tag => tag.id !== tagId)
    setSelectedTags(selectedTagsAftereRemove);
  }

  const clickTag = (item: Tag) => {
    if(selectedTags.some((tag: Tag) => tag.id === item.id)) {
      return removeTag(item.id)
    } else {
      setSelectedTags((prevTags) => {
        return [...prevTags, item];
    })
    }

  }

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
        console.info(e.message)
      }) 
      .finally(() => {
        setIsLoading(false);
      });
  }  

  return (
    <View style={styles.container}>
      <Headline style={styles.paragraph}>
        Meus interesses
      </Headline>
      <Text style={styles.suggest}>
        sugeridos
      </Text>
      <FlatList
        extraData={tags}
        data={tags}
        renderItem={Tag}
        keyExtractor={(item => item.index)}
        style={styles.flatlist}
        contentContainerStyle={{
          flexDirection:'row',
          flexWrap: 'wrap'
        }}
      />
      <Button onPress={linkTagsToUser} style={styles.button}>Continuar</Button>
    </View>
  );
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  paddingTop: 20,
  backgroundColor: '#E5E5E5',
  padding: 8,
},
paragraph: {
  margin: 24,
  marginBottom: 32,
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
},
suggest: {
  fontSize: 14,
  color: 'grey',
  textAlign: 'center',
  marginBottom: 50,
},
itemView: {
  margin: 4,
},
item: {
  borderRadius: 20,
  padding: 12,
  justifyContent: 'flex-start',
},
flatlist:{
  flex: 1,
  maxHeight: '60%',
  overflow: 'scroll'
},
button: {
  backgroundColor: '#1ECD8C',
  color: '#FFF',
  padding: 12,
  borderRadius: 20
}
});

export default TagsView;