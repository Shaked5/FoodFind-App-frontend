import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";

import {
  AntDesign,
  Feather,
  EvilIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import colors from "../utility/colors";
import { FoodFindContext } from "../context";

import * as ImagePicker from "expo-image-picker";

const windowWidth = Dimensions.get("window").width;

const BusinessForm = () => {
  const { user } = React.useContext(FoodFindContext);
  const [data, setData] = useState({
    email: "",
    password: "",
    checkTextChange: false,
    secureTextEntry: true,
  });
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const HandleUploadImage = () => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("אנא אפשר גישה על מנת להעלות תמונה");
        }
      }
    })();
    pickImage();
  };

  return (
    <ScrollView style={styles.businessForm}>
      <View style={{ flex: 1, alignItems: "center", marginBottom: "10%" }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          הרשם עוד היום כבעל עסק אצלנו!
        </Text>
      </View>
      <Text>אימייל</Text>
      <View style={styles.action}>
        <AntDesign name="user" size={24} color="black" />
        <TextInput  style={styles.textInput} />
        <Feather name="check-circle" color="green" size={20} />
      </View>
      <Text>סיסמא</Text>
      <View style={styles.action}>
        <AntDesign name="lock" size={24} color="black" />
        <TextInput
          secureTextEntry={data.secureTextEntry}
          style={styles.textInput}
        />
        <Feather name="eye-off" color="green" size={20} />
      </View>
      <Text>שם עסק</Text>
      <View style={styles.action}>
        <AntDesign name="user" size={24} color="black" />
        <TextInput style={styles.textInput} />
      </View>
      <Text>ת.ז / ח"פ</Text>
      <View style={styles.action}>
        <AntDesign name="idcard" size={24} color="black" />
        <TextInput style={styles.textInput} />
      </View>
      <Text>טלפון עסק</Text>
      <View style={styles.action}>
        <AntDesign name="phone" size={24} color="black" />
        <TextInput keyboardType="numeric" style={styles.textInput} />
      </View>
      <Text>כתובת עסק</Text>
      <View style={styles.action}>
        <EvilIcons name="location" size={30} color="black" />
        <TextInput style={styles.textInput} />
      </View>
      <Text>תיאור עסק</Text>
      <View style={styles.action}>
        <AntDesign name="file1" size={24} color="black" />
        <TextInput style={styles.textInput} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: 5,
          padding: 5,
        }}
      >
        <Text>תמונת עסק</Text>
        <FontAwesome onPress={pickImage} name="image" size={40} color="black" />
        {image && (
          <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />
        )}
      </View>

      <TouchableOpacity style={styles.signUpBtn}>
        <Text style={styles.btnTxt}>הרשם</Text>
      </TouchableOpacity>
      <View style={{ margin: 30 }} />
    </ScrollView>
  );
};

export default BusinessForm;

const styles = StyleSheet.create({
  businessForm: {
    flex: 9,
    flexDirection: "column",
    margin: "3%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 3.62,
    elevation: 8,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyBackground,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 15,
  },
  signUpBtn: {
    flex: 1,
    marginTop: "10%",
    borderRadius: 30,
    padding: 20,
    backgroundColor: colors.backgroundApp,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
