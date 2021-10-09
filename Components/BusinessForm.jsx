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
    email: user.email,
    password: "",
    businessName: "",
    businessLicense: "",
    businessPhone: "",
    businessAddress: "",
    businessDescription: "",
    businessImg: "",
    isValidPass: true,
    isValidEmail: false,
    secureTextEntry: true,
  });
  const [image, setImage] = useState(null);

  // const emailTextInputChange = (val) => {
  //   if (val.length !== 0) {
  //     setData({
  //       ...data,
  //       email: val,
  //       checkTextChange: true,
  //     });
  //   }
  //   else {
  //     setData({
  //       ...data,
  //       email: val,
  //       checkTextChange: false,
  //     })
  //   }
  // }

  const handleEmailChange = (val) => {
    if (emailValid(val)) {
      setData({
        ...data,
        isValidEmail: true,
      })
    }
    else {
      setData({
        ...data,
        isValidEmail: false,
      })
    }
  }

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

  handleRegisterBusinessUser = async() => {
    console.log('data', data);
    if (user.userID !== null && data.isValidPass )
      var businessUser =await insertBusinessUser({
        userID: user.userID, password: data.password,businessName: data.businessName,
        businessEmail: user.email, businessPhone: data.businessPhone,businessLicense:data.businessLicense,
        businessAddress: data.businessAddress,
        businessLogo: image.uri,menuImage:null, businessDescription: data.businessDesc
      })
    console.log('businessUser', businessUser);
    if (businessUser !== null && businessUser !== undefined) {
      alert('נרשמת בהצלחה!!!')
    }
    else {
      alert("אחד או יותר מהשדות אינם נכונים")
      return;
    }
  }
  console.log('userID:', user.userID)
  console.log('user', user);
  console.log(data.isValidEmail);
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
          // onChangeText={(val) => emailTextInputChange(val)}
          onChangeText={(val) => handleEmailChange(val)}
          value={data.email}
        />

        {data.isValidEmail ?
          <Animatable.View
            animation='bounceIn'

          >
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View>
          : null}
      </View>
      {data.isValidEmail && data.email === "" ? null :
        <Animatable.View animation="fadeInLeft" duration={100}>
          <Text style={styles.errorMsg}>incorrect email</Text>
        </Animatable.View>
      }
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
