import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import colors from "../utility/colors";
const Order = () => {
  return (
    <TouchableOpacity>
      <View style={styles.mainView}>
        <View style={styles.innerView}>
          <View style={styles.topInnerView}>
            <Text style={styles.businessName}>הג'חנון של ג'קלין</Text>
            <Text style={styles.orderAddress}>הכלנית 69, נתניה</Text>
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
              <Text>02/11/2021</Text>
              <Text>19:32</Text>
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
              <Text style={styles.orderPrice}>167.00$</Text>
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="down"
                size={34}
                color={colors.backgroundApp}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Order;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    width: 380,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundApp,
    borderRadius: 5,
  },
  innerView: {
    width: "95%",
    height: "90%",
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
    margin: 25,
  },
});
