import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import UserOrders from '../Screens/UserOrders';
import {DrawerContent} from './DrawerContent';
import { Drawer } from 'react-native-paper';
import BusinessRegister from '../Screens/BusinessRegister';



export const MainNavigator = (navigation, route) => {
    var stam = true;

    const StackAuth = createStackNavigator();
    const Drawer = createDrawerNavigator();
    // const StackAuthentication = (
    //     <>
    //         <StackAuth.Navigator initialRouteName='Home'>
    //             <StackAuth.Screen name='Login' component={Login} options={{ headerShown: false }} />
    //             <StackAuth.Screen name='Home' component={Home} options={{ headerShown: false }} />
    //         </StackAuth.Navigator>
    //     </>
    // );
    // const StackMain = createStackNavigator();

    // const StackLoggedIn = (
    //     <>
    //         <StackMain.Navigator>
    //             <StackMain.Screen name='Home' component={Home} />
    //         </StackMain.Navigator>
    //     </>
    // );

    return (
        <>
            <Drawer.Navigator edgeWidth={0}
                drawerContent={(props) => <DrawerContent {...props} />}
            
            >
                <Drawer.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Drawer.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Drawer.Screen name='UserOrders' component={UserOrders} options={{ headerShown: false }} />
                <Drawer.Screen name='BusinessRegister' component={BusinessRegister} options={{ headerShown: false }} />
            </Drawer.Navigator>
           
            {/* {stam ? StackAuthentication : StackLoggedIn} */}
        </>
    )
}
export default MainNavigator;