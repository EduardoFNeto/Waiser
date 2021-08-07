import React, { useContext, useMemo, useState } from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import { Title, TextInput, Text, Button } from "react-native-paper";

import { UserContext } from "../../contexts/user";
import { userService } from "../../services/api/user";

const Register = ({ navigation }) => {
  const [, setUser] = useContext(UserContext);
  
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: ""
  });

  const [hidePassword, setHidePassword] = useState(true)

  const isFormValid = useMemo(() => form.username && form.password && form.email, [form]);

  const handleProfileRegister = async () => {
    try {
      if (!!isFormValid) {
        const user = await userService.createProfile(form.username, form.password, form.email);
  
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
    <ScrollView style={styles.container}>
      <Title style={styles.text}>Cadastre-se</Title>

      <View>
        <TextInput
          style={styles.input}
          label="Usuário"
          value={form.username}
          onChangeText={(value) =>
            setForm((prevForm) => ({
              ...prevForm,
              username: value,
            }))
          }
        />

        <TextInput
          style={styles.input}
          label="Email"
          value={form.email}
          onChangeText={(value) =>
            setForm((prevForm) => ({
              ...prevForm,
              email: value,
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
          mode="contained" 
          labelStyle={{ color: "#fff", fontSize: 16, fontFamily: "InterMedium" }}
          onPress={handleProfileRegister}
          disabled={!isFormValid}
        >
          Criar conta
        </Button>
      </View>
      
      <View style={styles.login}>
        <Text>Já possui uma conta?</Text>
        <Button onPress={signInEmail}>Faça Login</Button>
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
  login: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Register;