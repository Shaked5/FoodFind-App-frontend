import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import UserOrders from "../Screens/UserOrders";
import BusinessMenu from "../Screens/BusinessMenu";
import itemScreen from "../Screens/ItemScreen";
import UserCart from "../Screens/UserCart";
import { DrawerContent } from "./DrawerContent";

import BusinessRegister from "../Screens/BusinessRegister";

export const MainNavigator = (navigation, route) => {
  

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const MyDrawer = () => {
    return (
      <Drawer.Navigator
        edgeWidth={0}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
   
        <Drawer.Screen
          name="UserOrders"
          component={UserOrders}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="BusinessRegister"
          component={BusinessRegister}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <>
   
        <Stack.Navigator
        edgeWidth={0}
        >
          <Stack.Screen
            name="MyDrawer"
            component={MyDrawer}
            options={{ headerShown: false }}
          />
               <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
          <Stack.Screen name="BusinessMenu" component={BusinessMenu} options={{ headerShown: false }} />
          <Stack.Screen name="ItemScreen" component={itemScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UserCart" component={UserCart} options={{ headerShown: false }} />
        </Stack.Navigator>
    </>
  );
};
export default MainNavigator;
