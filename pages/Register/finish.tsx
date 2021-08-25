import React, { useContext, useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, View} from "react-native";
import { Title, TextInput, Button } from "react-native-paper";

import { UserContext } from "../../contexts/user";
import { userService } from "../../services/api/user";

const FinishRegister = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);

  const [form, setForm] = useState({
    username: user.username || '',
    name: user.name || '',
    bio: user.bio || ''
  });

  const isFormValid = useMemo(() => user.username && form.name && form.bio, [form]);

  const handleProfileFinishRegister = async () => {
    try {
      if (!!isFormValid) {
        const user = await userService.finishProfile(form.username, form.name, form.bio);
  
        setUser(user);
  
        navigation.reset({
          index: 0,
          routes: [{ name: "Tags" }],
        });
      }
      else {
        Alert.alert("Por favor, preencha todos os campos.");
      }
    } catch (err) {
      Alert.alert("Ocorreu um erro.");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.text}>Complete seu cadastro</Title>

      <View>
        <TextInput
          style={styles.input}
          label="Username"
          value={form.username}
          onChangeText={(value) =>
            setForm((prevForm) => ({
              ...prevForm,
              username: value.replace(/\s/, '').trim(),
            }))
          }
        />

        <TextInput
          style={styles.input}
          label="Nome"
          value={form.name}
          onChangeText={(value) =>
            setForm((prevForm) => ({
              ...prevForm,
              name: value,
            }))
          }
        />

        <TextInput
          style={styles.input}
          multiline = {true}
          numberOfLines = {6}
          label="Sobre mim"
          value={form.bio}
          onChangeText={(value) =>
            setForm((prevForm) => ({
              ...prevForm,
              bio: value,
            }))
          }
        />

        <Button 
          mode="contained" 
          style={styles.button}
          labelStyle={{ color: "#fff", fontSize: 16, fontFamily: "InterMedium" }}
          onPress={handleProfileFinishRegister}
          disabled={!isFormValid}
        >
          Continuar
        </Button>
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
});

export default FinishRegister;