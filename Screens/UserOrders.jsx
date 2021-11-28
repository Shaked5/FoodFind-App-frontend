import React, {useContext}from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../Components/Header";
import Order from "../Components/Order";
import colors from "../utility/colors";
import {FoodFindContext} from "../context";

import {getAllOrdersByUserID} from '../api/UserOrderController';
const windowWidth = Dimensions.get("window").width;


const UserOrders = () => {

    const { user } = useContext(FoodFindContext);
    const renderItem = ({ item }) => <Order />;

    const fetchOrders = async() => {
        let res = await getAllOrdersByUserID(user.userID);
        console.log("res",res);
    }
    

    const DATA = [
        {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        },
        {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        },
        {
            id: "58694a0f-3da1-471f-bd96-1445571e29d72",
        },
        {
            id: "58694a0f-3da1-471f-bd96-1345571e29d72",
        },
        {
            id: "58694a0f-3da1-471f-bd96-1452571e29d72",
        },
        {
            id: "58694a0f-3da1-471f-bd96-145571e2329d72",
        },
        {
            id: "58694a0f-3da1-471f-bd96-144671e2329d72",
        },
        {
            id: "58694a0f-3da1-471f-bd96-14459d72",
        },
        {
            id: "58694a0f-3da1-471f-bd96-144639d72",
        },
        {
            id: "58694a0f-3da1-471f-bd96-1446329d72",
        },
        {
            id: "58694a0f-3da1-471f-bd96-1459d72",
        },
        {
            id: "58694a0f-3da1-471f-bd96-145429d72",
        },
        {
            id: "58694a0f-3da1-471f-bd96-1446529d72",
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Header />
            </View>
            <View style={styles.containerBody}>
                <View style={styles.buttonsView}>
                    <TouchableOpacity style={styles.buttons}
                    onPress={fetchOrders}
                    >
                        <Text style={{ fontWeight: "bold" }}>הזמנות אחרונות</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={{ fontWeight: "bold" }}>הזמנות בתהליך</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.flatListView}>
                    <FlatList
                        vertical
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={DATA.id}
                    />
                </View>
            </View>
        </View>
    );
};

export default UserOrders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    containerBody: {
        flex: 9,
        backgroundColor: colors.greyBackground,
    },
    headerView: {
        flex: 1.5,
    },
    buttonsView: {
        flex: 1,
        backgroundColor: colors.backgroundApp,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: colors.backgroundApp,
    },
    buttons: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        margin: '0.5%',
        marginBottom: '3%',
        width: windowWidth / 2,
    },
    orderCardRender: {
        flex: 1,

    },
    flatListView: {
        flex: 8,
        width: windowWidth,
        alignItems: "center",
    },
});
