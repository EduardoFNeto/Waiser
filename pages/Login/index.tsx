import React from "react"
import { StyleSheet, View} from "react-native"
import { Title, Text, TextInput, Button } from 'react-native-paper'
import Parse from "../../services/parse"

const Login = ({ navigation }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const signInEmail = async () => {    
    try {
      const user = await Parse.User.logIn(username, password);
      if (!!user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
        alert("Success")
      }
    } catch (error) {
      alert("Error")
    }
  }

  const signUpEmail = async () => {
    navigation.push("Register");
  }

  return (
    <View style={styles.container}>
      <Title style={styles.text}>Entrar</Title>

      <View>
        <TextInput
          style={styles.input}
          label="Usuário"
          value={username}
          onChangeText={email => setUsername(email)}
        />

        <TextInput
          style={styles.input}
          label="Senha"
          value={password}
          onChangeText={password => setPassword(password)}
          secureTextEntry
          right={<TextInput.Icon name="eye" />}
        />

        <Button mode="contained" onPress={signInEmail}>
          Entrar
        </Button>
      </View>

      <View>
        <Text>Não possui conta?</Text>
        <Button onPress={signUpEmail}>Cadastre-se</Button>
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

export default Login;