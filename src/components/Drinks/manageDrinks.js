import React, { useState, useEffect, useRef } from 'react';
import {
    Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList, ActivityIndicator,
} from 'react-native';
import List from './List';
import firebase from '../../services/connectionFirebase';

//* Hooks imports
import useKeyboardVisible from '../../hooks/common/useKeyboardView';

export default function ManageDrinks() {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [key, setKey] = useState('');
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef(null);

    const isKeyboardOpen = useKeyboardVisible();

    useEffect(() => {

        async function search() {
            await firebase.database().ref('drinks').on('value', (snapshot) => {
                setDrinks([]);
                snapshot.forEach((chilItem) => {
                    let data = {
                        key: chilItem.key,
                        name: chilItem.val().name,
                        quantity: chilItem.val().quantity,
                        image: chilItem.val().image,
                        price: chilItem.val().price,
                    };
                    setDrinks(oldArray => [...oldArray, data].reverse());
                })
                setLoading(false);
            })
        }
        search();
    }, []);

    //função para excluir um item  
    function handleDelete(key) {
        firebase.database().ref('drinks').child(key).remove()
            .then(() => {
                const findDrinks = drinks.filter(item => item.key !== key)
                setDrinks(findDrinks)
            })
        alert('Bebida excluída!');
    }

    //função para editar  
    function handleEdit(data) {
        setKey(data.key),
            setName(data.name),
            setQuantity(data.quantity),
            setImage(data.image),
            setPrice(data.price)
    }

    async function insertUpdate() {
        //editar dados
        if (name !== '' & quantity !== '' & image !== '' & price !== '' & key !== '') {
            firebase.database().ref('drinks').child(key).update({
                name: name,
                quantity: quantity,
                image: image,
                price: price
            })
            // para o teclado abaixo não flutuante
            alert('Bebida editada!');
            clearData();
            return;
        }
        //cadastrar dados
        let drink = await firebase.database().ref('drinks');

        drink.child(drink.push().key).set({
            name: name,
            quantity: quantity,
            image: image,
            price: price
        });

        alert('Bebida cadastrada!');
        clearData();
    }

    function clearData() {
        setName("");
        setQuantity("");
        setImage("");
        setPrice("");
        setKey("");
    }

    return (
        <SafeAreaView style={style.container}>
            <Text style={style.textTitle}>
                Cadastro de bebidas
            </Text>
            <View style={style.conjunInput}>
                <TextInput
                    placeholder='Nome'
                    style={[style.input, { width: "43%" }]}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    ref={inputRef}
                />
                <TextInput
                    placeholder='Imagem'
                    style={[style.input, { width: "43%" }]}
                    value={image}
                    onChangeText={(text) => setImage(text)}
                    ref={inputRef}
                />
            </View>
            <View style={style.conjunInput}>
                <TextInput
                    placeholder='Tamanho'
                    style={[style.input, { width: "43%" }]}
                    value={quantity}
                    onChangeText={(text) => setQuantity(text)}
                    ref={inputRef}
                />
                <TextInput
                    placeholder='Preço'
                    style={[style.input, { width: "43%" }]}
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    ref={inputRef}
                />
            </View>

            <TouchableOpacity style={style.button} onPress={insertUpdate}>
                <Text style={style.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <View style={style.list}>

                <Text style={style.textTitle}>Bebidas</Text>

                {
                    loading ?
                        (
                            <ActivityIndicator color="#121212" size={45} />
                        ) :
                        (
                            <FlatList
                                horizontal
                                keyExtractor={item => item.key}
                                showsHorizontalScrollIndicator={false}
                                data={drinks}
                                renderItem={({ item }) => (
                                    <List data={item}
                                        deleteItem={handleDelete}
                                        editItem={handleEdit} />
                                )}
                            />
                        )
                }
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#DAE1DA'
    },
    textTitle: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: 'center',
        color: "#33503d",
        marginBottom: 10,
        marginTop: 20,
    },
    input: {
        marginTop: 7,
        marginBottom: 3,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 4,
        height: 50,
        width: 335,
        padding: 10,
        borderWidth: 1,
        borderColor: '#141414',
        flexDirection: 'row',
        maxHeight: 300,
        maxWidth: 300,
    },
    conjunInput: {
        flexDirection: "row"
    },
    button: {
        backgroundColor: "#495e4b",
        width: 200,
        borderRadius: 50,
        paddingVertical: 15,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
})