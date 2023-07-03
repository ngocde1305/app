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
    TextInput,
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { images } from "../../constants"
import { icons } from "../../constants"
import { Pressable } from 'react-native';
import { API_URL } from "@env"
import { Video } from 'expo-av';
import { AuthContext } from '../../context/AuthContext';
const ProductInfo = ({ route, navigation }) => {
    const { markProduct,userToken, removeMarkProduct, isMarkProduct } = useContext(AuthContext);
    const { productID } = route.params;
    const [product, setProduct] = useState({});
    const [user, setUser] = useState()
    const [isSave, setIsSave] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const isSaveChange = () => {
        setIsSave(!isSave)
    }
    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_URL}/api/Product/AdminGetById/${productID}`)
            const da = await res.json();
            //console.log(da)
            setProduct(da.product);
            setUser(da.user);
            //console.log('da luu' +productID+await isMarkProduct(productID));
        }
        )()
    }, []);

    //useEffect(() => {
    //    (async () => {
    //        setIsSave(await isMarkProduct(productID))
    //    })()
        
    //},[])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            (async () => {
                console.log('IS RENDER' + await isMarkProduct(productID));
                setIsSave(await isMarkProduct(productID))
            })()
        });
        return unsubscribe;
    }, [navigation,userToken]);
    //useEffect(() => {
    //    console.log(product.images);
    //},[product])
    
    const mark = () => {
        (async () => {
            setIsSave(await markProduct(product.id, navigation))
        })()
    }
    const remove = () => {
        (async () => {
            setIsSave(!await removeMarkProduct(product.id, navigation))
        })()
    }
    const width = Dimensions.get('window').width;

    const scrollX = new Animated.Value(0);

    let position = Animated.divide(scrollX, width);
    //useEffect(() => {
    //    const unsubscribe = navigation.addListener('focus', () => {
    //        getDataFromDB();
    //    });

    //    return unsubscribe;
    //}, [navigation]);

    //get product data by productID

    const getDataFromDB = async () => {
        for (let index = 0; index < Items.length; index++) {
            //console.log(Items[index].rate)
            if (Items[index].id == productID) {
                await setProduct(Items[index]);
                return;
            }
        }
    };

    //add to cart

    const addToCart = async id => {
        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray);
        if (itemArray) {
            let array = itemArray;
            array.push(id);

            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                ToastAndroid.show(
                    'Đã thêm vào giỏ hàng',
                    ToastAndroid.SHORT,
                );
                navigation.navigate('Home');
            } catch (error) {
                return error;
            }
        } else {
            let array = [];
            array.push(id);
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                ToastAndroid.show(
                    'Item Added Successfully to cart',
                    ToastAndroid.SHORT,
                );
                navigation.navigate('Home');
            } catch (error) {
                return error;
            }
        }
    };

    //product horizontal scroll product card
    const renderProduct = ({ item, index }) => {
        return (
            <View
                style={{
                    width: width,
                    height: 240,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {!item.isVideo ?
                <Image
                    source={{ uri: 'https://res.cloudinary.com/dqfyfxb2r/image/upload/v1688019060/' + (item.url ? item.url : 'ok_b7poza') + '.png' }}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                    }}
                    /> :
                    <Video
                        source={{ uri: 'https://res.cloudinary.com/dqfyfxb2r/video/upload/v1686479033/' + (item.url ? item.url : 'ok_hdtjkn') + '.mov' }}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                        useNativeControls
                    />
                }
                
            </View>
        );
    };

    const PropsProduct = ({ icon, name, value })=>{
        return(
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20
        }}>
            <Image
                    style={{
                        resizeMode: 'stretch',
                        width: 24,
                        height: 24,
                        marginRight: 6,
                    }}
                    source={icon}
            />
            <Text
                style={{
                    fontSize: 14,
                    marginLelf: 6,
                    }}
                >
                    <Text style={{fontWeight:'500'}}>{name}</Text>: {value} </Text>
            </View>
            )
    }

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: COLOURS.white,
                position: 'relative',
            }}>
            <StatusBar
                backgroundColor={COLOURS.backgroundLight}
                barStyle="dark-content"
            />
            <ScrollView>
                <View
                    style={{
                        width: '100%',
                        backgroundColor: COLOURS.backgroundLight,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                       
                        
                    }}>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingTop: 16,
                            paddingLeft: 16,
                        }}>
                        <TouchableOpacity onPress={() => navigation.goBack('Home')}>
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
                    <FlatList
                        data={product.images?product.images : null}
                        horizontal
                        renderItem={renderProduct}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0.8}
                        snapToInterval={width}
                        bounces={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false },
                        )}
                    />
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 16,
                            marginTop: 32,
                        }}>
                        {product.images
                            ? product.images.map((data, index) => {
                                let opacity = position.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [0.2, 1, 0.2],
                                    extrapolate: 'clamp',
                                });
                                return (
                                    <Animated.View
                                        key={index}
                                        style={{
                                            width: '16%',
                                            height: 2.4,
                                            backgroundColor: COLOURS.black,
                                            opacity,
                                            marginHorizontal: 4,
                                            borderRadius: 100,
                                        }}></Animated.View>
                                );
                            })
                            : null}
                    </View>
                </View>
                <View
                    style={{
                        paddingHorizontal: 16,
                        marginTop: 6,
                        paddingBottom: 90
                    }}>
                    {/*<View*/}
                    {/*  style={{*/}
                    {/*    flexDirection: 'row',*/}
                    {/*    alignItems: 'center',*/}
                    {/*    marginVertical: 14,*/}
                    {/*  }}>*/}
                    {/*  <Entypo*/}
                    {/*    name="shopping-cart"*/}
                    {/*    style={{*/}
                    {/*      fontSize: 18,*/}
                    {/*      color: COLOURS.blue,*/}
                    {/*      marginRight: 6,*/}
                    {/*    }}*/}
                    {/*  />*/}
                    {/*  <Text*/}
                    {/*    style={{*/}
                    {/*      fontSize: 12,*/}
                    {/*      color: COLOURS.black,*/}
                    {/*    }}>*/}
                    {/*    Shopping*/}
                    {/*  </Text>*/}
                    {/*</View>*/}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginVertical: 4,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '600',
                                letterSpacing: 0.5,
                                marginVertical: 4,
                                color: COLOURS.black,
                                maxWidth: '84%',
                            }}>
                            {product.name}
                        </Text>
                        {/*<Ionicons*/}
                        {/*    name="link-outline"*/}
                        {/*    style={{*/}
                        {/*        fontSize: 24,*/}
                        {/*        color: COLOURS.blue,*/}
                        {/*        backgroundColor: COLOURS.blue + 10,*/}
                        {/*        padding: 8,*/}
                        {/*        borderRadius: 100,*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </View>
                    {/*<View style={{*/}
                    {/*    flexDirection: 'row',*/}
                    {/*    marginVertical: 4,*/}
                    {/*    alignItems: 'center',*/}
                    {/*    justifyContent: 'space-between',*/}
                    {/*}}>*/}
                    {/*    <Rating*/}
                    {/*        type='star'*/}
                    {/*        ratingCount={5}*/}
                    {/*        imageSize={50}*/}
                    {/*        fractions={2}*/}
                    {/*        startingValue={product.rate}*/}
                    {/*        readonly*/}
                    {/*    />*/}
                    {/*    <Text*/}
                    {/*        style={{*/}
                    {/*            fontSize: 24,*/}
                    {/*            fontWeight: '600',*/}
                    {/*            letterSpacing: 0.5,*/}
                    {/*            marginVertical: 4,*/}
                    {/*            color: COLOURS.black,*/}
                    {/*            maxWidth: '84%',*/}
                    {/*        }}*/}
                    {/*    >{product.rate}</Text>*/}
                    {/*</View>*/}

                    <View
                        style={{
                            flexDirection: 'row',
                            marginVertical: 10,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                letterSpacing: 0.5,
                                marginVertical: 4,
                                color: COLOURS.red,
                                maxWidth: '84%',
                            }}>
                            {product.price?.toLocaleString()} đ
                        </Text>
                        < TouchableOpacity
                            onPress={() => { isSave ? remove() : mark()} }
                            style={{
                            paddingHorizontal:4,
                            alignItems: 'center',
                            justifyContent: 'space-between', flexDirection: 'row',borderRadius:25, borderWidth: 1, borderColor: COLOURS.red}}>
                            <Text style={{
                                fontSize: 12,
                                color: COLOURS.red,
                                padding: 5,
                                borderRadius: 100,
                            }}>{isSave ? 'Đã lưu' : 'Lưu tin'} </Text>
                            <Ionicons
                                name={isSave ? "heart" : "heart-outline"}
                                style={{
                                    fontSize: 24,
                                    color: COLOURS.red,

                                    padding: 5,
                                    borderRadius: 100,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor:COLOURS.backgroundLight,height:1}}></View>

                    <View style={{
                            flexDirection: 'row',
                            marginVertical: 10,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                height: 70,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image
                                style={{
                                borderWidth: 1,
                                borderColor: '#ddd',
                                borderRadius: 25,
                                resizeMode: 'stretch',
                                width: 50,
                                height: 50
                                }}
                                source={{ uri: user?.avatarUrl ? user.avatarUrl :'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png'}}
                            />
                            <View style={{justifyContent:'space-between',marginLeft:5}}>
                                <Text style={{ fontSize: 13, fontWeight: '500', marginBottom: 6 }}>{user?.username}</Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        
                                    }}>
                                    <Ionicons
                                        name={user?.status ? "checkmark-circle-outline" : "ellipse" }
                                        style={{
                                            fontSize: 12,
                                            marginRight: 6,
                                            color: user?.status ? COLOURS.green : COLOURS.backgroundDark,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            color: user?.status ? COLOURS.green : COLOURS.backgroundDark,
                                        }}>
                                        {user?.status ?'Đang hoạt động':'Chưa hoạt động'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <Pressable
                            onPress={() => navigation.navigate('UserProfile', { userID: user.id })}
                            style={{
                            paddingHorizontal: 4,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            borderRadius: 25,
                            borderWidth: 1,
                            borderColor: COLOURS.green
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: COLOURS.green,
                                padding: 5,
                                borderRadius: 100,
                            }}>Xem trang</Text>
                            
                        </Pressable>
                    </View>

                    <Text
                        style={{
                            fontSize: 12,
                            color: COLOURS.black,
                            fontWeight: '400',
                            letterSpacing: 1,
                            lineHeight: 20,
                            marginBottom: 18,
                        }}>
                        {product.description}
                    </Text>
                    <View style={{ backgroundColor: COLOURS.backgroundLight, height: 1 }}></View>

                    <View style={{marginVertical:15}}>

                        {/*<PropsProduct icon={icons.checklist} name="Tình trạng" value={pro.status} />*/}

                        <PropsProduct icon={icons.tag} name="Thiết bị" value={product.category?.name ? product.category.name:null} />

                        <PropsProduct icon={icons.brand} name="Hãng" value={product.brand?.name?product.brand.name:null} />

                        {/*<PropsProduct icon={icons.barcode} name="Dòng" value={pro.name} />*/}
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <PropsProduct icon={icons.color} name="Màu" value={product.color?.colorName ? product.color?.colorName : null} />
                            <View style={{marginTop:20, width: 40, height: 20, backgroundColor: product.color?.hexValue ? product.color?.hexValue : null }}></View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: COLOURS.backgroundLight, height: 1,margin:15 }}></View>
                    <TouchableOpacity onPress={() => { setShowRating(true) }}>
                        <Text>Đánh giá</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    paddingLeft:15,
                    height: '10%',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flex: 1, flexDirection: 'row',
                    borderWidth: 1,
                   borderColor:'green',
                    backgroundColor:'#ffffff'
                }}>

                <View>
                    <FontAwesome name='phone' size={26} color="green"/>
                </View>

                <View >
                    <FontAwesome name='envelope' size={26} color="green" />
                </View>

                <Pressable onPress={() => navigation.navigate('Chat')}>
                    <FontAwesome name='wechat' size={26} color="green" />
                </Pressable>

                <View style={{ height: '100%', paddingHorizontal: 10, backgroundColor: 'green', justifyContent: 'center' }}>
                    <Text style={{fontSize:12,fontWeight:'700', color:'white'}}>Mua ngay-Đặt cọc</Text>
                </View>
            </View>
            
            <Modal style={{ justifyContent: 'center', alignItems: 'center' }} isVisible={showRating} backdropOpacity={0.2} onBackdropPress={() => { setShowRating(false) } }>
                {/*<ActivityIndicator size='large' color='black' />*/}
                <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>

                    <Rating imageSize={26} startingValue={3} onFinishRating={(e) => { console.log('rating'+e)} } />
                    <View
                        style={{ width: '70%', height: 200, borderColor: '#D5D5D5', margin: 20, borderRadius: 10, borderWidth: 1, justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 15 }}>
                        <TextInput
                            editable
                            multiline
                            numberOfLines={3}
                            maxLength={250}
                            placeholder="Bình luận"
                            
                        ></TextInput>
                    </View>
                    
                </View>
                
            </Modal>
        </View>
    );
};

export default ProductInfo;
