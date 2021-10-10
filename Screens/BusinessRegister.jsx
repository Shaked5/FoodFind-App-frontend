import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BusinessForm from "../Components/BusinessForm";
import Header from "../Components/Header";
import colors from "../utility/colors";

const BusinessRegister = () => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
      <View style={styles.headerView}>
        <Header />
      </View>
      <View style={styles.containerBody}>
        <BusinessForm />
      </View>
      </KeyboardAwareScrollView>
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
