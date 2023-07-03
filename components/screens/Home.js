import React, { useState, useRef,useContext, useEffect } from 'react';
import {
    SafeAreaView, ScrollView, View, Animated, StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image, FlatList, ActivityIndicator
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element'
import { Surface, Text } from 'react-native-paper'
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SweetAlert from 'react-native-sweet-alert';
import AppHeader from './MyHeader';
import Colors from "../../constants/Colors"
import { images } from "../../constants"
import { AuthContext } from '../../context/AuthContext';
import { API_URL, API_TOKEN } from "@env"
//import { Item } from 'react-native-paper/lib/typescript/src/components/List/List';
const Home = ({ navigation }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const offsetAnim = useRef(new Animated.Value(0)).current;
    const [focused, setFocused] = useState('home');
    const [isLoadIcon, SetIsLoadIcon] = useState(false);
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([])
    const [pro, setPro] = useState([]);
    useEffect(() => {
        console.log('USER -- '+user)
    }, []);
    //Animated Header
    const clampedScroll = Animated.diffClamp(
        Animated.add(
            scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }),
            offsetAnim,
        ),
        0,
        CONTAINER_HEIGHT
    )
    var _clampedScrollValue = 0;
    var _offsetValue = 0;
    var _scrollValue = 0;
    useEffect(() => {
        scrollY.addListener(({ value }) => {
            const diff = value - _scrollValue;
            _scrollValue = value;
            _clampedScrollValue = Math.min(
                Math.max(_clampedScrollValue + diff, 0),
                CONTAINER_HEIGHT,
            )
        });
        offsetAnim.addListener(({ value }) => {
            _offsetValue = value;
        })
    }, []);

    var scrollEndTimer = null;
    const onMomentumScrollBegin = () => {
        clearTimeout(scrollEndTimer)
    }
    const onMomentumScrollEnd = () => {
        const toValue = _scrollValue > CONTAINER_HEIGHT &&
            _clampedScrollValue > (CONTAINER_HEIGHT) / 2
            ? _offsetValue + CONTAINER_HEIGHT : _offsetValue - CONTAINER_HEIGHT;

        Animated.timing(offsetAnim, {
            toValue,
            duration: 500,
            useNativeDriver: true,
        }).start();


    }
    const onScrollEndDrag = () => {
        scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);

    }

    const headerTranslate = clampedScroll.interpolate({
        inputRange: [0, CONTAINER_HEIGHT],
        outputRange: [0, -CONTAINER_HEIGHT],
        extrapolate: 'clamp',
    })
    const opacity = clampedScroll.interpolate({
        inputRange: [0, CONTAINER_HEIGHT - 20, CONTAINER_HEIGHT],
        outputRange: [1, 0.05, 0],
        extrapolate: 'clamp',
    })
    const bottomTabTranslate = clampedScroll.interpolate({
        inputRange: [0, CONTAINER_HEIGHT],
        outputRange: [0, CONTAINER_HEIGHT * 2],
        extrapolate: 'clamp',
    })
    //Animated Header

    const [products, setProducts] = useState([]);
    
    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    const [i, setI] = useState(4);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_URL}/api/Product/AdminGetAll`)
            const da = await res.json();
            setPro(da);
        }
        )()
    }, []);


    const fomatTime = (day) => {
        var msDiff = new Date().getTime() - new Date(day).getTime();    //Future date - current date
        var diff = Math.floor(msDiff / (1000 * 60 * 60 * 24));
        if (msDiff < 60000) {
            return (Math.round(msDiff / 1000) + " giây trước");
        } else {
            if (msDiff < 3600000)
                return (Math.round(msDiff / 60000) + " phút trước");
            else {
                if (msDiff < 3600000 * 24)
                    return (Math.round(msDiff / 3600000) + " giờ trước");
                else {
                    return (Math.round(msDiff / (3600000 * 24)) + " ngày trước");
                }
            }
        }
           
    }
    //useEffect(() => {
    //    getDataFromDB(4);
    //   // const res = await fetch('https://provinces.open-api.vn/api/d/')
    //   // const da = await res.json();
    //   // setData(da.filter(i=>i.province_code==92))
    //   //// data.filter(item => item.province_code == 92);
    //   //// console.log(da);
    //    console.log(API_URL);
    //}, []);
    //useEffect(() => {
    //    const unsubscribe = navigation.addListener('focus', () => {
    //        getDataFromDB(i);
    //    });
    //    //setI(4)
    //    return unsubscribe;
    //}, []);

    //get data from DB

    const getDataFromDB = (i) => {
        SetIsLoadIcon(!isLoadIcon)
        let productList = [];
        let accessoryList = [];
        for (let index = 0; index < i; index++) {

            productList.push(Items[index]);
            setProducts(productList); 
        }
        SetIsLoadIcon(!isLoadIcon)

    };
    useEffect(() => {
        console.log(products.length)
    }, [products]);
    //create an product reusable card

    const ProductCard = ({ data }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductInfo', { productID: data.id })}
                style={{
                    width: '48%',
                    marginVertical: 3,
                    paddingBottom: 8,
                    borderRadius: 5,
                    backgroundColor: '#ffffff',
                    height: 300
                }}>
                <View
                    style={{
                        width: '100%',
                        height: 100,


                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 8,

                    }}>
                    {/*{data.isOff ? (*/}
                    {/*    <View*/}
                    {/*        style={{*/}
                    {/*            position: 'absolute',*/}
                    {/*            width: '20%',*/}
                    {/*            height: '24%',*/}
                    {/*            backgroundColor: COLOURS.green,*/}
                    {/*            top: 0,*/}
                    {/*            left: 0,*/}
                    {/*            borderTopLeftRadius: 10,*/}
                    {/*            borderBottomRightRadius: 10,*/}
                    {/*            alignItems: 'center',*/}
                    {/*            justifyContent: 'center',*/}
                    {/*        }}>*/}
                    {/*        <Text*/}
                    {/*            style={{*/}
                    {/*                fontSize: 12,*/}
                    {/*                color: COLOURS.white,*/}
                    {/*                fontWeight: 'bold',*/}
                    {/*                letterSpacing: 1,*/}
                    {/*            }}>*/}
                    {/*            {data.offPercentage}%*/}
                    {/*        </Text>*/}
                    {/*    </View>*/}
                    {/*) : null}*/}
                    <Image
                        source={{ uri: 'https://res.cloudinary.com/dqfyfxb2r/image/upload/v1688019060/' + (data.images.length>0?data.images[0].url :'ok_b7poza')+'.png'}}
                        style={{
                            width: '80%',
                            height: '80%',
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View style={{ height: '25%', justifyContent: 'center', paddingHorizontal: 10, }}>
                    <Text
                        style={{
                            fontSize: 12,
                            color: COLOURS.black,
                            fontWeight: '600',
                            marginBottom: 2,
                        }}>
                        {data.name}
                    </Text>
                    <Text></Text>
                </View>
                {/*{*/}
                {/*    data.isAvailable ? (*/}
                {/*        <View*/}
                {/*            style={{*/}
                {/*                flexDirection: 'row',*/}
                {/*                alignItems: 'center',*/}
                {/*                paddingHorizontal: 10*/}
                {/*            }}>*/}
                {/*            <FontAwesome*/}
                {/*                name="circle"*/}
                {/*                style={{*/}
                {/*                    fontSize: 12,*/}
                {/*                    marginRight: 6,*/}
                {/*                    color: COLOURS.green,*/}
                {/*                }}*/}
                {/*            />*/}
                {/*            <Text*/}
                {/*                style={{*/}
                {/*                    fontSize: 12,*/}
                {/*                    color: COLOURS.green,*/}
                {/*                }}>*/}
                {/*                Còn hàng*/}
                {/*            </Text>*/}
                {/*        </View>*/}
                {/*    ) : (*/}
                {/*        <View*/}
                {/*            style={{*/}
                {/*                flexDirection: 'row',*/}
                {/*                alignItems: 'center',*/}
                {/*                padding: 10*/}
                {/*            }}>*/}
                {/*            <FontAwesome*/}
                {/*                name="circle"*/}
                {/*                style={{*/}
                {/*                    fontSize: 12,*/}
                {/*                    marginRight: 6,*/}
                {/*                    color: COLOURS.red,*/}
                {/*                }}*/}
                {/*            />*/}
                {/*            <Text*/}
                {/*                style={{*/}
                {/*                    fontSize: 12,*/}
                {/*                    color: COLOURS.red,*/}
                {/*                }}>*/}
                {/*                Hết hàng*/}
                {/*            </Text>*/}
                {/*        </View>*/}
                {/*    )}*/}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 10
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: COLOURS.red,
                        }}
                    >đ{data.price.toLocaleString()}</Text>

                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10
                    }}
                >
                    < MaterialCommunityIcons
                        name="clock-outline"
                        style={{
                            fontSize: 20,
                            marginRight: 6,
                            color: COLOURS.green,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 12,
                            color: COLOURS.green,
                        }}>
                        {fomatTime(data.createdDate)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const [categories, setCategories] = useState([
        {
            name: 'Điện thoại',
            image: images.smartphone
        },
        {
            name: 'Laptop',
            image: images.laptop
        },
        {
            name: 'Máy tính bảng',
            image: images.ipad
        },
        {
            name: 'Smart Watch',
            image: images.smartwatch
        },
        {
            name: 'Tai nghe',
            image: images.headphone
        },
        {
            name: 'Loa',
            image: images.speaker
        }
    ]
    )
    const isLoad = (e) => {
        const scrollPosition = e.nativeEvent.contentOffset.y;
        const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
        const contentHeight = e.nativeEvent.contentSize.height;
        const isBot = scrollPosition + scrollViewHeight;
        if (isBot >= (contentHeight - 80)) {
            console.log('load: '+i);
            if (i < 17) {
                getDataFromDB(i + 4);
                setI(i + 4);
            }
        }
    }
    return (
        <View style={styles.container}
        >
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onMomentumScrollEnd={(e) => { onMomentumScrollEnd, isLoad(e) }}
                onScrollEndDrag={onScrollEndDrag}

                scrollEventThrottle={1}
            >
                <View style={{ height: 135, borderTopWidth: 1, paddingVertical: 10, borderColor: '#ddd', borderBottomWidth: 1, marginTop: 80, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>Khám phá danh mục</Text>
                    <FlatList
                        data={categories}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.name}
                        renderItem={
                            ({ item }) =>
                                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                                    <Image style={{ resizeMode: 'stretch', margin: 10, width: 50, height: 50 }} source={item.image} />
                                    <Text style={{ fontSize: 12 }}>{item.name}</Text>
                                </View>
                        }
                    >
                    </FlatList>
                </View>
                <View style={{ height: 10, backgroundColor: '#ddd' }}></View>
                <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 10
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: COLOURS.black,
                                fontWeight: '500',
                                letterSpacing: 1,
                            }}>
                            Tin mới đăng
                        </Text>

                        <Text
                            style={{
                                fontSize: 14,
                                color: COLOURS.black,
                                fontWeight: '400',
                                opacity: 0.5,
                                marginLeft: 10,
                            }}>
                            {products.length}
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: 14,
                            color: COLOURS.blue,
                            fontWeight: '400',
                        }}>
                        Xem tất cả
                    </Text>
                </View>
                <View
                    style={{
                        padding: 4,
                        backgroundColor: '#ddd'
                    }}>



                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',

                        }}>
                        {[...pro]
                            .sort((a, b) => b.id - a.id).map((data,index) => {
                            return <ProductCard data={data} key={index} />;
                        })}
                    </View>
                    {isLoadIcon ?
                        <ActivityIndicator size='large' color='black' /> : null
                    }
                </View>

            </Animated.ScrollView>
            <Animated.View style={[styles.view, { top: 15, transform: [{ translateY: headerTranslate }] }]}>
                <AppHeader
                    menu
                    title={"home"}
                    right="search"
                    style={[styles.header, { opacity }]}
                />
            </Animated.View>
            {/*<Animated.View style={[styles.view, { bottom: 0, transform: [{ translateY: bottomTabTranslate }] }]}>*/}
            {/*    <Surface style={[styles.rowContainer, styles.bottomBar]}>*/}
            {/*        <BottomTab navigation={navigation} />*/}
            {/*    </Surface>*/}
            {/*</Animated.View>*/}

        </View>
    )

};

const CONTAINER_HEIGHT = 50;
export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        bottom: 30,
        top: 10,
        backgroundColor: '#ffffff',
        paddingBottom: 70
    },
    view: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 10,
        height: CONTAINER_HEIGHT,
    },
    header: {
        borderRadius: 10,
        marginHorizontal: 7,

    },
    bottomBar: {
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        marginHorizontal: 4,
    },
    contentContainerStyle: {
        paddingTop: CONTAINER_HEIGHT,
        marginTop: 8,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    item: {
        marginHorizontal: 10,
        marginBottom: 12,
        elevation: 6,
        borderRadius: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
    },
    caption: {
        color: Colors.darkGray,
    },
    image: {
        height: 300,
        width: null,
        marginBottom: 1,
        marginHorizontal: 16,
        borderRadius: 16,
    },
    bottomView: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 16
    },
    content: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 16,
        paddingVertical: 8,
    },
    textContainer: {
        marginHorizontal: 16,
    },
    avatar: {
        height: 35,
        width: 35,
        borderRadius: 20,
        backgroundColor: Colors.primary,
    },
    rowView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    icon: {
        marginHorizontal: 10,
    },
})