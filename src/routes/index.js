import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// import Produtos from './Produtos/produtos'
//import LinearGradient from 'react-native-linear-gradient';

// importando páginas
import Home from '../pages/Home';
import ManageFoods from '../components/Foods/manageFoods';
import ManageDrinks from '../components/Drinks/manageDrinks';
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
                        case 'Drinks':
                            iconName = 'cafe-sharp';
                            break;
                        case 'Foods':
                            iconName = 'bakery-dining';
                            break;
                        case 'Notifications':
                            iconName = 'notifications';
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
            <Tab.Screen name="Drinks" component={ManageDrinks} />
            <Tab.Screen name="Foods" component={ManageFoods} />
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