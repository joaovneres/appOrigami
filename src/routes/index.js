//@ts-check
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
// import Produtos from './Produtos/produtos'
//import LinearGradient from 'react-native-linear-gradient';

// importando páginas
import Home from '../pages/Home';
import ManageDrinks from '../components/Drinks/manageDrinks';
import ManageSweets from '../components/Sweet/manageSweet';
import ManageSavories from '../components/Savory/manageSavory';



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
                        case 'Bebidas':
                            iconName = 'cafe-sharp';
                            break;
                        case 'Doces':
                            return <IconMaterial name={'bakery-dining'} size={35} color={color} />;
                        case 'Salgados':
                            iconName = 'fast-food';
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
            <Tab.Screen name="Bebidas" component={ManageDrinks} />
            <Tab.Screen name="Doces" component={ManageSweets} />
            <Tab.Screen name="Salgados" component={ManageSavories} />
        </Tab.Navigator>
    );
}