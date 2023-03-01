import React, { Component } from 'react';
import {View, Image, StyleSheet} from 'react-native'

class Login extends Component {
  render() {
    return (
      <View style={stylesLogin.container}>
        <Image source={require('./assets/images/logo.png')}
          style={stylesLogin.logo} />
      </View>
    );
  }
}

const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#748474'
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  }
})

export default Login;