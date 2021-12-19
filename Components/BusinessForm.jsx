import React, { useState, useEffect } from "react";
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,TextInput, Dimensions,Image,} from "react-native";

import {AntDesign,Feather,EvilIcons,FontAwesome,} from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import colors from "../utility/colors";
import { FoodFindContext } from "../context";
import { emailValid, passValid } from '../utility/validations';
import { insertBusinessUser, UploadImage } from "../api/BusinessUsersController";
import * as ImagePicker from "expo-image-picker";

const windowWidth = Dimensions.get("window").width;

const BusinessForm = () => {

  const { user } = React.useContext(FoodFindContext);
  const [data, setData] = useState({
    userID: user ? user.userID : "",
    password: "",
    businessName: "",
    businessEmail: user ? user.email : "",
    businessPhone: "",
    businessLicense: "",
    businessAddress: "",
    businessStatus: 1,
    businessLogo: "",
    menuImage: "",
    businessDescription: "",
    isValidPass: true,
    secureTextEntry: true,
  });
  const [imageUrl, setImageUrl] = useState('');

  //check if password is valid
  const handlePasswordChange = (val) => {
    if (passValid(val))
      setData({
        ...data,
        password: val,
        isValidPass: true,
      })
    else {
      setData({
        ...data,
        password: val,
        isValidPass: false
      })

    }
  }
  //click on icon and see the pasword 
  const updateSecureTextEntry = (val) => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  //open gallery and pick a image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
      base64: true
    });


    if (!result.cancelled) {
      let imageObj = {
        name: user.userID,
        folder: "businessUser",
        base64: result.base64
      }
      let res = await UploadImage(imageObj);
      if (res !== "") {
        setImageUrl(res);
        setData({ ...data, businessLogo: res })
      }
    }
  };
  // check if you granted the open gallery
  const HandleUploadImage = () => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("אנא אפשר גישה על מנת להעלות תמונה");
        }
        else {
          pickImage();
        }
      }
    })();
  };

  // function to render the image every time when the page loaded or get the default image
  const renderUserImage = () =>
    imageUrl ?
      { uri: `${imageUrl}?date=${Date.now()}` }
      : { uri: `http://proj14.ruppin-tech.co.il/uploads/foodFindDefaultLogo.png` };


// check if all data is not empty and is valid to insert business user to database
  const handleRegisterBusinessUser = async () => {
    try {
      if (user.userID === null || !data.isValidPass) {
        alert("אחד או יותר מהשדות אינם נכונים")
      }
      if (data.businessName === "" || data.businessPhone === "" || data.businessLicense === "" ||
        data.businessAddress === "")
        alert("אחד או יותר מהשדות ריקים");
      const returnBU = await insertBusinessUser(data);
      if (returnBU === "Conflict") {
        alert("רשום בעל עסק אם אותו מייל")
        return;
      }
      if (returnBU !== null && returnBU !== undefined && returnBU !== "Conflict") {
        alert('נרשמת בהצלחה!!!')
        navigation.navigate('Home')
      }
    }
    catch (error) {
      console.log(error);
    }
  }

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
        <TextInput style={styles.textInput}
          value={data.businessEmail}
        />
      </View>

      <Text>סיסמא</Text>
      <View style={styles.action}>
        <AntDesign name="lock" size={24} color="black" />
        <TextInput
          secureTextEntry={data.secureTextEntry}
          style={styles.textInput}
          onChangeText={(val) => handlePasswordChange(val)}
          onEndEditing={() => { if (data.password.length === 0) setData({ ...data, isValidPass: true }); }}
        />
        <TouchableOpacity onPress={updateSecureTextEntry}>
          {data.secureTextEntry ?
            <Feather name="eye-off" color="green" size={20} />
            :
            <Feather name="eye" color="green" size={20} />}
        </TouchableOpacity>
      </View>
      {data.isValidPass ? null :
        <Animatable.View animation="fadeInLeft" duration={100}>
          <Text style={styles.errorMsg}>password must be 8 characters</Text>
        </Animatable.View>
      }
      <Text>שם עסק</Text>
      <View style={styles.action}>
        <AntDesign name="user" size={24} color="black" />
        <TextInput style={styles.textInput}
          onChangeText={(val) => setData({ ...data, businessName: val })}
        />
      </View>
      <Text>ת.ז / ח"פ</Text>
      <View style={styles.action}>
        <AntDesign name="idcard" size={24} color="black" />
        <TextInput style={styles.textInput}
          onChangeText={(val) => setData({ ...data, businessLicense: val })}
        />
      </View>
      <Text>טלפון עסק</Text>
      <View style={styles.action}>
        <AntDesign name="phone" size={24} color="black" />
        <TextInput keyboardType="numeric" style={styles.textInput}
          onChangeText={(val) => setData({ ...data, businessPhone: val })}
        />
      </View>
      <Text>כתובת עסק</Text>
      <View style={styles.action}>
        <EvilIcons name="location" size={30} color="black" />
        <TextInput style={styles.textInput}
          onChangeText={(val) => setData({ ...data, businessAddress: val })}
        />
      </View>
      <Text>תיאור עסק</Text>
      <View style={styles.action}>
        <AntDesign name="file1" size={24} color="black" />
        <TextInput style={styles.textInput}
          onChangeText={(val) => setData({ ...data, businessDescription: val })}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          padding: 5,
        }}
      >
        <Text>תמונת עסק</Text>
        <FontAwesome onPress={HandleUploadImage} name="image" size={40} color="black" />

        {imageUrl ?
          <Image style={styles.image} source={renderUserImage()} />
          : <Text></Text>}
      </View>

      <TouchableOpacity style={styles.signUpBtn} onPress={handleRegisterBusinessUser}>
        <Text style={styles.btnTxt}>הרשם</Text>
      </TouchableOpacity>

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
    borderRadius: 8,
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
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  image: {
    width: 300,
    height: 280,

  },

});
