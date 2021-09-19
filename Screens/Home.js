import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, KeyboardAvoidingView, SafeAreaView,Dimensions } from 'react-native';
import colors from '../utility/colors';
import { FoodFindContext } from '../context';
import Header from '../Components/Header';
import { Searchbar } from 'react-native-paper';
import BusinessCard from '../Components/BusinessCard'

const Home = ({ navigation }) => {
    const windowwidth= Dimensions.get('window').width
    const { user, menuDrawer, setMenuDrawer } = React.useContext(FoodFindContext);
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    

    const renderItem = ({ item }) => <BusinessCard/>;
    // const Item = ({ title }) => (
    //     <View style={styles.item}>
    //         <Text style={styles.title}>{title}</Text>
    //     </View>
    // );


    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-1445571e29d72',
            title: 'Third Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-1345571e29d72',
            title: 'Third Item',
        }, {
            id: '58694a0f-3da1-471f-bd96-1452571e29d72',
            title: 'Third Item',
        }, {
            id: '58694a0f-3da1-471f-bd96-145571e2329d72',
            title: 'Third Item',
        },
    ];


    return (
        <View style={styles.container}>

            <Header />
            {/* <KeyboardAvoidingView
                behavior='padding'
                style={{ flex: 0.8 }}
            > */}
            {/* <Searchbar

                    placeholder='חפש'
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    icon='magnify'
                /> */}
            {/* </KeyboardAvoidingView> */}
            <View style={styles.containerBody}>
                {/* <ScrollView style={styles.scrollView}> */}
                    <FlatList style={{alignSelf:'center'}}  data={DATA} renderItem={renderItem} keyExtractor={DATA.id} />
                {/* </ScrollView> */}
            </View>

        </View>
    )
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInput: {
        backgroundColor: 'red'
    },
    containerBody: {
        flex: 9,
        backgroundColor: colors.white,
        fontSize: 30,
        
    },
    // item: {
    //     backgroundColor: '#035fff',
    //     borderRadius: 25,
    //     padding: 20,
    //     marginVertical: 8,
    //     marginHorizontal: 20,
    // },
    title: {
        fontSize: 32,
    },

});
