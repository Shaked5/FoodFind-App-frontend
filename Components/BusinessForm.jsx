import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
import * as Animatable from 'react-native-animatable';
import colors from "../utility/colors";
import { FoodFindContext } from "../context";
import { emailValid, passValid } from '../utility/validations';
import { insertBusinessUser } from "../api/BusinessUsersController";
import * as ImagePicker from "expo-image-picker";

const windowWidth = Dimensions.get("window").width;

const BusinessForm = () => {

  const { user } = React.useContext(FoodFindContext);
  const [data, setData] = useState({
    userID: user.userID,
    password: "",
    businessName: "",
    businessEmail: user.email,
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
  const [image, setImage] = useState(null);


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

  const updateSecureTextEntry = (val) => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

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
      setData({ ...data, businessLogo: image });

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
        else {
          pickImage();
        }
      }
    })();
  };

  const handleRegisterBusinessUser = async () => {
    try {
      if (user.userID === null || !data.isValidPass) {
        alert("אחד או יותר מהשדות אינם נכונים")
      }
      if (data.businessName === "" || data.businessPhone === "" || data.businessLicense === "" ||
        data.businessAddress === "")
        alert("אחד או יותר מהשדות ריקים");
      const returnBU = await insertBusinessUser(data);
      console.log('businessUser', returnBU);
      if (returnBU === "Conflict")
        alert("רשום בעל עסק אם אותו מייל")
      if (returnBU !== null && returnBU !== undefined && returnBU !== "Conflict") {
        alert('נרשמת בהצלחה!!!')
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    // <KeyboardAwareScrollView contentContainerStyle={styles.businessForm}>
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
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: 5,
          padding: 5,
        }}
      >
        <Text>תמונת עסק</Text>
        <FontAwesome onPress={HandleUploadImage} name="image" size={40} color="black" />
        {image && (
          <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />
        )}
      </View>

      <TouchableOpacity style={styles.signUpBtn} onPress={handleRegisterBusinessUser}>
        <Text style={styles.btnTxt}>הרשם</Text>
      </TouchableOpacity>
      <View style={{ margin: 30 }} />
    </ScrollView>
    // </KeyboardAwareScrollView>
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
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});
