import React, { useContext } from "react";
import { Alert, StyleSheet, View} from "react-native";
import { Title, TextInput, Button } from "react-native-paper";

import { UserContext } from "../../contexts/user";
import { userService } from "../../services/api/user";

const FinishRegister = ({ navigation }) => {
  const [, setUser] = useContext(UserContext);

  const [name, setName] = React.useState('');
  const [bio, setBio] = React.useState('');

  const handleProfileFinishRegister = async () => {

    try {
      if (!!name && !!bio) {
        const user = await userService.finishProfile(name, bio);
  
        setUser(user);
  
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      }
      else {
        Alert.alert("Por favor, preencha todos os campos.");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Title style={styles.text}>Complete seu cadastro</Title>

      <View>
        <TextInput
          style={styles.input}
          label="Nome"
          value={name}
          onChangeText={name => setName(name)}
        />

        <TextInput
          multiline = {true}
          numberOfLines = {6}
          label="Biografia"
          value={bio}
          onChangeText={bio => setBio(bio)}
        />

        <Button mode="contained" onPress={handleProfileFinishRegister}>
          Continuar
        </Button>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    backgroundColor: "#f4f4f4",
  },
  text: {
    fontSize: 24,
    marginBottom: 30
  },
  input: {
    marginBottom: 15,
  }
});

export default FinishRegister;