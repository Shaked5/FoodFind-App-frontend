import React, { useState, useEffect,useContext } from "react";
import { getAllUsers } from '../api/UserController';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BusinessCard from "../Components/BusinessCard";
import { GetUserByEmail } from '../api/UserController'
import { getAllBusinessUsers } from "../api/BusinessUsersController";



const Home = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const { user, setUser } = useContext(FoodFindContext);
  const [selectedId, setSelectedId] = useState(null);
  const [allBusiness, setAllBusiness] = useState([]);
  const [filteredBusiness, setFilteredBusiness] = useState([]);
  const [search, setSearch] = useState("");


  const renderItem = ({ item }) =>
    <BusinessCard
      businessPost={item}
      style={styles.businessCardRender}
      navigation={navigation}
      
    />;

  useEffect(() => {
    //find id from db and push myID to user context
    (async () => {
      if(user.email!== null){
        const data = await GetUserByEmail(user.email);
        setUser({ ...user, userID: data.userID });
      }
    })()
  }, [user == null]);

  const handleGetAllBusinessUsers= async () => {
    const res = await getAllBusinessUsers();
    console.log("bla", res);
    await setAllBusiness(res);
    await setFilteredBusiness(res);
  }

  useEffect(() => {
    handleGetAllBusinessUsers();
  },[]);

  const searchFilter = (text) => {
    if (text) {
      const newData = allBusiness.filter((item) => {
        const itemData = item.businessName ? item.businessName : '';
        return itemData.indexOf(text) > -1;
      });
      setFilteredBusiness(newData);
      setSearch(text);
    }
    else{
      setFilteredBusiness(allBusiness)
      setSearch(text);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView >
        <View style={styles.headerView}>
          <Header />
        </View>
        <Searchbar

          placeholder='חפש'
          onChangeText={(text) => searchFilter(text)}
          value={search}
          icon='magnify'
        />
        <View style={styles.containerBody}>
          {/* <ScrollView style={styles.FlatlistView}> */}
          <FlatList
            vertical
            style={{ alignSelf: "center" }}
            data={filteredBusiness}
            renderItem={renderItem}
            keyExtractor={item => item.businessID}
            extraData={selectedId}
          />
          {/* </ScrollView> */}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerInput: {
    backgroundColor: "red",
  },
  containerBody: {
    flex: 9,
    backgroundColor: colors.white,

  },
  headerView: {
    flex: 1.5,

  },
  FlatlistView: {
    flex: 1,
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
  businessCardRender: {
    flex: 1,
  },
});
