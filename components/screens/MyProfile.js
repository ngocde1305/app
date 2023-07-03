import React, { useState,useContext, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
    Animated,
    ToastAndroid,
    Alert
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { images } from "../../constants"
import { icons } from "../../constants"
import { AuthContext } from '../../context/AuthContext';
import { API_URL } from "@env"
const MyProfile = ({ route, navigation }) => {
    const { user,userToken,logout } = useContext(AuthContext);
    //useEffect(() => {
    //    const unsubscribe = navigation.addListener('focus', () => {
    //        console.log('user:' + user)
    //        if (user==null) {
    //            navigation.navigate('Login');
    //        }
    //    });
    //    //setI(4)
    //    return unsubscribe;
    //}, [navigation, user,logout]);
    const [products, setProducts] = useState([]);
    const [markedProducts, setMarkedProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            (async () => {
                const resp = await fetch(`${API_URL}/api/Product/GetMarkedProduct`, {
                    method: "get",
                    headers: {
                        'Accept': 'text/plain',
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + userToken
                    },

                })
                const res = await resp.json();
                setMarkedProducts(res);
                console.log(res);
            })()
        });
        return unsubscribe;
    }, [navigation]);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            (async () => {
                const resp = await fetch(`${API_URL}/api/User/getMyProfile`, {
                    method: "get",
                    headers: {
                        'Accept': 'text/plain',
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + userToken
                    },

                })
                const res = await resp.json();
                setProducts(res.products);
                console.log(res);
            })()
        });
        return unsubscribe;
    }, [navigation]);
    const showConfirmDialog = () => {
        return Alert.alert(
            "Xác nhận",
            "Bạn có muốn đăng xuất?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        logout();
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };
    return (
        <ScrollView
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                backgroundColor: '#eeeeee',
                
            }}>
            <View style={{
                backgroundColor: '#ffffff',
                height: 200,
                padding:10
            }} >
                <View style={{
            
                    backgroundColor: '#ffffff',
                    height: 140,
                    flexDirection: 'row',
                    alignItems:'center'
                }} >
                    <View style={{ position: 'relative', height: 100, width: 100}}>
                        <Image source={images.baked_fries} style={{ borderRadius: 62, height:'100%', width: '100%' }} />
                        <View style={{ position: 'absolute', bottom: 5, right: 4,borderRadius:25,backgroundColor:'gray',padding:3 }}>
                            <MaterialCommunityIcons name="pencil" size={20} color="white"></MaterialCommunityIcons>
                        </View>
                    </View>

                    <View style={{ marginLeft: 15, justifyContent: 'space-between', }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 15 }}>{user}</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <Text style={{fontWeight:'600',fontSize:12}}>4.5</Text>
                            <Rating imageSize={17} readonly startingValue={3.5} style={{marginRight:5}}/>
                            <Text style={{ color: 'blue',fontSize:12}}>(13 lượt)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                            <Text style={{ fontSize: 8, fontWeight: '500',color:'#666', marginRight: 5 }}>Người theo dõi</Text>
                            <Text style={{ fontWeight: '600', fontSize: 10, marginRight: 5 }}>7604</Text>
                            <Text style={{ fontSize: 8, fontWeight: '500', color: '#666', marginRight: 5 }}>| Đang theo dõi</Text>
                            <Text style={{ fontWeight: '600', fontSize: 10, }}>43</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text style={{fontWeight:'700', marginVertical:10,marginLeft:10}}>Quản lý đơn hàng</Text>
            <View style={{
                backgroundColor: '#ffffff',
                height: 140,
                padding: 10,  
            }} >
                <View style={{ flexDirection: 'row', width: 160, marginBottom: 20, justifyContent: 'space-between'}}>
                    <FontAwesome name="shopping-basket" size={24} color="dodgerblue" style={{flex: 1}}></FontAwesome>
                    <Text style={{flex:3,fontWeight:'400',}}>Đơn mua</Text>
                </View>
                <View style={{ flexDirection: 'row', width: 160, marginBottom: 20, justifyContent: 'space-between' }}>
                    <FontAwesome name="list-alt" size={24} color="green" style={{flex:1}}></FontAwesome>
                    <Text style={{ flex: 3, fontWeight: '400', }}>Bài đăng ({products.length})</Text>
                </View>
                <View style={{ flexDirection: 'row', width: 160, marginBottom: 20, justifyContent: 'space-between' }}>
                    <MaterialCommunityIcons name="credit-card-outline" size={26} color="orange" style={{ flex: 1 }}></MaterialCommunityIcons>
                    <Text style={{ flex: 3, fontWeight: '400', }}>Ví điện tử</Text>
                </View>
            </View>
            <Text style={{ fontWeight: '700', marginVertical: 10, marginLeft: 10 }}>Tiện ích</Text>
            <View style={{
                backgroundColor: '#ffffff',
                height: 250,
                padding: 10,
                
            }} >
                <View style={{ flexDirection: 'row', width: 200, marginBottom: 20, justifyContent: 'space-between' }}>
                    <FontAwesome name="heart" size={24} color="deeppink" style={{ flex: 1 }}></FontAwesome>
                    <Text style={{ flex: 4, fontWeight: '400', }}>Tin đã lưu ({markedProducts.length })</Text>
                </View>
                <View style={{ flexDirection: 'row', width: 200, marginBottom: 20, justifyContent: 'space-between' }}>
                    <FontAwesome name="bookmark" size={24} color="dodgerblue" style={{ flex: 1 }}></FontAwesome>
                    <Text style={{ flex: 4, fontWeight: '400', }}>Tìm kiếm đã lưu</Text>
                </View>
                <View style={{ flexDirection: 'row', width: 200, marginBottom: 15, justifyContent: 'space-between' }}>
                    <FontAwesome name="star" size={24} color="gold" style={{ flex: 1 }}></FontAwesome>
                    <Text style={{ flex: 4, fontWeight: '400', }}>Đánh giá từ tôi</Text>
                </View>
                <TouchableOpacity
                    onPress={() => { showConfirmDialog()}}
                    style={{ flexDirection: 'row', width: 200, marginBottom: 15, justifyContent: 'space-between' }}>
                    <Ionicons name="log-out-outline" size={24} color="gray" style={{ flex: 1 }}/>
                    <Text style={{ flex: 4, fontWeight: '400', }}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default MyProfile;
