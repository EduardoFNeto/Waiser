import React from "react"
import { StyleSheet, View } from "react-native"
import { Title, TextInput, Button } from 'react-native-paper'

import Parse from "../../services/parse"

const Register = () => {
  const [name, setName] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')

  const handleAccountCreation = async () => {
    const user = new Parse.User()
    
    user.set("username", username)
    user.set("password", "my pass")
    user.set("email", email)

    try {
      if (username && email) {
        await user.signUp()
        alert("sucesso")
      }
    } catch (error) {
      alert("Error: " + error.code + " " + error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Title>Cadastre-se</Title>

      <TextInput
        label="Nome"
        value={name}
        onChangeText={name => setName(name)}
      />

      <TextInput
        label="Nome de usuário"
        value={username}
        onChangeText={username => setUsername(username)}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
      />

      <TextInput
        label="Password"
        secureTextEntry
        right={<TextInput.Icon name="eye" />}
      />

      <Button mode="contained" onPress={handleAccountCreation}>
        Criar conta
      </Button>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f4f4f4",
  }
});

export default Register;