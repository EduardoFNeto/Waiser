import * as React from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { Avatar, Headline, Text } from "react-native-paper";

import { User } from "../../models/user";
import { profileService } from "../../services/api/profiles";

const Profile = () => {
  const [profile, setProfile] = React.useState<User>();
  const route = useRoute();

  const userId = route.params?.userId;

  React.useEffect(() => {
    profileService.getProfileById(userId).then((result) => {
      setProfile(result);
    });
  }, []);

  if (!profile) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Avatar.Image size={84} source={{ uri: profile.avatar }} />
        <Text style={styles.username}>{ profile.username }</Text>
      </View>

      <Headline style={styles.profileName}>{profile.name}</Headline>

      <View style={styles.profileText}>
        <Text style={styles.profileAbout}>Sobre mim</Text>
        <Text style={styles.profileBio}>{ profile.bio }</Text>
      </View>

      <View style={styles.profileText}>
        <Text style={styles.profileAbout}>Interesses</Text>
        <Text>React, Vue, Angular, NodeJs, NestJs, Javascript, SQL, Programação, Engenharia de Software</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "700"
  },
  profileText: {
    marginTop: 30,
  },
  profileAbout: {
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 10
  },
  profileBio: {
    fontSize: 16,
    fontWeight: "400"
  },
  username: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 10,
    color: "#333"
  }
});

export default Profile;
