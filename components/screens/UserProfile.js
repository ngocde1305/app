import React, { useState, useEffect,useContext } from 'react';
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
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images, icons } from "../../constants"
import { AuthContext } from '../../context/AuthContext';
import { API_URL} from "@env"
const UserProfile = ({ route, navigation }) => {
    //const { user } = useContext(AuthContext);
    const { userID } = route.params;
    const [user, setUser] = useState();
    const [product, setProduct] = useState([])
    const [rate,setRate] = useState([
        {
            username: "Gia Cat Luong",
            image: images.avatar_3,
            rating: 4.5,
            comment:"cửa hàng uy tín"
        },
        {
            username: "Tao Thao",
            image: images.smartphone,
            rating: 5.0,
            comment:"Hàng chất lượng tốt"
        },
        {
            username: "Truong Phi",
            image: images.laptop,
            rating: 5.0,
            comment: "Haha"
        }
    ])
    const [showNew, setShowNew] = useState(true)
    const choose = () => {
        setShowNew(!showNew);
    }

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_URL}/api/User/getProfile?userId=${userID}`)
            const da = await res.json();
            console.log(da)
            setUser(da);
            setProduct(da.products);
        }
        )()
    }, []);
    const ProductIsShow = ({item}) => {
        return (
            <View style={{ flexDirection: 'row', padding: 5, borderBottomWidth: 1, borderBottomColor: '#666' }}>
                <Image source={item.image} style={{ flex: 1, resizeMode: 'stretch', height: 80, width: 80 }} />
                <View style={{ flex: 2, paddingLeft: 5 }}>
                    <Text style={{ fontSize: 12 }}>{item.name?item.name:null}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: 'red' }}>{item.price?item.price:null}đ</Text>
                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Text style={{ fontSize: 10, fontWeight: '400', color: 'gray' }}>hôm qua</Text>
                        <Ionicons size={20} color="red" name="heart-outline"></Ionicons>
                    </View>
                </View>
            </View>
        )
    }
    const ProductIsSaled = ({ item }) => {
        return (
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                <Text style={{ fontSize: 13, fontWeight: '600' }}>{item.name}</Text>
                <Text style={{ fontSize: 11, fontWeight: '400' }}>hôm qua</Text>
            </View>
        )
    }
    return (
        <ScrollView
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                backgroundColor: '#ddd',

            }}>

            <View style={{
                backgroundColor: '#ffffff',

                height: 280,
                position: 'relative',
            }} >
                
                <Image source={images.hawaiian_pizza} style={{ borderWidth: 1, borderColor: '#ddd', height: 200 }} />
                <View style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: 30,
                    left: 10,
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        position: 'relative',
                        height: 90,
                        width: 90,

                    }}>
                        <Image
                            source={{ uri: user?.avatarUrl ? user.avaterUrl : 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png' }}
                            style={{
                                borderColor: '#ddd',
                                height: '100%',
                                width: '100%',
                                borderRadius: 50,

                                backgroundColor: '#ddd'
                            }}
                        />

                        <View style={{
                            position: 'absolute',
                            bottom: 3,
                            right: 3
                        }} >
                            <Ionicons
                                name="ellipse"
                                style={{
                                    fontSize: 18,
                                    color: 'lime',
                                }}
                            />

                        </View>
                    </View>
                    <View
                        style={{
                            height: 40,
                            position: 'absolute',
                            bottom: 2,
                            right: 15,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <Ionicons name="ellipsis-horizontal" size={24}></Ionicons>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'green',
                                marginLeft: 20,
                                borderRadius: 10,
                                padding: 5,
                                flexDirection: 'row'
                            }}>
                            <FontAwesome name="plus" size={24} color='white'></FontAwesome>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: 'white', marginLeft: 5 }}>Theo dõi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.goBack('Home')} style={{
                    position: 'absolute', top: 20,
                    left: 2,
                } }>
                    <Entypo
                        name="chevron-left"
                        style={{
                            fontSize: 18,
                            color: COLOURS.backgroundDark,
                            padding: 12,
                            backgroundColor: COLOURS.white,
                            borderRadius: 10,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#ffffff', padding: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 5 }}>{user?.username?user.username:null}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Text style={{ fontWeight: '600', fontSize: 12, marginRight: 5 }}>5.0</Text>
                    <Rating imageSize={14} startingValue={5} readonly />
                    <Text style={{ fontSize: 12, color: 'blue', marginLeft: 5 }}>( 3426 đánh giá )</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ fontSize: 10, marginRight: 5 }}>Người theo dõi</Text>
                    <Text style={{ fontWeight: '600', fontSize: 10, marginRight: 5 }}>7604</Text>
                    <Text style={{ fontSize: 10, marginRight: 5 }}>| Đang theo dõi</Text>
                    <Text style={{ fontWeight: '600', fontSize: 10, }}>43</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <MaterialCommunityIcons name="chat-processing-outline" size={24}></MaterialCommunityIcons>
                    <Text style={{ fontSize: 12, color: '#666', marginLeft: 5 }}>Phản hồi chat:</Text>
                    <Text style={{ fontSize: 12, marginLeft: 5 }}>Hên xui</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <MaterialCommunityIcons name="calendar-month-outline" size={24}></MaterialCommunityIcons>
                    <Text style={{ fontSize: 12, color: '#666', marginLeft: 5 }}>Đã tham gia:</Text>
                    <Text style={{ fontSize: 12, marginLeft: 5 }}>23/05/2019</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <MaterialCommunityIcons name="check-circle-outline" size={24}></MaterialCommunityIcons>
                    <Text style={{ fontSize: 12, color: '#666', marginLeft: 5 }}>Đã xác thực:</Text>
                    <Image
                        source={icons.facebook}
                        style={{ resizeMode: 'stretch', tintColor: '#ddd', height: 24, width: 24, }}
                    />
                    <Image
                        source={icons.google}
                        style={{ resizeMode: 'stretch', tintColor: null, height: 24, width: 24, marginLeft: 10 }}
                    />

                    <Image
                        source={icons.zalo}
                        style={{ resizeMode: 'stretch', tintColor: '#ddd', height: 24, width: 24, marginLeft: 10 }}
                    />

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <MaterialCommunityIcons name="map-marker-outline" size={24}></MaterialCommunityIcons>
                    <Text style={{ fontSize: 12, color: '#666', marginLeft: 5 }}>Địa chỉ:</Text>
                    <Text style={{ fontSize: 12, marginLeft: 5 }}>Phòng 01A, nhà trọ Huỳnh Trâm</Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#ffffff', height: 400, padding: 10, marginTop: 20 }}>
                <View style={{ flexDirection: 'row', height: 60 }}>
                    <TouchableOpacity onPress={!showNew ? choose : null} style={{ flex: 1, borderBottomWidth: 4, alignItems: 'center', justifyContent: 'center', borderBottomColor: showNew ? 'red' : 'white' }}>
                        <Text style={{ fontSize: showNew ? 14 : 12, fontWeight: '400', color: showNew ? 'black' : 'gray' }}>Đang hiển thị ( {product.length} )</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showNew ? choose : null} style={{ flex: 1, borderBottomWidth: 4, alignItems: 'center', justifyContent: 'center', borderBottomColor: !showNew ? 'red' : 'white' }}>
                        <Text style={{ fontSize: !showNew ? 14 : 12, fontWeight: '400', color: !showNew ? 'black' : 'gray' }}>Đã bán ( {product.length} )</Text>
                    </TouchableOpacity>
                </View>
                {
                    showNew &&
                    <View style={{ marginTop: 10 }}>
                        {product.map((item,index) => {
                            return <ProductIsShow item={item} key={index} />
                        })}
                        <TouchableOpacity style={{ alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'blue',fontSize:12 }}>Xem thêm</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    !showNew &&
                    <View style={{ marginTop: 10, }}>
                            {product.map((item, index) => {
                            return <ProductIsSaled item={item} key={index} />
                        })}
                        <TouchableOpacity style={{ alignItems: 'center',marginTop:10 }}>
                            <Text style={{ color: 'blue', fontSize: 12 }}>Xem thêm</Text>
                        </TouchableOpacity>
                    </View>
                }

            </View>
            <View style={{ backgroundColor: '#ffffff', height: 600, padding: 10, marginTop: 20 }}>
                <Text style={{ fontWeight: '600', marginBottom: 30 }}>Đánh giá</Text>
                {rate.map((item,index) => {
                    return <View key={index} style={{marginBottom:10,borderBottomWidth:1,borderBottomColor:'gray'} }>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Image source={item.image} style={{ width: 30, height: 30, borderRadius: 20 }} />
                            <Text style={{ fontSize: 12, marginLeft: 10 }}>{item.username}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-start', flexDirection: 'row', paddingLeft: 40 }}>
                            <Rating imageSize={14} startingValue={item.rating} readonly />
                            <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 10 }}>{item.rating}</Text>
                        </View>
                        <Text style={{ fontSize: 12, marginLeft: 40 }}>{item.comment}</Text>
                    </View>
                }
                )} 
            </View>
        </ScrollView>
    );
};

export default UserProfile;
