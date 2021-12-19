import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import foodFindLogoSmall2 from "../assets/foodFindLogoSmall2.png";
import color from "../utility/colors";
import { FoodFindContext } from "../context";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const BusinessCard = ({ navigation, businessPost }) => {
  const { selectedBusiness, setSelectedBusiness } = useContext(FoodFindContext);

  const selectedBusinessHandler = async (data) => {
    await setSelectedBusiness(data);
  };

  const renderUserImage = () =>
  businessPost?.businessLogo
    ? { uri: `${businessPost.businessLogo}?date=${Date.now()}` }
    : {uri:`http://proj14.ruppin-tech.co.il/uploads/foodFindDefaultLogo.png`}


  return (
 
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
        {businessPost.businessLogo !== "" &&
        <Image source={renderUserImage()} style={{ width: "100%", height:130,borderRadius:2}} />
    }

       
        <Text style={{ fontSize: 22, margin:8 }}>{businessPost.businessName}</Text>
        <Text style={{ textAlign: "center" }}>
          {businessPost.businessDescription}
        </Text>
        
      </View>
    </TouchableOpacity>
  );
};

export default BusinessCard;

const styles = StyleSheet.create({
  btnCard: {
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 5,
  
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 3.62,
    elevation: 2.5,
  },

  businessCardView: {
    flex: 1,
    minHeight: 230,
    width:380,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 5,
    borderColor:'#f0efeb',
    borderWidth: 0.8,
  },
});
