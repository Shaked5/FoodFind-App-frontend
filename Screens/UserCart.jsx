import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { FoodFindContext } from "../context";
import colors from "../utility/colors";
import { insertNewOrder } from "../api/UserOrderController";

const UserCart = ({ route, navigation }) => {
    const { businessID } = route.params;
    const { orderList, user } = useContext(FoodFindContext);
    const [totalPrice, setTotalPrice] = useState(0);


    const getTotalPrice = () => {
        let total = 0;
        orderList.map(async (item) => {
            total += item.totalPriceForItem
            await setTotalPrice(total)
        })
    }

    const handleSendOrder = async () => {
        console.log("userID", user.userID);
        console.log("businessID", businessID);
        // let obj=
        // console.log("obj=",obj);
        let orderID = await insertNewOrder({userID: user.userID, businessID:businessID, orderStatus: false, orderPaidUp: false, shippingAddress: null })
        console.log("orderID", orderID);

    }

    useEffect(() => {
        getTotalPrice();
    
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={{ backgroundColor: colors.backgroundApp }}>
                <TouchableOpacity style={styles.goBackIcon} onPress={() => {
                    navigation.goBack();
                }}>
                    <AntDesign
                        name="back" size={36} color="black" />
                </TouchableOpacity>
            </View>
            {/* <View style={{ alignItems: 'center', backgroundColor: 'black' }}> */}
            <View style={styles.headerOrder}>
                <Text style={{ fontWeight: 'bold' }}>המוצרים בהזמנה</Text>
            </View>
            {orderList && orderList.map((item) => {
                return (
                    <View style={{ maxWidth: 360, margin: 15, marginTop: 6, borderRadius: 15, backgroundColor: 'white', padding: 8 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.itemName}</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 3, right: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, padding: 2 }}>{item.itemAmount}X</Text>
                        </View>
                        <View style={{}}>
                            <Text style={{ fontWeight: 'bold', padding: 2, fontSize: 16, marginLeft: 8 }}>תוספות נבחרות:</Text>
                        </View>
                        <View style={{}}>
                            <Text style={{ fontWeight: 'bold', paddingRight: 20 }}>{item.toppingsString}</Text>
                        </View>
                        <View style={{}}>
                            <Text style={{ fontWeight: 'bold', padding: 2, fontSize: 16, marginLeft: 8 }}>הערה:</Text>
                        </View>
                        <View style={{}}>
                            <Text style={{ paddingRight: 20 }}>{item.addComment}</Text>
                        </View>
                        <View style={{ position: 'absolute', bottom: 2, right: 5 }}>
                            <Text style={{ fontWeight: 'bold', }}>{"מחיר כולל: " + item.totalPriceForItem}</Text>
                        </View>
                    </View>
                )
            })}

            <View style={{ flex: 1, minHeight: 80, flexDirection: 'row', justifyContent: "space-around", backgroundColor: "white", alignItems: 'center', marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>
                    {`סה"כ לתשלום: ` + totalPrice}
                </Text>
                <TouchableOpacity
                    style={{ backgroundColor: colors.backgroundApp, minWidth: 120, minHeight: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}
                    onPress={()=>{handleSendOrder()}}
                >
                    <Text style={{ fontWeight: 'bold' }}
                    >
                        לתשלום
                    </Text>
                </TouchableOpacity>
            </View>
            {/* </View> */}
        </ScrollView>
    )
}

export default UserCart;

const styles = StyleSheet.create({
    goBackIcon: {
        margin: 5,
        marginTop: 20,
    },
    container: {
        flex: 1,
        backgroundColor: colors.greyCartBG,
    },
    // items: {
    //     justifyContent: "space-around",
    //     padding: 10,
    //   },
    headerOrder: {
        backgroundColor: colors.backgroundApp,
        padding: 15,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
    },
});
