import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Button,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import colors from "../utility/colors";
import { FoodFindContext } from "../context";
import Header from "../Components/Header";
import { Searchbar } from "react-native-paper";
import BusinessCard from "../Components/BusinessCard";

const Home = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const { user } = React.useContext(FoodFindContext);
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const renderItem = ({ item }) => <BusinessCard style={styles.businessCardRender} />;
  // const Item = ({ title }) => (
  //     <View style={styles.item}>
  //         <Text style={styles.title}>{title}</Text>
  //     </View>
  // );

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-1445571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-1345571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-1452571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e2329d72",
      title: "Third Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-144671e2329d72",
        title: "Third Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-14459d72",
        title: "forth Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-144639d72",
        title: "forth Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-1446329d72",
        title: "forth Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-1459d72",
        title: "forth Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145429d72",
        title: "forth Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-1446529d72",
        title: "forth Item",
      },
    
  ];

  console.log(user);
  return (
    <View style={styles.container}>
        <View style={styles.headerView}>
            <Header />
        </View>

      {/* <Searchbar

                    placeholder='חפש'
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    icon='magnify'
                /> */}

      <View style={styles.containerBody}>
        <ScrollView style={styles.FlatlistView}>
          <FlatList
            vertical
            style={{ alignSelf: "center" }}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={DATA.id}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
  },
  containerInput: {
    backgroundColor: "red",
  },
  containerBody: {
    flex: 9,
    backgroundColor: colors.white,
   
  },
  headerView:{
      flex:1.5,

  },
  FlatlistView:{
      flex:1,
  },
  // item: {
  //     backgroundColor: '#035fff',
  //     borderRadius: 25,
  //     padding: 20,
  //     marginVertical: 8,
  //     marginHorizontal: 20,
  // },
  title: {
    fontSize: 32,
  },
  businessCardRender:{
      flex:1,
  },
});
