import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, Button } from 'react-native';
import { Card } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

const slider_width = Dimensions.get('window').width
const item_width = slider_width * 0.6

export default function List({ data, deleteItem, editItem }) {
    const [modalActive, setModalActive] = useState(false)
    return (

        <View >
            <Card style={styles.container}>
                <Card.Title title={data.name} titleStyle={styles.titleCard} />
                <Card.Cover source={{ uri: data.image }} style={styles.image} />
                <Card.Content>
                    <Text style={styles.textPrice}>R$ {data.price}</Text>
                    <View style={styles.unityContainer}>
                        <Text style={styles.textCard}>{data.quantity}</Text>
                        <Text style={styles.textCard}>{data.unity}</Text>
                    </View>
                </Card.Content>
                <Card.Actions style={styles.cardAction}>
                    <TouchableOpacity onPress={() => setModalActive(true)}><Icon name="trash" color="#A52A2A" size={20}>Excluir</Icon></TouchableOpacity>
                    <TouchableOpacity onPress={() => editItem(data)}><Icon name="create" color="blue" size={20}>Editar</Icon></TouchableOpacity>
                </Card.Actions>
            </Card>
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
    titleCard: {
        fontSize: 23,
        color: "#33503d",
        fontWeight: "bold",
    },
    image: {
        height: item_width * 0.9,
        width: item_width * 0.9
    },
    textPrice: {
        fontSize: 23,
        color: "#33503d",
        fontWeight: "bold",
        marginTop: 10
    },
    unityContainer: {
        flexDirection: 'row',
        margin: 0
    },
    textCard: {
        fontSize: 18,
        color: "#33503d",
        marginRight: 10
    },
    cardAction:{
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

