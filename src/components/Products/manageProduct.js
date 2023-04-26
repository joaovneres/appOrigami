import React, { useState, useEffect, useRef } from 'react';
import {
    Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Keyboard
} from 'react-native';
import firebase from '../../services/connectionFirebase';

export default function ManageProducts() {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unity, setUnity] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [key, setKey] = useState('');

    async function insertUpdate() {
        //editar dados
        if (name !== '' & quantity !== '' & unity !== '' & image !== '' & price !== '' & key !== '') {
            firebase.database().ref('product').child(key).update({
                name: name,
                quantity: quantity,
                unity: unity,
                image: image,
                price: price
            })
            // para o teclado abaixo não flutuante
            Keyboard.dismiss();
            alert('Produto editado!');
            clearData();
            return;
        }
        //cadastrar dados
        setKey(await firebase.database().ref('product').push().key);

        products.child(key).set({
            name: name,
            quantity: quantity,
            unity: unity,
            image: image,
            price: price
        });

        alert('Produto cadastrado!');
        clearData();
    }

    function clearData() {
        setName("");
        setQuantity("");
        setUnity("");
        setImage("");
        setPrice("");
        setKey("");
    }

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
            <View style={style.conjunInput}>
                <TextInput
                    placeholder='Quantidade'
                    style={[style.input, { width: "43%" }]}
                    value={quantity}
                    onChangeText={(text) => setQuantity(text)}
                // ref={inputRef}
                />
                <TextInput
                    placeholder='Unidade'
                    style={[style.input, { width: "23%" }]}
                    value={unity}
                    onChangeText={(text) => setUnity(text)}
                // ref={inputRef}
                />
            </View>
            <TextInput
                placeholder='Preço'
                style={style.input}
                value={price}
                onChangeText={(text) => setPrice(text)}
            // ref={inputRef}
            />
            <TextInput
                placeholder='Imagem'
                style={style.input}
                value={image}
                onChangeText={(text) => setImage(text)}
            // ref={inputRef}
            />
            <TouchableOpacity style={style.button} onPress={insertUpdate}>
                <Text style={style.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    conjunInput: {
        justifyContent: "space-around",
        flexDirection: "row"
    },
    button: {
        backgroundColor: "#495e4b",
        width: "50%",
        borderRadius: 50,
        paddingVertical: 9,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "bold",
    },
    listar: {
        size: 20,
        color: 'red'
    },
})