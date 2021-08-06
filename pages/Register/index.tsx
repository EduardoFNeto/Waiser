import React, { useContext } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Title, TextInput, Caption, Button } from "react-native-paper";

import { UserContext } from "../../contexts/user";
import { userService } from "../../services/api/user";

const Register = ({ navigation }) => {
  const [, setUser] = useContext(UserContext);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleProfileRegister = async () => {

    try {
      if (!!username && !!password && !!email) {
        const user = await userService.createProfile(username, password, email);
  
        setUser(user);
  
        navigation.reset({
          index: 0,
          routes: [{ name: "FinishRegister" }],
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
      <Title style={styles.text}>Cadastre-se</Title>

      <View>
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

        <Button mode="contained" onPress={handleProfileRegister}>
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