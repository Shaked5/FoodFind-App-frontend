import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 
import Checkbox from "expo-checkbox";
import { FoodFindContext } from "../context";
import colors from "../utility/colors";
import {
  insertNewOrder,
  insertItemToOrder,
  UpdateTotalPrice,
} from "../api/UserOrderController";

const UserCart = ({ route, navigation }) => {
  const { businessID, businessPhone } = route.params;
  const { orderList,setOrderList, user } = useContext(FoodFindContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [useCash, setUseCash] = useState(false);
  const [useBit, setUseBit] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");


  //handle delete items in cart
  const  deleteItemFromCart =  (index) => {
    const items = orderList.filter((item , i) => i !== index)
    setOrderList(items);
  }

  //update price if delete 1 item
  useEffect(() => {
    getTotalPrice()
  },[orderList])

  //get total price of item in cart
  const getTotalPrice = () => {
    let total = 0;
    orderList.map( (item) => {
      total += item.totalPriceForItem;
    });
    setTotalPrice(total);
  };


  //insert new order , inserts items to order and update the price
  const handleSendOrder = async () => {
    if (orderList.length === 0){
      Alert.alert("לא ניתן לבצע הזמנה ללא מוצרים.")
      return
    } 
    if (user !== null) {
      //insert to OrdersTB and OrderOfItemaTB
      let orderID;
      let listToSend = [];
      if (
        businessID !== null &&
        businessID !== undefined &&
        user.userID !== null &&
        user.userID !== undefined
      ) {
        orderID = await insertNewOrder({
          userID: user.userID,
          businessID: businessID,
          orderDate: "",
          orderStatus: false,
          orderPaidUp: false,
          shippingAddress: "",
        });
      }

      if (orderID !== undefined && orderID !== null) {
        //mapping orderlist and arrange the list to send
        orderList.map((item) => {
          listToSend.push({
            orderID: orderID,
            itemID: item.itemID,
            comments: item.toppingsString + item.addComment,
            itemAmount: item.itemAmount,
            itemTotalPrice: item.totalPriceForItem,
          });
        });
        let orderItems = await insertItemToOrder(listToSend);
      }
      const result = await UpdateTotalPrice({
        orderID,
        totalPrice: totalPrice,
      });
      if (result == 1) {
        Alert.alert("ההזמנה נשלחה לבעל העסק , בתאבון");
        setOrderList([])
        navigation.navigate("UserOrders"); ///need to move the order in params
      } else {
        Alert.alert("תקלה זמנית");
      }
    } else {
      navigation.navigate("Login", { fromCart: true });
    }
  };



  return (
    <ScrollView style={styles.container}>
      <View style={{ backgroundColor: colors.backgroundApp }}>
        <TouchableOpacity
          style={styles.goBackIcon}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="back" size={36} color="black" />
        </TouchableOpacity>
      </View>
      {/* <View style={{ alignItems: 'center', backgroundColor: 'black' }}> */}
      <View style={styles.headerOrder}>
        <Text style={{ fontWeight: "bold" }}>המוצרים בהזמנה</Text>
      </View>
      {orderList &&
        orderList.map((item,index) => {
          return (
            <View
              keyExtractor={(item, index) => item.key}
              style={{
                minWidth: 300,
                margin: 15,
                marginTop: 6,
                borderRadius: 15,
                backgroundColor: "white",
                padding: 8,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {item.itemName}
                </Text>

              </View>
              <View style={{ position: "absolute", top: 3, right: 5, display: "flex", flexDirection: "row"}}>
                <Text style={{ fontWeight: "bold", fontSize: 16, padding: 9 }}>
                  {item.itemAmount}X
                </Text>
                <Ionicons onPress={() => deleteItemFromCart(index)} style={{ margin:8}}name="ios-trash-bin" size={24} color="black"/>
              </View>
              <View style={{}}>
                <Text
                  style={{
                    fontWeight: "bold",
                    padding: 2,
                    fontSize: 16,
                    marginLeft: 8,
                  }}
                >
                  תוספות נבחרות:
                </Text>
              </View>
              <View style={{}}>
                <Text style={{ fontWeight: "bold", paddingRight: 20 }}>
                  {item.toppingsString}
                </Text>
              </View>
              <View style={{}}>
                <Text
                  style={{
                    fontWeight: "bold",
                    padding: 2,
                    fontSize: 16,
                    marginLeft: 8,
                  }}
                >
                  הערה:
                </Text>
              </View>
              <View style={{}}>
                <Text style={{ paddingRight: 20 }}>{item.addComment}</Text>
              </View>
              <View style={{ position: "absolute", bottom: 2, right: 5 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {"מחיר כולל: " + "₪" + item.totalPriceForItem}
                </Text>
              </View>
            </View>
          );
        })}

      <View style={styles.checkboxView}>
        <View style={styles.innerCheckboxView}>
          <Checkbox
            style={styles.checkbox}
            value={useBit}
            color={colors.backgroundApp}
            onValueChange={() => {
              setIsChecked(true);
              setUseBit(true);
              setUseCash(false);
            }}
          />
          <Text>תשלום בביט</Text>
        </View>
        <View style={styles.innerCheckboxView}>
          <Checkbox
            style={styles.checkbox}
            value={useCash}
            color={colors.backgroundApp}
            onValueChange={() => {
              setIsChecked(true);
              setUseCash(true);
              setUseBit(false);
            }}
          />
          <Text>תשלום במזומן</Text>
        </View>
      </View>
      

      {isChecked &&  (
        <View
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 60,
          }}
        >
          <TextInput
            style={{ fontSize: 21, alignItems: "center" }}
            placeholder="הכנס מספר טלפון"
            onChangeText={(val) => setUserPhoneNumber(val)}
            keyboardType="numeric"
          />
        </View>
      )}


      {useBit && (
          <View
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 60,
            
        }}
          >
            <Text style={{fontSize:16,fontWeight: "bold",margin:10}}>נא לבצע שליחת תשלום בביט עם סכום ההזמנה למספר</Text>
            <Text style={{fontSize:25,margin:10,fontWeight: "bold"}}>{businessPhone}</Text>
          </View>
      )}
    
      <View
        style={{
          flex: 1,
          minHeight: 80,
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "white",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          {`סה"כ לתשלום: ` + "₪" + totalPrice}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.backgroundApp,
            minWidth: 120,
            minHeight: 50,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleSendOrder}
        >
          <Text style={{ fontWeight: "bold" }}>לתשלום</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserCart;

const styles = StyleSheet.create({
  goBackIcon: {
    margin: 8,
    paddingTop: "10%",
  },
  container: {
    flex: 1,
    backgroundColor: colors.greyCartBG,
  },
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
  checkboxView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: 50,
    backgroundColor: "white",
    padding: 20,
  },
  innerCheckboxView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
