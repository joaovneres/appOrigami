import React, { useState, useEffect, useRef } from 'react';
import {
    Text, View, StyleSheet, SafeAreaView, TextInput, Button,
    ActivityIndicator, FlatList
} from 'react-native';
import firebase from '../../services/connectionFirebase';

export default function ManageProducts() {

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');


    return (
        <SafeAreaView style={style.container}>
            <Text style={style.text}>
                Cadastro de Produtos
            </Text>
            <TextInput
                placeholder='Nome'
                style={style.input}
                value={name}
                onChangeText={(text) => setName(text)}
            // ref={inputRef}
            />
            <TextInput
                placeholder='Marca'
                style={style.input}
                value={brand}
                onChangeText={(text) => setBrand(text)}
            // ref={inputRef}
            />
            <TextInput
                placeholder='Imagem'
                style={style.input}
                value={image}
                onChangeText={(text) => setImage(text)}
            // ref={inputRef}
            />
            <TextInput
                placeholder='Preço'
                style={style.input}
                value={price}
                onChangeText={(text) => setPrice(text)}
            // ref={inputRef}
            />
            <View style={style.button}>
                <Button
                    onPress={''}
                    title="Enviar"
                    color="#080"
                    accessibilityLabel=""
                />
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20,
        color: '#000000',
        fontWeight: 'bold'
    },
    input: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 30,
        backgroundColor: '#fff',
        borderRadius: 4,
        height: 45,
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: '#141414',
        flexDirection: 'row',
        maxHeight: 300,
        maxWidth: 300,
    },
    button: {
        width: 100,
        marginLeft: 225,
        marginTop: 30
    },
    listar: {
        size: 20,
        color: 'red'
    },
})