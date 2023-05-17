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
const item_width = slider_width * 0.6;

export default function List({ data, deleteItem, editItem }) {
  const [modalActive, setModalActive] = useState(false);
  return (
    <View>
      <Card style={styles.container}>
        <Card.Title title={data.name} titleStyle={styles.titleCard} />
        <Card.Cover source={{ uri: data.image }} style={styles.image} />
        <Card.Content>
          <Text style={styles.textPrice}>R$ {data.price}</Text>
          <Text style={styles.textCard}>Quantidade: {data.quantity}</Text>
          <Text style={styles.textCard}>Medida: {data.unity}</Text>
        </Card.Content>
        <Card.Actions style={styles.cardAction}>
          <TouchableOpacity
            style={[styles.cardButton, { backgroundColor: "#9C4744" }]}
            onPress={() => setModalActive(true)}
          >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardButton, { backgroundColor: "#365C8E" }]}
            onPress={() => editItem(data)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalActive}
        onRequestClose={() => setModalActive(false)}
      >
        <View style={styles.outerView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, {fontSize: 18}]}>Deseja remover o doce: </Text>
            <Text style={styles.modalText}>Nome: {data.name}</Text>
            <Text style={styles.modalText}>Preço(R$): {data.price}</Text>
            <Text style={styles.modalText}>Quantidade: {data.quantity}</Text>
            <Text style={styles.modalText}>Unidade: {data.unity}</Text>
            <View style={[styles.cardAction, {marginTop: 10}]}>
              <TouchableOpacity
                style={[styles.cardButton, { backgroundColor: "#9C4744" }]}
                onPress={() => setModalActive(false)}
              >
                <Text style={styles.buttonTextModal}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cardButton, { backgroundColor: "#33503d" }]}
                onPress={() => deleteItem(data.key)}
              >
                <Text style={styles.buttonTextModal}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
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
    fontWeight:"bold",
    fontSize: 15,
    marginVertical: 2
  },
  buttonTextModal: {
    color: "#FFF",
    fontSize: 15,
  },
});
