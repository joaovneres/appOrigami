import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

const slider_width = Dimensions.get('window').width
const item_width = slider_width * 0.6

export default function List({ data, deleteItem, editItem }) {
    const [modalActive, setModalActive] = useState(false)
    return (

        <View >
            <Card style={styles.container}>
                <Card.Title title="Card Title" />
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.image} />
                <Card.Content>
                    <Text variant="titleLarge">Card title</Text>
                    <Text variant="bodyMedium">Card content</Text>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => setModalActive(true)}>Excluir</Button>
                    <Button onPress={() => editItem(data)}>Editar</Button>
                </Card.Actions>
            </Card>
            <Text style={styles.text}>Produto: {data.name}</Text>
            <Text style={styles.text}>Preço(R$): {data.price}</Text>
            <Text style={styles.text}>Quantidade: {data.quantity}</Text>
            <Text style={styles.text}>Unidade: {data.unity}</Text>
            <Text style={styles.text}>Imagem: {data.image}</Text>
            <View style={styles.item}>
                <TouchableOpacity >
                    <Icon name="trash" color="#A52A2A" size={20}>Excluir</Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editItem(data)}>
                    <Icon name="create" color="blue" size={20}>Editar</Icon>
                </TouchableOpacity>
            </View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalActive}
                onRequestClose={() => setModalActive(false)}>
                <View style={styles.outerView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Deseja remover o produto: </Text>
                        <Text style={styles.modalText}>Produto: {data.name}</Text>
                        <Text style={styles.modalText}>Preço(R$): {data.price}</Text>
                        <Text style={styles.modalText}>Quantidade: {data.quantity}</Text>
                        <TouchableOpacity style={{ color: 'red' }} onPress={() => setModalActive(false)}>
                            <Text style={{ color: 'green' }}>Não</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ color: 'green' }} onPress={() => deleteItem(data.key)}>
                            <Text style={{ color: 'red' }}>Sim</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )

}



const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        padding: 10,
        width: item_width,
        alignItems: 'center'
    },
    image: {
        height: item_width
    },
    text: {
        color: 'black',
        fontSize: 17
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    outerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0,2)'
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 35,
        width: 200,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {

    },
});

