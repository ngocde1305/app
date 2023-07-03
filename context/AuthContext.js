import React,{ createContext, useState, useRef, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
    Alert
} from 'react-native';
import { API_URL } from "@env"
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loginState, setLoginState] = useState(false);
    const register = async (data) => {
        //const data = {
        //    username: username,
        //    email:email,
        //    password: password,
        //    confirmPassword:confirmPassword
        //}
        const resp = await fetch(`${API_URL}/api/Auth/register`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await resp.json();
        console.log(res);
        Alert.alert("Đăng ký thành công", "Đăng nhập để tiếp tục ", [{ text: "OK" }], {
            cancelable: true,
        });
        navigation.goBack();

    }
    const login = async(username, password, navigation) => {
        setIsLoading(true);
        let status = '';
        const data = {
            username: username,
            password: password
        }
        const resp = await fetch(`${API_URL}/api/Auth/login`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await resp.json();
        console.log(res);
        if (res.isSuccess == true) {
            setUser(username)
            setUserToken(res.token)
            AsyncStorage.setItem('username',username);
            AsyncStorage.setItem('userToken', res.token);
            Alert.alert("Đăng nhập thành công", "Chào "+username, [{ text: "OK" }], {
                cancelable: true,
            });
            navigation.goBack();
            
        } 
        status = res.message
        return status;
    }
    const logout = () => {
        setUserToken(null);
        setUser(null);
        setIsLoading(true);
        AsyncStorage.removeItem('username');
        AsyncStorage.removeItem('userToken');
        
    }
    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            let user = await AsyncStorage.getItem('username');
            setUserToken(userToken);
            setUser(user);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
        
    }
    useEffect(() => {
        isLoggedIn();
    }, [])
    const markProduct = async (id, navigation) => {
        let status = false;
        if (userToken) {
            const resp = await fetch(`${API_URL}/api/Product/mark/${id}`, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },

            })
            const res = await resp.json();
            console.log(res);
            if (res.isSuccess == true) {
                status = true;
            }

        } else {
            Alert.alert(
                "Bạn cần đăng nhập để sử dụng tính năng này",
                "Bạn có muốn đăng nhập?",
                [
                    // The "Yes" button
                    {
                        text: "Yes",
                        onPress: () => {
                            navigation.navigate('Login')
                        },
                    },
                    // The "No" button
                    // Does nothing but dismiss the dialog when tapped
                    {
                        text: "No",
                    },
                ]
            );
        }
        return status;
        
    }

    const removeMarkProduct = async (id) => {
        let status = false;
        if (userToken) {
            const resp = await fetch(`${API_URL}/api/Product/RemoveMark/${id}`, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },

            })
            const res = await resp.json();
            console.log(res);
            if (res.isSuccess == true) {
                status = true;
            }
        }
        return status;
        //if (res.isSuccess) {
        //    Alert.alert("Đăng bán thành công", "Sản phẩm đã được đăng bán ", [{ text: "OK" }], {
        //        cancelable: true,
        //    });
        //}
    }
    const isMarkProduct = async (id) => {
        let isMark = false;
        if (userToken) {
            console.log('USERtoken'+userToken);
            const resp = await fetch(`${API_URL}/api/Product/GetMarkedProduct`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },

            })
            const res = await resp.json();
            // console.log(res);

            res.map((e) => {
                if (e.id === id) {
                    isMark = true;
                }
            })
        } else {
            Alert.alert("Chua dang nhap", "Chào ", [{ text: "OK" }], {
                cancelable: true,
            });
        }
        return isMark;
    }

//    useEffect(() => {
//        if (userToken) {
//            // If login navigated back to us with a nextAction, complete it now
//            if (nextAction === CallbackActions.ADD_FAVORITE) addFavorite();
//        } else {
//            navigation.navigate(NavigationScreens.LoginScreen, {
//                nextAction: CallbackActions.ADD_FAVORITE, // Send some data to the login screen
//            });
//        }
//    }, []);
//};

    return (
        <AuthContext.Provider value={{login,register,logout,userToken,user,loginState,isMarkProduct, markProduct,removeMarkProduct}}>
            {children }
        </AuthContext.Provider>
    )
}
