import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../Components/Header";
import Order from "../Components/Order";
import colors from "../utility/colors";
import { FoodFindContext } from "../context";

import { getAllOrdersByUserID } from '../api/UserOrderController';
const windowWidth = Dimensions.get("window").width;

const UserOrders = () => {
    const { user } = useContext(FoodFindContext);
    const [userOrders, setUserOrders] = useState([]);
    const [inProcess, setInProcess] = useState([]);
    const [prevOrder, setPrevOrder] = useState([]);
    const [ifLastOrder, setIfLastOrder] = useState(false);

    const renderItem = ({ item }) => <Order userOrder={item} />;

    const fetchOrders = async () => {
        let res = await getAllOrdersByUserID(user.userID);
        setUserOrders(res);
        console.log("res", res);
    }

    const filterOrdersInProcess = async () => {
        console.log("inProcess", inProcess);
        if (ifLastOrder && inProcess.length > 0) {
            setIfLastOrder(!ifLastOrder);
            return;
        }
        const filteredInProcess = await userOrders.filter(order => order.orderStatus === false)
        setInProcess(filteredInProcess);
        console.log("filteredInProcess", filteredInProcess);
    }

    const filterPreviousOrders = async () => {
        if (!ifLastOrder && prevOrder.length > 0) {
            setIfLastOrder(!ifLastOrder);
            return;
        }
        const filterPrevOrders = await userOrders.filter(order => order.orderStatus === true);
        setPrevOrder(filterPrevOrders);
        console.log("filterPrevOrders", filterPrevOrders);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        filterOrdersInProcess();
        filterPreviousOrders();
    }, [userOrders]);

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Header />
            </View>
            <View style={styles.containerBody}>
                <View style={styles.buttonsView}>
                    <TouchableOpacity style={[styles.buttonInProccess,{backgroundColor:!ifLastOrder?colors.greyNearBlack:'white'}]}
                        onPress={filterOrdersInProcess}
                    >
                        <Text style={{ fontWeight: "bold" }}>הזמנות בתהליך</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonLastOrders,{backgroundColor:!ifLastOrder?'white':colors.greyNearBlack}]}
                        onPress={filterPreviousOrders}
                    >
                        <Text style={{ fontWeight: "bold" }}>הזמנות אחרונות</Text>

                    </TouchableOpacity>
                </View>
                <View style={styles.flatListView}>
                    <FlatList
                        vertical
                        data={ifLastOrder ? prevOrder : inProcess}
                        renderItem={renderItem}
                        keyExtractor={userOrders.businessID}
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
        justifyContent: "space-around",
    },
    buttonInProccess: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        margin: '0.5%',
        marginBottom: '3%',
        width: windowWidth / 2.1,
        borderRadius:10,
    },
    buttonLastOrders:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        margin: '0.5%',
        marginBottom: '3%',
        width: windowWidth / 2.1,
        borderRadius:10,
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
