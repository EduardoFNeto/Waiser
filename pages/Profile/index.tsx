import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Avatar, Headline } from "react-native-paper";
import { User } from "../../models/user";
import { profileService } from "../../services/api/profiles";

const Profile = () => {
  const [profile, setProfile] = React.useState<User>();
  const route = useRoute();

  const userId = route.params.userId;

  useEffect(() => {
    profileService.getProfileById(userId).then((result) => {
      setProfile(result);
    });
  }, []);

  if (!profile) {
    return <View />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Avatar.Image source={{ uri: profile.avatar }} />
      <Headline>{profile.name}</Headline>
    </View>
  );
};

export default Profile;
