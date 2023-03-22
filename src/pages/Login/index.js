import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { TextInput } from "react-native-paper";
import firebase from "../../services/connectionFirebase";
import * as Animatable from "react-native-animatable";

export default function Login({ changeStatus }) {

  const [type, setType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (type === 'login') {
      // Aqui fazemos o login
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          alert('Email ou senha não cadastrados!');
          return;
        })
    } else {
      // Aqui cadastramos o usuario 
      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          alert('Erro ao Cadastrar!');
          return;
        })
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>
          Bem-vindo(a) ao app da Padaria Origami
        </Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <TextInput
          mode="outlined"
          label={"E-mail"}
          placeholder="Digite um email..."
          activeOutlineColor="#495e4b"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          mode="outlined"
          label={"Senha"}
          secureTextEntry
          placeholder="Digite uma senha..."
          activeOutlineColor="#495e4b"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.registerText}>Não possui conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DAE1DA",
  },
  containerHeader: {
    marginTop: "18%",
    marginBottom: "20%",
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  message: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#33503d",
  },
  containerForm: {
    backgroundColor: "#FAFBFA",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
    paddingTop: "10%",
    marginLeft: "2%",
    marginRight: "2%",
  },
  input: {
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#FFF",
    height: 60,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#495e4b",
    width: "80%",
    borderRadius: 50,
    paddingVertical: 9,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
});
