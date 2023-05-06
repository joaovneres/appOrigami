import React, { useState, useEffect, useRef } from 'react';
import {
    Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList, ActivityIndicator,
} from 'react-native';
import List from './List';
import firebase from '../../services/connectionFirebase';

//* Hooks imports
import useKeyboardVisible from '../../hooks/common/useKeyboardView';

export default function ManageFoods() {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unity, setUnity] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [key, setKey] = useState('');
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef(null);

    const isKeyboardOpen = useKeyboardVisible();

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
        <SafeAreaView style={style.container}>
            <Text style={style.textTitle}>
                Cadastro de alimentos
            </Text>
            <View style={style.conjunInput}>
                <TextInput
                    placeholder='Nome'
                    style={[style.input, { width: "35%" }]}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    ref={inputRef}
                />
                <TextInput
                    placeholder='Imagem'
                    style={[style.input, { width: "51%" }]}
                    value={image}
                    onChangeText={(text) => setImage(text)}
                    ref={inputRef}
                />
            </View>
            <View style={style.conjunInput}>
                <TextInput
                    placeholder='Quantidade'
                    style={[style.input, { width: "28%" }]}
                    value={quantity}
                    onChangeText={(text) => setQuantity(text)}
                    ref={inputRef}
                />
                <TextInput
                    placeholder='Unidade'
                    style={[style.input, { width: "28%" }]}
                    value={unity}
                    onChangeText={(text) => setUnity(text)}
                    ref={inputRef}
                />
                <TextInput
                    placeholder='Preço'
                    style={[style.input, { width: "28%" }]}
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    ref={inputRef}
                />
            </View>

            <TouchableOpacity style={style.button} onPress={insertUpdate}>
                <Text style={style.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <View style={style.list}>

                <Text style={style.textTitle}>Alimentos</Text>

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
                                data={foods}
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