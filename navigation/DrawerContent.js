import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Alert, useColorScheme } from 'react-native';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableOpacity, Switch, TouchableRipple } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { FoodFindContext } from '../context';
import { retrieveAsyncStorageData, removeAsyncStorageData } from '../utility/storage';

import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export const DrawerContent = (props) => {
    const { user, setUser, isDarkTheme, setIsDarkTheme } = React.useContext(FoodFindContext);
    const navigation = useNavigation();
    const [greet, setGreeting] = React.useState("");

    const scheme = useColorScheme();

    const toggleTheme = () => {
        if (isDarkTheme) {
            setIsDarkTheme(!isDarkTheme);
        }
        setIsDarkTheme(!isDarkTheme);
    }
    const getUserAsyncStorage = async () => {
        const user = await retrieveAsyncStorageData("user");
        if (user !== undefined && user !== null) setUser(user);
    }

    const handleLogOut = async () => {
        navigation.navigate('Home')
        if (user !== undefined && user !== null) {
            await setUser(null);
        } 
        removeAsyncStorageData('user')
        
    }

    const _handleSetGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 6 && hour <= 12) setGreeting("בוקר טוב");
        else if (hour >= 13 && hour <= 16) setGreeting("צהריים טובים");
        else if (hour >= 17 && hour <= 18) setGreeting("אחר צהריים טובים");
        else if (hour >= 19 && hour < 24) setGreeting("ערב טוב");
        else setGreeting("לילה טוב");
      };

    const getProfilePic = () => {
        if (user !== undefined && user !== null) {
            if (user.photoUrl !== null && user.photoUrl !== undefined) {
                return user.photoUrl;
            } else
                return `https://graph.facebook.com/${user.id}/picture?type=small&width=250&height=250`
        }
        else
            return 'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
    }

    useEffect(() => {
        getUserAsyncStorage();
        _handleSetGreeting();
    }, []);


    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View >
                     
                    </View>
                    <View style={styles.userInfoSection}>
                        <View style={styles.containerProfile}>
                            <Avatar.Image source={{ uri: getProfilePic() }}
                                size={110}
                            />
                            <View style={styles.containerUserTitle}>
                                <Title style={styles.title}>{`${greet}, ${user ? user.name : 'אורח'}`}</Title>
                            </View>

                        </View>

                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons name="home-outline"
                                    size={size}
                                    color={color}
                                />
                            )}
                            label="ראשי"
                            onPress={() => navigation.navigate('Home')}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="insert-invitation"
                                    size={size}
                                    color={color}
                                />
                            )}
                            label="ההזמנות שלי"
                            onPress={() => { user ? navigation.navigate('UserOrders') : navigation.navigate('Login',{fromCart:false}) }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome name="pencil-square-o"
                                    size={size} color={color} />
                            )}
                            label="הרשם כבעל עסק"
                            onPress={() => { user ? navigation.navigate('BusinessRegister') : navigation.navigate('Login',{fromCart:false}) }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="העדפות">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text>ערכת נושא כהה</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            
            <Drawer.Section style={styles.bottomDrawerSection}>
            {user===null||user===undefined?<Text></Text>:
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="התנתק"
                    onPress={handleLogOut}
                />
            }
            </Drawer.Section>
            
        </View>
    )
}
export default DrawerContent;


const styles = StyleSheet.create({

    drawerContent: {
        flex: 1,

    },
    userInfoSection: {
        paddingLeft: 20,
    },
    containerProfile: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

    },
    timeView: {
        justifyContent: 'center', alignItems: 'center', marginBottom: 15
    },
    containerUserTitle: {
        flexDirection: 'column',
        marginLeft: 15,
    },
    title: {
        fontSize: 16,
        marginTop: 15,
        fontWeight: 'bold',
    },

    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },

    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

})