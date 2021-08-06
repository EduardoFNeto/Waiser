import * as React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Headline,
  IconButton,
  Paragraph,
  Text,
  Title,
} from "react-native-paper";

import { User } from "../../models/user";
import { profileService } from "../../services/api/profiles";
import MiniTagList from "../../components/MiniTagList";
import { UserContext } from "../../contexts/user";

const Profile = () => {
  const [profile, setProfile] = React.useState<User>();
  const [user] = React.useContext(UserContext);
  const route = useRoute();
  const navigation = useNavigation();

  const userId = route.params?.userId;

  React.useEffect(() => {
    profileService.getProfileById(userId).then((result) => {
      setProfile(result);
    });
  }, [userId]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: profile?.username || "Perfil",
      headerRight: () =>
        profile?.id === user?.id ? (
          <IconButton
            icon="cog"
            onPress={() => {
              navigation.navigate("Settings");
            }}
          />
        ) : null,
    });
  }, [navigation, profile, user]);

  if (!profile) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: profile.avatar }}
        style={{
          resizeMode: "cover",
          height: "90%",
        }}
      />

      <View style={styles.content}>
        <View style={styles.profileInfo}>
          <View style={{}}>
            <Headline style={{ marginBottom: 8 }}>{profile.username}</Headline>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ marginRight: 8 }}>
                <Text style={{ fontWeight: "bold" }}>{profile.totalAnswers}</Text>
                <Paragraph>Respostas</Paragraph>
              </View>
              <View style={{ marginRight: 8 }}>
                <Text style={{ fontWeight: "bold" }}>{profile.totalReceivedLikes}</Text>
                <Paragraph>Curtidas</Paragraph>
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>{profile.totalPoints}</Text>
                <Paragraph>Pontos</Paragraph>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button mode="contained" style={{ marginRight: 8, flex: 1 }}>
            Seguir
          </Button>
          <Button
            icon="chat"
            mode="contained"
            style={{ flex: 1 }}
            onPress={() => {
              navigation.navigate("LiveChat", { friend: profile });
            }}
          >
            Mensagem
          </Button>
        </View>

        {profile.bio && (
          <View style={styles.profileText}>
            <Title style={styles.profileAbout}>Sobre mim</Title>
            <Text style={styles.profileBio}>{profile.bio}</Text>
          </View>
        )}

        <View style={styles.profileText}>
          <Title style={styles.profileAbout}>Interesses</Title>
          <MiniTagList tags={profile.tags} size="medium" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  profileInfo: {
    marginBottom: 16,
  },
  profileName: {
    marginTop: 15,
    fontSize: 24,
    fontFamily: "PoppinsBlack",
  },
  profileText: {
    marginTop: 22,
  },
  profileAbout: {
    fontFamily: "InterBold",
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 16,
    fontFamily: "InterRegular",
  },
  username: {
    fontSize: 16,
    fontFamily: "InterMedium",
    marginLeft: 10,
    color: "#333",
  },
});

export default Profile;
