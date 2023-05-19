import React, { useState, useEffect, useRef } from 'react';
import {
    Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList, ActivityIndicator,
} from 'react-native';
import List from './List';
import firebase from '../../services/connectionFirebase';

//* Hooks imports
import useKeyboardVisible from '../../hooks/common/useKeyboardView';
import api from '../../services/api';

export default function ManageSavories() {


    const [savories, setSavories] = useState([]);
    const [loading, setLoading] = useState(true);

    const isKeyboardOpen = useKeyboardVisible();


    useEffect(() => {
        async function search() {
            const response = await api.get("646562048e4aa6225e9f081a");
            setSavories(response.data.record.savory);
            setLoading(false);
            console.log(savories)
        }
        search();
    }, [])

    return (
        <SafeAreaView style={style.container}>
            <View style={style.list}>
                <Text style={style.textTitle}>Salgados</Text>
                {
                    loading ?
                        (
                            <ActivityIndicator color="#121212" size={45} />
                        ) :
                        (
                            <FlatList
                                contentContainerStyle={{ justifyContent: 'center' }}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                                data={savories}
                                renderItem={({ item }) => (
                                    <List data={item} />
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