import React, { useState, useEffect, useContext } from "react";
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
import { FoodFindContext } from "../context";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const BusinessCard = ({ navigation, businessPost }) => {
  const { selectedBusiness, setSelectedBusiness } = useContext(FoodFindContext);

  const selectedBusinessHandler = async (data) => {
    await setSelectedBusiness(data);
  };

  return (
    // <View style={{
    //     borderRadius:25, width: WINDOW_WIDTH*0.85,
    //     shadowColor: "#000",

    //     shadowOpacity: 0.5,
    //     shadowRadius: 3.62,

    //     elevation: 10,
    // }}>
    <TouchableOpacity
      style={styles.btnCard}
      onPress={() => {
        navigation.navigate("BusinessMenu", {
          businessID: businessPost.businessID,
          businessName: businessPost.businessName,
          businessDescription: businessPost.businessDescription,
          businessPhone: businessPost.businessPhone,
          businessStatus: businessPost.businessStatus,
          businessLogo: businessPost.businessLogo,
        });
      }}
    >
      <View style={styles.businessCardView}>
        <Image source={{ uri: businessPost.businessLogo }} style={{ width: '100%', height: '72%',borderRadius:22 }} />
        <Text style={{ fontSize: 22 }}>{businessPost.businessName}</Text>

        <Text style={{ textAlign: "center" }}>
          {businessPost.businessDescription}
        </Text>
      </View>
    </TouchableOpacity>
    // </View>
  );
};

export default BusinessCard;

const styles = StyleSheet.create({
  btnCard: {
    marginTop: 15,
    marginBottom:15,
    borderRadius: 25,
    width: WINDOW_WIDTH * 0.92,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 3.62,
    elevation: 8,
  },

  businessCardView: {
    flex: 1,
    height: 230,//////
    backgroundColor: color.businessCard,
    alignItems: "center",
    borderRadius: 25,
    justifyContent: "space-evenly",
    borderWidth: 0.8,
  },
});
