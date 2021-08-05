import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Avatar, List } from "react-native-paper";
import { User } from "../../models/user";
import { profileService } from "../../services/api/profiles";

const Explore = () => {
  const [profiles, setProfiles] = React.useState<User[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    profileService.getProfileSuggestions().then((results) => {
      setProfiles(results);
    });
  }, []);

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={profiles}
      renderItem={({ item }) => (
        <List.Item
          onPress={() => {
            navigation.push("Profile", { userId: item.id });
          }}
          title={item.name}
          description={item.username}
          left={(props) => (
            <Avatar.Image {...props} source={{ uri: item.avatar }} />
          )}
        />
      )}
    />
  );
};

export default Explore;
