import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button } from 'react-native-paper';

const Register = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')

  const handleAccountCreation = async () => {
    alert("Pressed")
  }

  return (
    <View style={styles.container}>
      <Text>Cadastre-se</Text>

      <TextInput
        label="Nome"
        value={name}
        onChangeText={name => setName(name)}
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