import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../Components/Header";
import colors from "../utility/colors";

const UserOrders = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Header />
      </View>
      <View style={styles.containerBody}>
        <View style={styles.buttonsView}>
          <TouchableOpacity style={styles.buttons}>
            <Text>הזמנות אחרונות</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Text>הזמנות בתהליך</Text>
          </TouchableOpacity>
          
        </View>
        <View style={{flex:8}}>
            <Text>Shaked</Text>
        </View>
      </View>
    </View>
  );
};

export default UserOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  containerBody: {
    flex: 9,
    backgroundColor: colors.white,
  },
  headerView: {
    flex: 1.5,
  },
  buttonsView:{
      
      flex:0.8,
      backgroundColor:colors.backgroundApp,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-evenly',
      borderBottomWidth:10,
      borderBottomColor:colors.backgroundApp
    
      

  },
  buttons:{
      flex:1,
      marginTop:'2%',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:colors.white,
     
      width:200,
      
      
  },
});
