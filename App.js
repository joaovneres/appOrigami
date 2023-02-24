import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';


export default function App() {
  return (
    <View styles={style.container}>
      <Image source={require('./assets/images/logo.png')} styles={style.logo} />
      <TextInput placeholder="Digite seu e-mail" styles={style.input} />
      <TextInput
        placeholder="Digite sua senha"
        securyTextEntry={true}
        styles={style.input}
      />
      <TouchableOpacity
        styles={style.button}
      >
        <Text styles={style.textButton}>Teste</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  input: {
    marginTop: 10,
    padding: 10,
    width: 300,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
  },
  button: {
    width: 300,
    height: 42,
    backgroundColor: '#000',
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
