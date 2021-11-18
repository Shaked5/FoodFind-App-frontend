import React,{useContext} from 'react'
import { View, Text,TouchableOpacity ,ScrollView,StyleSheet } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import {FoodFindContext} from "../context";
import colors from "../utility/colors";

const UserCart = ({ route, navigation }) => {
    const {orderList} = useContext(FoodFindContext);
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
            {orderList&& orderList.map((item)=>{
                return (
                    <View>
                        <Text>{item.itemName}{item.itemPrice}{item.comment}{item.itemAmount}</Text>
                    </View>
                )
            })}
            <View>

            </View>
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
  });
  