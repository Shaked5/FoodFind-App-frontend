import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../Components/Header";
import { FoodFindContext } from "../context";
import { retrieveAsyncStorageData } from "../utility/storage";
import Logo from "../assets/foodFindLogoSmall2.png";
import { GetBusinessItemsByBusinessID } from "../api/BusinessItemController";
import colors from "../utility/colors";
import { AntDesign } from "@expo/vector-icons";

const BusinessMenu = ({ route, navigation }) => {
  const [businessItems, setBusinessItems] = useState([]);
  const [businessToppings, setBusinessToppings] = useState([]);
  const [businessDetails, setBusinessDetails] = useState([]);
  const { setSelectedBusinessToppings } = useContext(FoodFindContext);
  const { businessID, businessName, businessDescription, businessPhone } =
    route.params;

  const GetAllItemsAndToppings = async (id) => {
    const res = await GetBusinessItemsByBusinessID(id);
    await setBusinessItems(res["items"]);
    await setSelectedBusinessToppings(res["toppings"]);
  };

  useEffect(() => {
    GetAllItemsAndToppings(businessID);
  }, [businessID]);

  return (
    <ScrollView style={styles.container}>
      <View>
          <TouchableOpacity style={styles.goBackIcon}  onPress={() => {
         navigation.goBack();
        }}>
          <AntDesign 
          name="back" size={36} color="black" />
          </TouchableOpacity>

        </View>
      <View style={styles.logo}>
        <Image source={Logo} style={styles.image} />
      </View>

      <View style={styles.description}>
        <Text style={styles.h1}>{businessName}</Text>
        <Text style={styles.h2}>{businessDescription}</Text>
        <Text style={{ margin: 5 }}>טלפון ליצירת קשר : {businessPhone}</Text>
      </View>

      <View style={styles.items}>
        <View style={styles.sectionView}>
          <Text>המוצרים שלנו</Text>
        </View>

        {businessItems.map((item) => {
          return (
            <TouchableOpacity
              key={item.itemID}
              style={styles.singleItemView}
              onPress={() => {
                navigation.navigate("ItemScreen", {
                  itemName: item.itemName,
                  itemID: item.itemID,
                });
              }}
            >
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text>{item.comment}</Text>
              <Text style={{ alignSelf: "flex-end" }}>₪{item.itemPrice}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ minHeight: 150 }}>
        <Text>footer</Text>
      </View>
    </ScrollView>
  );
};
export default BusinessMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
    backgroundColor:colors.greyBackground,
  },
  logo: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "25%",
    maxHeight: "30%",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 80,
    marginTop: 25,
  },
  description: {
    flex: 1,
    padding: 15,
    minHeight: 160,
    
  },
  itemName: {
    fontSize: 20,
    marginBottom: 3,
  },
  h1: {
    fontSize: 25,
    fontWeight: "500",
    margin: 5,
  },
  h2: {
    fontSize: 16,
    color: "gray",
    fontWeight: "200",
    margin: 5,
  },
  sectionView: {
    backgroundColor: colors.backgroundApp,
    padding: 15,
    margin: 10,
    borderRadius: 25,
    maxWidth: "35%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  items: {
    justifyContent: "space-around",
    padding: 10,
  },
  singleItemView: {
    backgroundColor: "#f8f9fa",
    marginBottom: 8,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 24,
  },
  toppings: {
    backgroundColor: "green",
  },
  bla: {
    backgroundColor: "pink",
  },
  goBackIcon:{
    margin:5,
    marginTop:20,
   },
});
