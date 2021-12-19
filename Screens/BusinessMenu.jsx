import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal, Pressable, Linking, BackHandler, } from "react-native";
import { useRoute } from '@react-navigation/native';
import { FoodFindContext } from "../context";
import { GetBusinessItemsByBusinessID } from "../api/BusinessItemController";
import colors from "../utility/colors";
import { AntDesign } from "@expo/vector-icons";

const BusinessMenu = ({ route, navigation }) => {
  const [businessItems, setBusinessItems] = useState([]);
  const { setSelectedBusinessToppings, orderList, setOrderList } = useContext(FoodFindContext);
  const { businessID, businessName, businessDescription, businessPhone, businessLogo, } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const Route = useRoute();

  //function to handle the hardwareBackPress for our app
  const backAction = () => {
    if (Route.path === undefined) {
      return;
    }
    if (Route.name !== "BusinessMenu") {
      navigation.goBack();
    }
    else {
      if (orderList.length > 0) {
        setModalVisible(!modalVisible);
        return true;
      }
    }
  };

  // call it in when the page loaded
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  // fecth to get all items and toppings
  const GetAllItemsAndToppings = async (id) => {
    const res = await GetBusinessItemsByBusinessID(id);
    await setBusinessItems(res["items"]);
    await setSelectedBusinessToppings(res["toppings"]);
  };


  useEffect(() => {
    GetAllItemsAndToppings(businessID);
  }, [businessID]);

  // function to open the userCart after add items
  const openUserCart = () => {
    navigation.navigate("UserCart", {
      businessID: businessID,
      businessPhone: businessPhone,
    });
  };

  //check if businessUser have a logo image for business
  const renderUserImage = () =>
    businessLogo ?
      { uri: `${businessLogo}?date=${Date.now()}` }
      : { uri: `http://proj14.ruppin-tech.co.il/uploads/foodFindDefaultLogo.png?date=${Date.now()}` };

  const openPhoneDialog = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${businessPhone}`
    } else {
      phoneNumber = `telprompt:${businessPhone}`
    }
    Linking.openURL(phoneNumber)
  }

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          backgroundColor: colors.backgroundApp,
          width: "100%",
          minHeight: 80,
        }}
      >
        <TouchableOpacity
          style={styles.goBackIcon}
          onPress={() => {
            if (orderList.length > 0) setModalVisible(!modalVisible);
            else navigation.goBack();
          }}
        >
          <AntDesign name="back" size={36} color="black" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            האם אתה בטוח שברצונך לצאת מעסק זה?
          </Text>
          <Text style={{}}>אם תבצע פעולה זו רשימת המוצרים תמחק</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <AntDesign name="closecircleo" size={24} color="black" />
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 15,
            }}
          >
            <Pressable style={styles.button1}>
              <Text
                style={{ fontSize: 16 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                ביטול
              </Text>
            </Pressable>
            <Pressable style={styles.button1}>
              <Text
                style={{ fontSize: 16 }}
                onPress={() => {
                  setOrderList([]);
                  navigation.goBack();
                }}
              >
                אישור
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Image source={renderUserImage()} style={styles.image} />

      <View style={styles.description}>
        <Text style={styles.h1}>{businessName}</Text>
        <Text style={styles.h2}>{businessDescription}</Text>
        <View style={{display:'flex',alignItems: "center",justifyContent: "center" , flexDirection:'row'}}>
          <Text style={{ margin: 5 }}>
            טלפון ליצירת קשר :
            </Text>
            <TouchableOpacity
              onPress={openPhoneDialog}
              style={{borderBottomWidth:1.3,borderBottomColor:colors.backgroundApp}}
            >
              <Text>{businessPhone}</Text>
            </TouchableOpacity>
        </View>
      </View>

      <View style={styles.items}>
        <View style={styles.sectionView}>
          <Text style={{ fontWeight: 'bold' }}>המוצרים שלנו</Text>
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
                  itemPrice: item.itemPrice,
                  businessID: businessID,
                  businessName: businessName,
                  businessDescription: businessDescription,
                  businessPhone: businessPhone,
                  businessLogo: businessLogo,
                  itemImg: item.itemImg,
                });
              }}
            >
              <Image
                source={item?.itemImg ? { uri: `${item.itemImg}?date=${Date.now()}` }
                  : require("../assets/favicon.png")
                }
                style={{ width: "100%", height: 130, borderRadius: 2 }}
              />
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={{ fontSize: 14, paddingRight: 20 }}>
                {item.comment}
              </Text>
              <Text style={{ alignSelf: "flex-end", paddingLeft: 5 }}>
                ₪{item.itemPrice}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          minHeight: 60,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
        }}
      >
        {orderList.length == 0 ? (
          <View />
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              minWidth: 300,
              maxHeight: 40,
              marginTop: 15,
              padding: 30,
              backgroundColor: colors.backgroundApp,
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={openUserCart}
          >
            <Text style={{ fontSize: 20 }}>
              {orderList.length}

              <AntDesign name="shoppingcart" size={22} color="black" />
            </Text>
            <Text style={{ fontSize: 20 }}>לחץ להצגת הזמנה</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ minHeight: 80, marginTop: 10 }}></View>
    </ScrollView>
  );
};
export default BusinessMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.greyBackground,
  },
  logo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "stretch",
  },
  description: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 3.62,
    elevation: 2.5,
  },
  itemName: {
    fontSize: 20,
    marginBottom: 3,
    paddingRight: 20,
  },
  h1: {
    fontSize: 25,
    fontWeight: "500",
  },
  h2: {
    fontSize: 16,
    color: "gray",
    fontWeight: "200",
    margin: 2,
  },
  sectionView: {
    backgroundColor: colors.backgroundApp,
    padding: 15,
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 25,
    maxWidth: "35%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  items: {
    justifyContent: "space-around",
    padding: 5,
  },
  singleItemView: {
    flex: 1,
    margin: 10,
    minHeight: 200, //////
    maxHeight: 230,
    backgroundColor: "white",
    marginBottom: 5,
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#f0efeb",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 3.62,
    elevation: 2.5,
  },
  goBackIcon: {
    margin: 8,
    paddingTop: "10%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    position: "absolute",
    top: 2,
    right: 2,
  },
  button1: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.backgroundApp,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
