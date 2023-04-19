import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// import Produtos from './Produtos/produtos'
//import LinearGradient from 'react-native-linear-gradient';

// importando páginas
import Home from '../pages/Home';
import List from '../pages/List';
import Register from '../pages/Register';
import Notifications from '../pages/Notifications';


const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#495e4b",
                tabBarInactiveTintColor: "#777",
                tabBarStyle: [
                    {
                        "display": "flex"
                    },
                    null
                ],
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Produtos':
                            iconName = 'list';
                            break;
                        case 'Gerenciar':
                            iconName = 'save';
                            break;
                        case 'Notifications':
                            iconName = 'bell';
                            break;
                        default:
                            iconName = 'add-circle-outline';
                            break;
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Lista" component={List} />
            <Tab.Screen
                name="Gerenciar"
                component={Register}
            />
            <Tab.Screen name="Notifications" component={Notifications} />
        </Tab.Navigator>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconTabRound: {
        width: 60,
        height: 90,
        borderRadius: 30,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#495e4b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    }
});