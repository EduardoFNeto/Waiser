import * as React from "react";
import { StyleSheet, View, Text, Button, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { FlatList } from "react-native-gesture-handler";

import { User } from "../../models/user";
import { profileService } from "../../services/api/profiles";
import { Avatar, List } from "react-native-paper";

const Explore = () => {
  const [profiles, setProfiles] = React.useState<User[]>([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    profileService.getProfileSuggestions().then((results) => {
      setProfiles(results);
    });
  }, []);

  return (
    <FlatList
      style={styles.container}
      keyExtractor={(item) => item.id}
      data={profiles}
      renderItem={({ item }) => (
        <List.Item
          onPress={() => {
            navigation.push("Profile", { userId: item.id });
          }}
          title={item.name}
          description={item.username}
          left={(props) => item?.avatar ? 
          <Avatar.Image {...props} source={{ uri: item.avatar }} /> : 
          <Avatar.Text size={60} label={item.name.charAt(0)} />
          }
        />
      )}
    />
  )}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff"
  }
});

export default Explore;
