import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { useCallback } from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, FAB, IconButton } from "react-native-paper";
import GroupList from "../../components/GroupList";
import { Group } from "../../models/group";
import { groupService } from "../../services/api/groups";

const Groups = ({}) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      groupService
        .getMyGroups()
        .then((results) => {
          setGroups(results);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="magnify"
          onPress={() => {
            navigation.push("ExploreGroups");
          }}
        />
      ),
    });
  }, [navigation, isLoading]);

  const renderEmpty = () => {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 32,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", marginBottom: 16 }}>
            Você ainda não entrou em nenhum grupo
          </Text>
          <Button
            mode="contained"
            onPress={() => {
              navigation.push("ExploreGroups");
            }}
          >
            Buscar grupos
          </Button>
        </View>
        <FAB
          style={styles.createButton}
          icon="plus"
          onPress={() => {
            navigation.push("CreateGroup");
          }}
        />
      </View>
    );
  };

  if (!isLoading && !groups.length) {
    return renderEmpty();
  }

  return (
    <View style={styles.container}>
      <GroupList groups={groups} isLoading={isLoading} />
      <FAB
        style={styles.createButton}
        icon="plus"
        onPress={() => {
          navigation.push("CreateGroup");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 200,
  },
  createButton: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    elevation: 0,
  },
});

export default Groups;
