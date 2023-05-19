import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
} from "react-native";
import { Card } from "react-native-paper";

const slider_width = Dimensions.get("window").width;
const item_width = slider_width * 0.9;

export default function List({ data }) {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Card style={styles.container}>
                <Card.Title title={data.name} titleStyle={styles.titleCard} />
                <Card.Cover source={{ uri: data.image }} style={styles.image} />
                <Card.Content>
                    <Text style={styles.textPrice}>R$ {data.price}</Text>
                    <Text style={styles.textCard}>Quantidade: {data.quantity}</Text>
                    <Text style={styles.textCard}>Medida: {data.unity}</Text>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 7,
        padding: 10,
        paddingBottom: 2,
        width: item_width,
        alignItems: "center",
    },
    titleCard: {
        fontSize: 20,
        color: "#33503d",
        fontWeight: "bold",
    },
    image: {
        height: item_width * 0.9,
        width: item_width * 0.9,
    },
    textPrice: {
        fontSize: 20,
        color: "#33503d",
        fontWeight: "bold",
        marginTop: 10,
    },
    textCard: {
        fontSize: 15,
        color: "#33503d",
        marginRight: 10,
    },
    cardAction: {
        alignItems: "center",
        flexDirection: "row",
    },
    cardButton: {
        width: "47%",
        borderRadius: 50,
        paddingVertical: 7,
        marginTop: 2,
        marginHorizontal: "1%",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    outerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        backgroundColor: "#FAFBFA",
        borderRadius: 30,
        padding: 30,
        width: 250,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        color: "#33503d",
        fontWeight: "bold",
        fontSize: 15,
        marginVertical: 2
    },
    buttonTextModal: {
        color: "#FFF",
        fontSize: 15,
    },
});
