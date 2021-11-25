import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { FoodFindContext } from "../context";
import Logo from "../assets/foodFindLogoSmall2.png";
import { AntDesign } from "@expo/vector-icons";
import colors from "../utility/colors";
import { FlatGrid } from "react-native-super-grid";
import { render } from "react-dom";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

const ItemScreen = ({ navigation, route }) => {
  const {
    itemName,
    itemID,
    itemPrice,
    businessID,
    businessName,
    businessDescription,
    businessPhone,
    itemImg,
  } = route.params;
  const { selectedBusinessToppings, orderList } = useContext(FoodFindContext);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [itemAmount, setItemAmount] = useState(1);
  const [addComment, setAddComment] = useState("");
  const [filteredTopping, setFilteredTopping] = useState([]);
  const [toppingsString, setToppingsString] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [totalToppingsPrice, setTotalToppingsPrice] = useState(0);

  useEffect(() => {
    filterToppingHandler();
  }, []);

  const filterToppingHandler = async () => {
    const topfil = selectedBusinessToppings.filter(
      (item) => itemID === item.itemID && item.isActive
    );

    const newData = topfil.map((item) => {
      return { ...item, selected: false };
    });
    await setFilteredTopping(newData);
  };

  // help us to know which topping is choosen
  const handleClickTopping = async (item) => {
    if (item.selected) {
      //to clear the green BG
      item.selected = false;
      //remove toppingName from comment
      let newString = toppingsString.replace(item.toppingName + " ", "");
      await setToppingsString(newString);
      let removeToppingPrice = totalToppingsPrice - item.toppingPrice;
      setTotalToppingsPrice(removeToppingPrice);
    } else {
      item.selected = true;
      let newComment = toppingsString + item.toppingName + ", ";
      let addToppingPrice = totalToppingsPrice + item.toppingPrice;
      await setTotalToppingsPrice(addToppingPrice);
      await setToppingsString(newComment);
    }
    //for re render the component
    let newList = filteredTopping.filter((e) => e.toppingID !== item.toppingID);
    newList.push(item);
    await setFilteredTopping(newList);
  };

  const insertItemToOrder = async () => {
    let totalPriceForItem = (itemPrice + totalToppingsPrice) * itemAmount;
    orderList.push({
      itemName,
      itemID,
      itemAmount,
      toppingsString,
      itemPrice,
      addComment,
      totalPriceForItem,
    });
    await setShowLoader(true);
    await closeLoaderIn5Seconds();
  };

  const closeLoaderIn5Seconds = () => {
    setTimeout(() => {
      setShowLoader(false);
      navigation.navigate("BusinessMenu", {
        businessID: businessID,
        businessName: businessName,
        businessDescription: businessDescription,
        businessPhone: businessPhone,
      });
    }, 3000);
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          backgroundColor: colors.greyBackground,
          minWidth: windowWidth,
          minHeight: windowHeight,
          borderWidth: 1,
        }}
      >
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
        <View
          style={{
            // backgroundColor: "green",
            // minHeight: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: itemImg }}
            style={{ width: "100%", height: 200 }}
          />
        </View>

        <View style={styles.itemNameView}>
          <Text style={{ fontSize: 25, alignSelf: "center" }}>{itemName}</Text>
          <Text style={{ paddingTop: 10 }}>בחר את כמות המוצרים</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setItemAmount(itemAmount + 1);
            }}
          >
            <AntDesign name="plus" size={25} color="black" />
          </TouchableOpacity>

          <Text style={styles.input} value={itemAmount} keyboardType="numeric">
            {itemAmount}
          </Text>

          <TouchableOpacity>
            <AntDesign
              name="minus"
              size={25}
              color="black"
              onPress={() => {
                if (itemAmount == 0) return;
                setItemAmount(itemAmount - 1);
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ padding: 5 }}>
          <View style={styles.middleView}>
            <Text style={{ fontSize: 22 }}>
              ניתן לבחור תוספות למוצר {itemName}
            </Text>
          </View>
        </View>

        <FlatGrid
          itemDimension={130}
          data={filteredTopping}
          style={styles.gridView}
          spacing={5}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                
              }}
            >
              <TouchableOpacity
                key={item.toppingID}
                style={{
                  flex: 1,
                  backgroundColor: item.selected
                    ? colors.backgroundApp
                    : "white",
                  margin: 10,
                  maxWidth: 100,
                  borderRadius: 25,
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
                keyExtractor={(item) => item.id}
                onPress={() => {
                  handleClickTopping(item);
                }}
              >
                <Text style={styles.itemName}>{item.toppingName}</Text>
                <Text>₪{item.toppingPrice}</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <View
          style={{
            minHeight: 120,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 16 }}>
            ניתן להוסיף הערות למוצר
          </Text>
          <View style={styles.textAreaContiner}>
            <AutoGrowingTextInput
              minHeight={100}
              maxHeight={280}
              minWidth={280}
              maxWidth={280}
              style={styles.textInput}
              placeholder={"הוסף הערה למוצר"}
            />
          </View>
        </View>

        <View style={{ margin: 20 }}>
          {showLoader && <ActivityIndicator size="large" color="#0000ff" />}
          <TouchableOpacity
            style={{
              borderRadius: 30,
              padding: 20,
              backgroundColor: colors.backgroundApp,
              justifyContent: "center",
              alignItems: "center",
              
            }}
            onPress={insertItemToOrder}
          >
            <Text style={{fontSize:15, fontWeight: "bold"}}>אשר</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
  },
  itemNameView: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
  },
  goBackIcon: {
    margin: 5,
    marginTop: 20,
  },
  itemName: {
    fontSize: 15,
    marginBottom: 3,
  },
  toppings: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  input: {
    fontSize: 25,
    color: "blue",
  },

  middleView: {
    maxHeight: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  textAreaContiner: {
    width:'90%',
    borderColor: "gray",
    borderWidth: 1,
    borderRadius:5,
    padding: 5,
  },
  textInput: {
    
  },

  // textArea: {
  //   display: "flex",
  //   height: 150,
  //   justifyContent: "flex-start",
  // },
});
