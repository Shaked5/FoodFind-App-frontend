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
} from "react-native";
import { FoodFindContext } from "../context";
import Logo from "../assets/foodFindLogoSmall2.png";
import { AntDesign } from "@expo/vector-icons";

const ItemScreen = ({ navigation, route }) => {
  const { itemToppingName } = route.params;
  const { selectedBusinessToppings } = useContext(FoodFindContext);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [itemAmount, setItemAmount] = useState(0);

  useEffect(() => {
    console.log("context=", selectedBusinessToppings);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          backgroundColor: "yellow",
          minWidth: windowWidth,
          minHeight: windowHeight,
          borderWidth: 1,
        }}
      >
        <View style={{ marginTop: '5%' }}><AntDesign onPress={() => {
         navigation.goBack();
        }}
          style={{ paddingLeft: 5 }} name="back" size={36} color="black" />
        </View>
        <View
          style={{
            backgroundColor: "green",
            minHeight: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{itemToppingName}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            margin: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setItemAmount(itemAmount + 1);
            }}
          >
            <AntDesign name="plus" size={30} color="black" />
          </TouchableOpacity>

          <Text style={styles.input} value={itemAmount} keyboardType="numeric">
            {itemAmount}
          </Text>

          <TouchableOpacity>
            <AntDesign
              name="minus"
              size={30}
              color="black"
              onPress={() => {
                setItemAmount(itemAmount - 1);
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: 'pink', minHeight: 80, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 22 }}>ניתן לבחור תוספות למוצר {itemToppingName}</Text>
          </View>

          <View style={{}}>
            {selectedBusinessToppings.map((item) => { ///להפוך לגריד
              return (
                <TouchableOpacity
                  key={item.toppingID}
                  style={{
                    backgroundColor: "#fff",
                    margin: 10,
                    flexDirection: 'row',
                    maxWidth: 120,
                    borderRadius: 25,
                    padding: 5,
                  }}
                >
                  <Text style={styles.itemName}>{item.toppingName}</Text>
                  <Text style={{}}>
                    ₪{item.toppingPrice}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
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
    fontSize: 20,
    color: "blue",
  },
});
