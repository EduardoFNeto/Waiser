import React, { useContext, useMemo, useState } from "react";
import { StyleSheet, View, Image, Alert, ScrollView } from "react-native";
import { Title, Text, TextInput, Button } from "react-native-paper";

import { UserContext } from "../../contexts/user";
import { userService } from "../../services/api/user";

const Login = ({ navigation }) => {
  const [, setUser] = useContext(UserContext);
  
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [hidePassword, setHidePassword] = useState(true)

  const isFormValid = useMemo(() => form.username && form.password, [form]);

  const signInEmail = async () => {    
    try {
      if (!!isFormValid) {
        const user = await userService.loginProfile(form.username, form.password);
  
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

  const signUpEmail = async () => {
    navigation.navigate("Register");
  }

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.text}>Entrar</Title>

      <View>
        <TextInput
          style={styles.input}
          label="Usuário"
          value={form.username}
          keyboardType="email-address"
          textContentType="nickname"
          onChangeText={(value) =>
            setForm((prevForm) => ({
              ...prevForm,
              username: value,
            }))
          }
        />

        <TextInput
          style={styles.input}
          label="Senha"
          value={form.password}
          onChangeText={(value) =>
            setForm((prevForm) => ({
              ...prevForm,
              password: value,
            }))
          }
          secureTextEntry={hidePassword}
          right={<TextInput.Icon name="eye" onPress={() => setHidePassword(!hidePassword)} />}
        />

        <Button 
          style={styles.button}
          labelStyle={{ color: "#fff", fontSize: 16, fontFamily: "InterMedium" }}
          mode="contained" 
          onPress={signInEmail}
          disabled={!isFormValid}
        >
          Entrar
        </Button>
      </View>

      <View style={styles.register}>
        <Text>Não possui conta?</Text>
        <Button onPress={signUpEmail}>Cadastre-se</Button>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    padding: 12,
    borderRadius: 100,
    elevation: 0,
    marginTop: 30
  },
  logo: {
    width: 280,
    height: 120,
  },
  register: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Login;