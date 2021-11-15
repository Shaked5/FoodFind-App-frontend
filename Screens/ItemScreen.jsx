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
import { FlatGrid } from "react-native-super-grid";

const ItemScreen = ({ navigation, route }) => {
  const { itemName, itemID } = route.params;
  const { selectedBusinessToppings } = useContext(FoodFindContext);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [itemAmount, setItemAmount] = useState(0);
  const [onPressTopping, setOnPressTopping] = useState(false);
  const [filteredTopping, setFilteredTopping] = useState([]);

  useEffect(() => {
    filterToppingHandler();
  }, []);

  const onMultiSelection = () => {
    console.log("newData=", filteredTopping);
  };

  const filterToppingHandler = async () => {
    console.log("context=", selectedBusinessToppings);
    const topfil = selectedBusinessToppings.filter(
      (item) => itemID === item.itemID
    );

    console.log("filter=", topfil);
    const newData = topfil.map((item) => {
      return {...item,selected:false}
    })
    await setFilteredTopping(newData);
    console.log("after shilbug =", newData);
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

        <View style={{ backgroundColor: "red", padding: 5 }}>
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
          // staticDimension={300}
          // fixed
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
                  backgroundColor:
                  filteredTopping.selected == true ? "#52b788" : "white",
                  margin: 10,
                  maxWidth: 150,
                  borderRadius: 25,
                  padding: 5,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
                keyExtractor={(item) => item.id}
                onPress={() => {
                  
                }}
              >
                <Text style={styles.itemName}>{item.toppingName}</Text>
                <Text style={{}}>₪{item.toppingPrice}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
    maxHeight: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
