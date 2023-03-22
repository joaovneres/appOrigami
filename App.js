import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import Login from './src/pages/Login'



export default function App() {

  const [user, setUser] = React.useState(null);

  //verifica se existe um usuário logado, se não houver chama a
  //tela de login
  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#DAE1DA" barStyle="dark-content" />
      <Routes />
    </NavigationContainer>
  );
}
