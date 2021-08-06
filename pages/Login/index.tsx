import React, { useContext } from "react"
import { StyleSheet, View, Image, Alert } from "react-native"
import { Title, Text, TextInput, Button } from 'react-native-paper'
import { UserContext } from "../../contexts/user"
import { userService } from "../../services/api/user"

const Login = ({ navigation }) => {
  const [, setUser] = useContext(UserContext);
  
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const signInEmail = async () => {    
    try {
      if (!!username && !!password) {
        const user = await userService.loginProfile(username, password);
  
        setUser(user);
  
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      }
      else {
        Alert.alert("Por favor, preencha todos os campos.");
      }
    } catch (error) {
      Alert.alert("Erro");
    }
  }

  const signUpEmail = async () => {
    navigation.push("Register");
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/images/logo.png')} />

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
  },
  logo: {
    width: 280,
    height: 120,
  }
});

export default Login;