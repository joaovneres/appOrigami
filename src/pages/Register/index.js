import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ManageProducts from '../../components/Products/manageProduct'

export default function Register() {
  return (
    <View style={style.container}>
      <ManageProducts />
    </View>
  )
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DAE1DA'
  }
}
)
