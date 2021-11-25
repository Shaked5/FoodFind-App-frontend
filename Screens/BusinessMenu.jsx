import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal, Pressable, Alert, BackHandler } from "react-native";
import Header from "../Components/Header";
import { FoodFindContext } from "../context";
import { retrieveAsyncStorageData } from "../utility/storage";
import Logo from "../assets/foodFindLogoSmall2.png";
import { GetBusinessItemsByBusinessID } from "../api/BusinessItemController";
import colors from "../utility/colors";
import { AntDesign } from "@expo/vector-icons";


const BusinessMenu = ({ route, navigation }) => {
  const [businessItems, setBusinessItems] = useState([]);
  const { setSelectedBusinessToppings, orderList, setOrderList } = useContext(FoodFindContext);
  const { businessID, businessName, businessDescription, businessPhone, businessLogo } = route.params;
  const [modalVisible, setModalVisible] = useState(false);


  const backAction = () => {
    setModalVisible(!modalVisible);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const GetAllItemsAndToppings = async (id) => {
    const res = await GetBusinessItemsByBusinessID(id);
    await setBusinessItems(res["items"]);
    await setSelectedBusinessToppings(res["toppings"]);
  };

  useEffect(() => {
    GetAllItemsAndToppings(businessID);
  }, [businessID]);

  const openUserCart = () => {
    navigation.navigate('UserCart', {
      businessID: businessID
    })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ backgroundColor: colors.backgroundApp }}>
        <TouchableOpacity style={styles.goBackIcon} onPress={() => {
          if (orderList.length > 0)
            setModalVisible(!modalVisible);
          else
            navigation.goBack();
        }}>
          <AntDesign
            name="back" size={36} color="black" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >

        <View style={styles.modalView}>
          <Text style={styles.modalText}>האם אתה בטוח שברצונך לצאת מעסק זה?</Text>
          <Text style={{}}>אם תבצע פעולה זו רשימת המוצרים תמחק</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <AntDesign name="closecircleo" size={24} color="black" />
            {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
          </Pressable>
          <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 15 }}>
            <Pressable style={styles.button1}>
              <Text style={{ fontSize: 16 }}
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}
              >ביטול</Text>
            </Pressable>
            <Pressable style={styles.button1}>
              <Text style={{ fontSize: 16 }}
                onPress={() => {
                  setOrderList([])
                  navigation.goBack();
                }}
              >אישור</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.logo}>
        <Image source={{ uri: businessLogo }} style={styles.image} />
      </View>

      <View style={styles.description}>
        <Text style={styles.h1}>{businessName}</Text>
        <Text style={styles.h2}>{businessDescription}</Text>
        <Text style={{ margin: 5, marginBottom: 0, marginTop: 10 ,marginBottom:5 }}>טלפון ליצירת קשר : {businessPhone}</Text>
      </View>

      <View style={styles.items}>
        <View style={styles.sectionView}>
          <Text>המוצרים שלנו</Text>
        </View>

        {businessItems.map((item) => {
          console.log("item src", item.itemImg);
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
                  itemImg: item.itemImg
                });
              }}
            >
              <Image source={{ uri: item.itemImg }} style={{ width: '100%', height:130,borderRadius:2}}></Image>
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={{ fontSize: 14, paddingRight: 20 }}>{item.comment}</Text>
              <Text style={{ alignSelf: "flex-end", paddingLeft: 5 }}>₪{item.itemPrice}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ minHeight: 60, flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 5 }}>
        {orderList.length == 0 ? <View /> :
          <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-evenly", minWidth: 300, maxHeight: 40, padding: 5, backgroundColor: colors.backgroundApp, alignItems: "center", borderRadius: 10 }}
            onPress={openUserCart}
          >
            <Text style={{ fontSize: 20 }}>
              {orderList.length}

              <AntDesign name="shoppingcart" size={22} color="black" />
            </Text>
            <Text style={{ fontSize: 20 }}>
              לחץ להצגת הזמנה
            </Text>
          </TouchableOpacity>
        }
      </View>
      <View style={{ minHeight: 80, marginTop: 10 }}>
      </View>
    </ScrollView>
  );
};
export default BusinessMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: colors.greyBackground,
  },
  logo: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",

    alignItems: "center",
  },
  image: {
    width: '100%',
    height: 200,
    // marginTop: 25,
  },
  description: {
    flex: 1,
    padding: 15,
    backgroundColor:'white',
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 3.62,
    elevation: 2.5,

  },
  itemName: {
    fontSize: 20,
    marginBottom: 3,
    paddingRight: 20
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
    marginBottom: 20,
    borderRadius: 25,
    maxWidth: "35%",
    fontSize:25,
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
    margin:10,
    minHeight: 200,//////
    maxHeight:230,
    backgroundColor: "white",
    marginBottom:5,
    alignItems: "center",
    borderRadius: 5,
    borderColor:'#f0efeb',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 3.62,
    elevation: 2.5,
  },
  toppings: {
    backgroundColor: "green",
  },
  bla: {
    backgroundColor: "pink",
  },
  goBackIcon: {
    margin: 5,
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    position: 'absolute',
    top: 2,
    right: 2,
  },
  button1: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.backgroundApp
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  }
});
