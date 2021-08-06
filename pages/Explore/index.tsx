import * as React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { Avatar, List } from "react-native-paper";

import { User } from "../../models/user";
import { profileService } from "../../services/api/profiles";
import Swiper from "react-native-deck-swiper";
import { canOpenURL } from "expo-linking";

const Explore = () => {
  const [profiles, setProfiles] = React.useState<User[]>([]);
  const navigation = useNavigation();
  const [index, setIndex] = React.useState<number>(0);

  React.useEffect(() => {
    profileService.getProfileSuggestions().then((results) => {
      setProfiles(results);
    });
  }, []);

  return (
    <View style={styles.container}>
    <Swiper
        cards={profiles}
        infinite
        renderCard={(user) => {
            return (
              <View style={styles.card}>
                  <Text style={styles.text}>{user?.name}</Text>
              </View>
            )}}
        onSwiped={(cardIndex) => {console.log(cardIndex)}}
        onSwipedAll={() => {console.log('Swapou')}}
        onTapCard={(cardIndex) => {navigation.push("Profile", { userId: profiles[cardIndex].id })}}
        cardIndex={index}
        backgroundColor={'#4FD0E9'}
        stackSize={3}>
        <Button
            onPress={() => {console.log('oulala')}}
            title="Press me">
            You can press me
        </Button>
    </Swiper>
</View>
  )}
  //   <FlatList
  //     style={styles.container}
  //     keyExtractor={(item) => item.id}
  //     data={profiles}
  //     renderItem={({ item }) => (
  //       <List.Item
  //         onPress={() => {
  //           navigation.push("Profile", { userId: item.id });
  //         }}
  //         title={item.name}
  //         description={item.username}
  //         left={(props) => (
  //           <Avatar.Image {...props} source={{ uri: item.avatar }} />
  //         )}
  //       />
  //     )}
  //   />
  // );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     backgroundColor: "#fff"
//   }
// });

export default Explore;
