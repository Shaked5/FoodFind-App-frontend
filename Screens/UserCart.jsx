import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { FoodFindContext } from "../context";
import colors from "../utility/colors";

const UserCart = ({ route, navigation }) => {
    const { orderList } = useContext(FoodFindContext);
    // const {}= route.params;
    return (
        <ScrollView style={styles.container}>
            <View style={{ backgroundColor: 'red' }}>
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
                    <View style={{ maxWidth: 360, margin: 15, borderRadius: 15, backgroundColor: 'green' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>{item.itemName}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', padding: 10 }}>{item.comment}</Text>
                            <View style={{position: 'absolute',bottom: 2,right:5}}>
                                <Text>{item.itemAmount}X</Text>
                            </View>
                        </View>
                        {/* {item.itemPrice}{item.comment}{item.itemAmount} */}
                    </View>
                )
            })}


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
        backgroundColor: colors.greyBackground,
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
        // maxWidth: 300,
        justifyContent: "center",
        alignItems: "center",
    },
});
