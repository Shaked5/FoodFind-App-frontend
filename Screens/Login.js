import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../utility/colors';
import { FoodFindContext } from '../context';
import * as Google from "expo-google-app-auth";
import * as Facebook from 'expo-facebook';
import { storeAsyncStorageData } from '../utility/storage';
import FoodFindLogo from '../assets/foodFindLogoSmall.png';
import { insertNewUser } from '../api/UserController';
import Constants from 'expo-constants';
import * as Notifications  from 'expo-notifications';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const Login = ({ navigation, route }) => {
  const { fromCart } = route.params;
  const { user, setUser } = React.useContext(FoodFindContext);
  const [pushToken, setPushToken] = useState('')
  const [data, setData] = React.useState({
    name: '',
    email: '',
    pushToken: '',
  })

  const registerForPushNotificationsAsync = async () => {
    if(Constants.isDevice){
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
  
      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
  
      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return;
      }
  
      
        // Get the token that uniquely identifies this device
        let token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("token=", token);
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        setPushToken(token);
      
    }else
    alert('Must use physical device for push notifications');
  };

  //config for login with google Androind && IOS
  const config = {
    androidClientId: '749131361216-0hfddk09s5thaondf0l1kdj82kco8m41.apps.googleusercontent.com',
    iosClientId: '749131361216-mf1lpcnvjm91vl04r3do4srlmvru3dhu.apps.googleusercontent.com',
  }

  //login with facebook get picture email and name
  const signInWithFacebookAsync = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '875604826712410',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name and email using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
        const res = await response.json();
        await insertNewUser({
          userName: res.name,
          userEmail: res.email,
          pushToken: pushToken
        })
        setUser(res)
        storeAsyncStorageData('user', res)
        fromCart === true ? navigation.goBack() : navigation.navigate('Home');
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  //login with google get picture email and name
  const signInWithGoogleAsync = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync(config);
      //if login success
      if (type === 'success') {
        const ifUserExist = await insertNewUser({
          userName: user.name,
          userEmail: user.email,
          pushToken: pushToken
        })
        if (ifUserExist === "Conflict") {
          console.log('email already exist');
        }

        setUser(user);
        storeAsyncStorageData('user', user)
        fromCart === true ? navigation.goBack() : navigation.navigate('Home');

      } else {
        console.log('error')
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <View style={styles.mainWrraper} width={windowWidth} height={windowHeight}>
      <View style={styles.header}>
        <Image source={FoodFindLogo} style={styles.ImageFoodfind} width={180} height={70} />
      </View>

      <View style={styles.title}>
        <Text style={styles.titleTxt}>התחברות</Text>
      </View>
      <View style={styles.buttonsWrapper}>

        <TouchableOpacity style={styles.button} onPress={signInWithFacebookAsync}>

          <FontAwesome5 name="facebook" size={30} color={colors.facebookBlue} />
          <Text style={styles.txtFaceBook}>באמצעות פייסבוק</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={signInWithGoogleAsync}>
          <FontAwesome5 name="google-plus" size={30} color="red" />
          <Text style={styles.txtGoogle}>באמצעות גוגל</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  mainWrraper: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    backgroundColor: colors.backgroundApp,
    flexDirection: 'row',
    width: '100%',
    height: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.33,
    shadowRadius: 3.62,

    elevation: 10,
  },
  ImageFoodfind: {
    marginTop: '6%',

  },
  title: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',


  },
  titleTxt: {
    fontSize: 35,
    marginTop: '20%',
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: '15%',
    backgroundColor: colors.greyBackground,

  },

  button: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row-reverse',
    color: 'blue',
    borderWidth: 2,
    borderRadius: 25,
    margin: '3%',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 6,

  },
  txtFaceBook: {
    fontWeight: 'bold',
    color: colors.facebookBlue,
    paddingLeft: '22.5%',
  },
  txtGoogle: {
    fontWeight: 'bold',
    color: colors.danger,
    paddingLeft: '30%',
  },

})
