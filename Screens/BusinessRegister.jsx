import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import BusinessForm from "../Components/BusinessForm";
import Header from "../Components/Header";
import colors from "../utility/colors";

const BusinessRegister = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Header />
      </View>
      <View style={styles.containerBody}>
        <BusinessForm />
      </View>
    </View>
  );
};

export default BusinessRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  containerBody: {
    flex: 9,
    backgroundColor: colors.greyBackground,
  },
  headerView: {
    flex: 1.5,
  },
});
