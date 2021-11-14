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
import colors from "../utility/colors";

const ItemScreen = ({ navigation, route }) => {
  const { itemName } = route.params;
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
          backgroundColor: colors.greyBackground,
          minWidth: windowWidth,
          minHeight: windowHeight,
          borderWidth: 1,
        }}
      >
        <View>
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
            backgroundColor: "green",
            minHeight: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{itemName}</Text>
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
          <View style={styles.middleView}>
            <Text style={{ fontSize: 22 }}>
              ניתן לבחור תוספות למוצר {itemName}
            </Text>
          </View>

         
            {selectedBusinessToppings.map((item) => {
              ///להפוך לגריד
              return (
                <View style={{backgroundColor:'red',flexDirection:'column' }}>
                <TouchableOpacity
                  key={item.toppingID}
                  style={{
                    flex:1,
                    backgroundColor: "pink",
                    margin: 10,
                    flexDirection:'row',
                    maxWidth:150,
                    borderRadius: 25,
                    padding: 5,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.itemName}>{item.toppingName}</Text>
                  <Text style={{}}>₪{item.toppingPrice}</Text>
                </TouchableOpacity>
                </View>
              );
            })}
          
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
    fontSize: 20,
    color: "blue",
  },

  middleView: {
    minHeight: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
