import * as React from "react";
import { StyleSheet, View, Text, Button, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { User } from "../../models/user";
import { profileService } from "../../services/api/profiles";
import { Avatar } from "react-native-paper";
import Swiper from "react-native-deck-swiper";

const Explore = () => {
  const [profiles, setProfiles] = React.useState<User[]>([]);
  const navigation = useNavigation();
  const [index, setIndex] = React.useState<number>(0);
  const [blockSwipe, setBlockSwipe] = React.useState<boolean>(false)

  React.useEffect(() => {
    profileService.getProfileSuggestions().then((results) => {
      setProfiles(results);
    });
  }, []);

  const onSwipe = () => {
    const ghostProfiles = 3
    if(index >= profiles.length - ghostProfiles) {
      setBlockSwipe(true); 
      return ;
    }
    
    setIndex(index + 1)
  }

  const Profile = ({ data }: { data: User}) => {
    return (
      <View style={styles.container}>
         {data?.avatar ? (
         <Image resizeMode='cover' style={styles.card} source={{ uri: data?.avatar }} />         
        ) : (
          <Avatar.Text size={32} label={data?.name.charAt(0)} />
        )
          }
         <Text style={styles.text}>{data?.name}</Text>
         <Text style={styles.bio}>{data?.bio}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
    <Swiper
        cardStyle={{ paddingTop: 0, marginTop: 0 }}
        cards={profiles}
        renderCard={(user) => <Profile data={user} />}
        onTapCard={(cardIndex) => {navigation.push("Profile", { userId: profiles[cardIndex].id })}}
        onSwiped={onSwipe}
        onSwipedAll={() => setIndex(0)}
        cardIndex={index}
        backgroundColor={'#FFF'}
        stackSize={2}
        stackScale={10}
        disableLeftSwipe={blockSwipe}
        disableRightSwipe={blockSwipe}
        disableTopSwipe={true}
        disableBottomSwipe={true}
        cardVerticalMargin={0}
        >
    </Swiper>
</View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  card: {
    flex: 1,
    maxHeight: "55%",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "flex-start",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    color: "#FFF",
    backgroundColor: "#585EED",
    alignSelf: "center",
    flex: 0,
    top: -30,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 40,
  },
  bio: {
    textAlign: "center",
    fontSize: 16,
  }
});

export default Explore;
