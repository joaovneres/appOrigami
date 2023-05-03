import React, { useState, useEffect, useRef } from 'react';
import {
    Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Keyboard, FlatList, ActivityIndicator, Modal
} from 'react-native';
import List from './List';
import firebase from '../../services/connectionFirebase';

export default function ManageDrinks() {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unity, setUnity] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [key, setKey] = useState('');
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef(null)

    useEffect(() => {
        async function search() {
            await firebase.database().ref('foods').on('value', (snapshot) => {
                setFoods([]);
                snapshot.forEach((chilItem) => {
                    let data = {
                        key: chilItem.key,
                        name: chilItem.val().name,
                        quantity: chilItem.val().quantity,
                        unity: chilItem.val().unity,
                        image: chilItem.val().image,
                        price: chilItem.val().price,
                    };
                    setFoods(oldArray => [...oldArray, data].reverse());
                })
                setLoading(false);
            })
        }
        search();
    }, []);

    //função para excluir um item  
    function handleDelete(key) {
        firebase.database().ref('foods').child(key).remove()
            .then(() => {
                const findFoods = foods.filter(item => item.key !== key)
                setFoods(findFoods)
            })
        alert('Alimento excluído!');
    }

    //função para editar  
    function handleEdit(data) {
        setKey(data.key),
            setName(data.name),
            setQuantity(data.quantity),
            setUnity(data.unity),
            setImage(data.image),
            setPrice(data.price)
    }

    async function insertUpdate() {
        //editar dados
        if (name !== '' & quantity !== '' & unity !== '' & image !== '' & price !== '' & key !== '') {
            firebase.database().ref('foods').child(key).update({
                name: name,
                quantity: quantity,
                unity: unity,
                image: image,
                price: price
            })
            // para o teclado abaixo não flutuante
            Keyboard.dismiss();
            alert('Alimento editado!');
            clearData();
            return;
        }
        //cadastrar dados
        let food = await firebase.database().ref('foods');

        food.child(food.push().key).set({
            name: name,
            quantity: quantity,
            unity: unity,
            image: image,
            price: price
        });

        alert('Alimento cadastrado!');
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
        <View style={style.container}>
            <SafeAreaView style={style.form}>
                <Text style={style.text}>
                    Cadastro de alimentos
                </Text>
                <TextInput
                    placeholder='Nome'
                    style={style.input}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    ref={inputRef}
                />
                <View style={style.conjunInput}>
                    <TextInput
                        placeholder='Quantidade'
                        style={[style.input, { width: "43%" }]}
                        value={quantity}
                        onChangeText={(text) => setQuantity(text)}
                        ref={inputRef}
                    />
                    <TextInput
                        placeholder='Unidade'
                        style={[style.input, { width: "23%" }]}
                        value={unity}
                        onChangeText={(text) => setUnity(text)}
                        ref={inputRef}
                    />
                </View>
                <TextInput
                    placeholder='Preço'
                    style={style.input}
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    ref={inputRef}
                />
                <TextInput
                    placeholder='Imagem'
                    style={style.input}
                    value={image}
                    onChangeText={(text) => setImage(text)}
                    ref={inputRef}
                />
                <TouchableOpacity style={style.button} onPress={insertUpdate}>
                    <Text style={style.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <View style={style.list}>

                <Text style={style.listar}>Listagem de Alimentos</Text>

                {
                    loading ?
                        (
                            <ActivityIndicator color="#121212" size={45} />
                        ) :
                        (
                            <FlatList
                                keyExtractor={item => item.key}
                                data={foods}
                                renderItem={({ item }) => (
                                    <List data={item} deleteItem={handleDelete}
                                        editItem={handleEdit} />
                                )}
                            />
                        )
                }
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    form: {
        flex: 1,
        alignItems: 'center'
    },
    list: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20,
        color: '#000000',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    input: {
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 4,
        height: 40,
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
    },
    buttonText: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "bold",
    },
    listar: {
        size: 20,
    },
})