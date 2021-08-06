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

  const renderTagItem = ({ item }) => (
    <View>
      <Text style={styles.tagItem}>{item.get("name")}</Text>
    </View>
  );

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
        
        <FlatList
          data={profile.tags}
          renderItem={renderTagItem}
          keyExtractor={(item => item.index)}
          contentContainerStyle={{
            flexDirection:'row'
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff"
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginTop: 15,
    fontSize: 24,
    fontFamily: "PoppinsBlack"
  },
  profileText: {
    marginTop: 30,
  },
  profileAbout: {
    fontSize: 16,
    fontFamily: "InterBold",
    textTransform: "uppercase",
    marginBottom: 10
  },
  profileBio: {
    fontSize: 16,
    fontFamily: "InterRegular"
  },
  username: {
    fontSize: 16,
    fontFamily: "InterMedium",
    marginLeft: 10,
    color: "#333"
  },
  tagItem: {
    marginRight: 15,
    backgroundColor: "#1ECD8C",
    color: "#fff",
    fontFamily: "InterMedium",
    fontSize: 16,
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingVertical: 6
  }
});

export default Profile;
