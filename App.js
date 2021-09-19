import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, useColorScheme } from 'react-native';
import { FoodFindProvider } from './context';
import Login from './Screens/Login'
import MainNavigator from './navigation/MainNavigator'
import Home from './Screens/Home';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { FoodFindContext } from './context';


export default function App() {
  const { isDarkTheme } = React.useContext(FoodFindContext);

  const MyDarkTheme = {
    dark: true,
    colors: {
      primary: "#9933FF",
      background: "#000023",
      card: "#000028",
      border: "#000028",
      notification: "#9933FF",
    }
  };

  // const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  // const themeContainerStyle =
  //   colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  return (
    <FoodFindProvider>
      {/* <View style={styles.container, themeContainerStyle,themeTextStyle} > */}
      <NavigationContainer theme={isDarkTheme ? MyDarkTheme : DefaultTheme}>
        <MainNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
      {/* </View> */}
    </FoodFindProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});
