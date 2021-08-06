import * as React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { User } from "../../models/user";
import { profileService } from "../../services/api/profiles";
import ProfileList from "../../components/ProfileList";

const Explore = () => {
  const [profiles, setProfiles] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const navigation = useNavigation();

  React.useEffect(() => {
    profileService
      .getProfileSuggestions()
      .then((results) => {
        setProfiles(results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const renderEmpty = () => {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 32,
            flex: 1,
            marginBottom: 40,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 18, color: "#333" }}>
            Não temos nenhum usuário cadasdtrado no momento.
          </Text>
          <Button
            mode="contained"
            onPress={() => {
              navigation.push("Main");
            }}
            title="Voltar para a Home"
          />
        </View>
      </View>
    );
  };

  if (!isLoading && !profiles.length) {
    return renderEmpty();
  }

  return (
    <View style={styles.container}>
      <ProfileList users={profiles} isLoading={isLoading} />
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

export default Explore;
