import React from "react"
import { StyleSheet, View} from "react-native"
import { Title, TextInput, Button } from 'react-native-paper'

import Parse from "../../services/parse"

const FinishRegister = ({ route, navigation }) => {
  const [username, setUsername] = React.useState('')
  const [bio, setBio] = React.useState('')

  const handleAccountCreation = async () => {
    const { name, email, password } = route.params;

    const user = new Parse.User();
    
    user.set("name", name)
    user.set("password", password)
    user.set("email", email)
    user.set("username", username)
    user.set("bio", bio)

    try {
      if (name && email && password && username && bio) {
        await user.signUp()
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
        alert("sucesso")
      }
      else {
        alert("Faltou campo ai fio")
      }
    } catch (error) {
      alert("Error: " + error.code + " " + error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Title style={styles.text}>Complete seu cadastro</Title>

      <View>
        <TextInput
          style={styles.input}
          label="Usuário"
          value={username}
          onChangeText={username => setUsername(username)}
        />

        <TextInput
          multiline = {true}
          numberOfLines = {4}
          label="Biografia"
          value={bio}
          onChangeText={bio => setBio(bio)}
        />

        <Button mode="contained" onPress={handleAccountCreation}>
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