import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import foodFindLogo from "../assets/foodFindLogoSmall.png";
import color from "../utility/colors";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const BusinessCard = () => {
  return (
    // <View style={{
    //     borderRadius:25, width: WINDOW_WIDTH*0.85,
    //     shadowColor: "#000",

    //     shadowOpacity: 0.5,
    //     shadowRadius: 3.62,

    //     elevation: 10,
    // }}>
    <TouchableOpacity style={styles.btnCard}>
      <View style={styles.businessCardView}>
        
          <Text style={{ fontSize: 22 }}>הג'חנון של פודפיינד</Text>
          <Image source={foodFindLogo} />
          <Text >sdadas</Text>
       
      </View>
    </TouchableOpacity>
    // </View>
  );
};

export default BusinessCard;

const styles = StyleSheet.create({
  btnCard: {
    marginTop: 20,
    borderRadius: 25,
    width: WINDOW_WIDTH * 0.96,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 3.62,
    elevation: 8,
  },

  businessCardView: {
    flex: 1,
    height: 230,
    backgroundColor: color.businessCard,
    alignItems: "center",
    borderRadius: 25,
    justifyContent: "space-evenly",
    borderWidth:0.8,

  },
});
