import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import GroupList from "../../components/GroupList";
import { Group } from "../../models/group";
import { groupService } from "../../services/api/groups";

const ExploreGroups = ({}) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    groupService
      .getAllGroups()
      .then((results) => {
        setGroups(results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Grupos de estudos",
    });
  }, [navigation, isLoading]);

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
  createButton: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    elevation: 0,
  },
});

export default ExploreGroups;
