import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getAllOfOrder } from "../api/UserOrderController";

import colors from "../utility/colors";

const windowWidth = Dimensions.get("window").width;

const Order = ({ userOrder }) => {
  const [lastOrder, setLastOrder] = useState([]);
  const [expand, setExpand] = useState(false);

  //fecth items of order by order id
  const GetItemsOfOrder = async () => {
    setExpand((expand) => !expand);
    if (userOrder !== null && userOrder.orderID !== 0) {
      let res = await getAllOfOrder(userOrder.orderID);
      setLastOrder(res);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        GetItemsOfOrder();
      }}
    >
      <View style={styles.mainView}>
        <View style={styles.innerView}>
          <View style={styles.topInnerView}>
            <Text style={styles.businessName}>{userOrder.businessName}</Text>
            <Text style={styles.orderAddress}>{userOrder.businessAddress}</Text>
          </View>
          <View style={styles.bottomInnerView}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                margin: 10,
              }}
            >
              <Text>{userOrder.orderDate}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 10,
              }}
            >
              <Text style={styles.orderPrice}>
                 מחיר סה"כ:  {userOrder.orderTotalPrice}₪ 
              </Text>
              <AntDesign
                style={{ paddingLeft: 10 }}
                name={expand?"up": "down"}
                size={34}
                color={colors.backgroundApp}
              />
            </View>
          </View>
        </View>
        {expand && (
          <View style={{ minWidth: "100%", minHeight: 150, padding: 15 }}>
            {lastOrder.map((item) => (
              <View
                style={{
                  minWidth: "100%",
                  maxHeight: "100%",
                  borderBottomWidth:lastOrder.length>1? 1:0,
                  flexDirection: "column",
                  margin:2,
                  
                }}
              >
                <View
                  style={{ 
                    flexDirection: "row",
                    flexWrap: "wrap",
                    display: "flex",
                    justifyContent: "space-around",
                    padding:4
                  }}
                >
                  <Text style={styles.details}>{item.itemName}</Text>
                  <Text style={styles.details}>{item.comments}</Text>
                  <Text style={styles.details}>{item.itemAmount}X</Text>
                 
                </View>
                <View style={{display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{fontSize:18 , fontWeight: 'bold'}}>מחיר מוצר : {item.itemTotalPrice}</Text>
                  </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Order;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    width: windowWidth * 0.95,
    minHeight: 170,
    marginTop: 15,
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: colors.backgroundApp,
    borderRadius: 5,
  },
  innerView: {
    width: "95%",
    minHeight: 150,
    backgroundColor: "white",
    borderRadius: 5,
  },

  topInnerView: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomInnerView: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  businessName: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
  },
  orderAddress: {
    margin: 20,
    paddingLeft: 15,
  },
  orderPrice: {
    margin: 8,
  },
  details:{
    fontSize:18,
  }
});
