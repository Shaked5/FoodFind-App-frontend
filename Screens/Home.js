import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, } from 'react-native';
import colors from '../utility/colors';
import { FoodFindContext } from '../context';
import Header from '../Components/Header';

export const Home = ({ navigation }) => {
    const { user, menuDrawer, setMenuDrawer } = React.useContext(FoodFindContext);
    
   

    return (
        <View style={styles.container}>
            <Header menuDrawer={!menuDrawer} />
            <View style={styles.containerBody}>
            </View>
        </View>
    )
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerBody: {
        flex: 9,
        // marginTop:'1%',
        backgroundColor: colors.white,
        fontSize: 30,
        color: colors.black,

    },

});
