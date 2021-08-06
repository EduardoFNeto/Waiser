import React, { useContext } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Title, TextInput, Text, Button } from "react-native-paper";

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

  const signInEmail = async () => {
    navigation.navigate("Login");
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

        <Button 
          style={styles.button}
          mode="contained" 
          labelStyle={{ color: "#fff", fontSize: 16, fontFamily: "InterMedium" }}
          onPress={handleProfileRegister}
        >
          Criar conta
        </Button>
      </View>
      
      <View style={styles.login}>
        <Text>Já possui uma conta?</Text>
        <Button onPress={signInEmail}>Faça Login</Button>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "PoppinsBlack",
    fontSize: 24,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 60
  },
  input: {
    marginBottom: 15,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#dadada",
    elevation: 0,
    borderBottomWidth: 0
  },
  button: {
    backgroundColor: '#585EED',
    padding: 12,
    borderRadius: 100,
    elevation: 0,
    marginTop: 30
  },
  login: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Register;