import React from "react"
import { StyleSheet, View} from "react-native"
import { Title, TextInput, Caption, Button } from 'react-native-paper'

import Parse from "../../services/parse"

const Register = () => {
  const [name, setName] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')

  const handleAccountCreation = async () => {
    const user = new Parse.User()
    
    user.set("username", username)
    user.set("password", password)
    user.set("email", email)

    try {
      console.log(username, email, password)

      if (username && email && password) {
        await user.signUp()
        alert("sucesso")
      }
    } catch (error) {
      alert("Error: " + error.code + " " + error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Title style={styles.text}>Cadastre-se</Title>

      <View>
        <TextInput
          style={styles.input}
          label="Nome Completo"
          value={name}
          onChangeText={name => setName(name)}
        />

        <TextInput
          style={styles.input}
          label="Usuário"
          value={username}
          onChangeText={username => setUsername(username)}
        />

        <TextInput
          style={styles.input}
          label="Email"
          value={email}
          onChangeText={email => setEmail(email)}
        />

        <TextInput
          style={styles.input}
          label="Senha"
          value={password}
          onChangeText={password => setPassword(password)}
          secureTextEntry
          right={<TextInput.Icon name="eye" />}
        />

        <Button mode="contained" onPress={handleAccountCreation}>
          Criar conta
        </Button>
      </View>
      
      <Caption>Já possui uma conta? Faça Login.</Caption>
      
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

export default Register;