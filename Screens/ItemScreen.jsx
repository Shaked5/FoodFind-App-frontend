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
  const [comment,setComment] = useState("");


  useEffect(() => {
    filterToppingHandler();
  }, []);

  const onMultiSelection = () => {
    // console.log("newData=", filteredTopping);
  };

  const filterToppingHandler = async () => {
    // console.log("context=", selectedBusinessToppings);
    const topfil = selectedBusinessToppings.filter(
      (item) => itemID === item.itemID &&item.isActive
    );

    // console.log("filter=", topfil);
    const newData = topfil.map((item) => {
      return { ...item, selected: false }
    })
    await setFilteredTopping(newData);
    // console.log("after shilbug =", newData);
  };
// help us to know which topping is choosen
  const handleClickTopping = async (item) => {
    if(item.selected){
      //to clear the green BG
      item.selected=false;
      //remove toppingName from comment
      let newString = comment.replace(item.toppingName+" ","")
      await setComment(newString);
      console.log("newString",newString);
    }else{
      item.selected = true;
      let newComment=comment+item.toppingName+" ";
      await setComment(newComment);
      console.log("newComent",newComment);
    }
    //for re render the component
    let newList = filteredTopping.filter(e => e.toppingID !== item.toppingID)
    newList.push(item);
    await setFilteredTopping(newList);
  }


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
        <View style={{backgroundColor: colors.backgroundApp}}>
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
                  backgroundColor: item.selected ? colors.backgroundApp : "white",
                  margin: 10,
                  maxWidth: 150,
                  borderRadius: 25,
                  padding: 5,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
                keyExtractor={(item) => item.id}
                onPress={() => {
                  handleClickTopping(item);
                }}
              >

                <Text style={styles.itemName}>{item.toppingName}</Text>
                <Text style={{}}>₪{item.toppingPrice}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        
        <View style={{minHeight:120,justifyContent: 'center',alignItems: 'center'}}>
          <Text style={{marginBottom:10,fontWeight: "bold",fontSize:16}}>ניתן להוסיף הערות למוצר</Text>
          <TextInput style={{backgroundColor:'red',minHeight:100,minWidth:300,borderRadius:10}} placeholder="הוסף הערה למוצר"/>
        </View>
        <View>
          <TouchableOpacity>
            <Text>לחץ</Text>
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
