import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, } from 'react-native';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import FoodFindLogo from '../assets/foodFindLogoSmall.png';
import { FoodFindContext } from '../context';
import colors from '../utility/colors';
import {useNavigation, DrawerActions } from '@react-navigation/native';


const Header = () => {
    const navigation = useNavigation();
    const {user} = React.useContext(FoodFindContext);


    return (
        <View style={styles.header}>
            <MaterialCommunityIcons style={styles.menuIcon} name="menu" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} size={28} color="black" />
            <Image source={FoodFindLogo} style={styles.txtFoodFindHeader} width={180} height={70} />
            {user? <View style={{marginLeft:50}}/>:
            <Ionicons onPress={() => navigation.navigate('Login')} style={styles.contactIcon} name="person" size={28} color="black" />
        }
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        flex: 1.3,
        backgroundColor: colors.backgroundApp,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',

    },
    txtFoodFindHeader: {
        marginTop: '6%',

    },
    menuIcon: {
        marginLeft: '4%',
        marginTop: '6%'
    },
    contactIcon: {
        marginRight: '4%',
        marginTop: '6%',
    },
});
