import React, { useState, useRef, useEffect,useContext } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
    Animated,
    ToastAndroid,
    TextInput,Alert
} from 'react-native';
import InputField from './InputField'
import {icons } from "../../constants"
import Colors from "../../constants/Colors"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';

const Login = ({ route, navigation }) => {

    const {login} = useContext(AuthContext);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    //const { next } = route.params?.next ? route.params:null
    
    useEffect(()=> {
        console.log(username + '-' + password);
    }, [username, password])
    const Login = async() => {
        const res = await login(username, password, navigation)
        if (res == "Wrong password") {
            Alert.alert("", "Sai mật khẩu !");
        } else {
            if (res == "There is no user with this user name")
            Alert.alert("", "Sai tên đăng nhập !");
        }
    }
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', backgroundColor: '#0DA271' }}>
            
            <View style={{ paddingHorizontal: 25,paddingTop:20, backgroundColor: '#ffffff',marginHorizontal:10,borderRadius:10}}>
               
                <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: '500', marginBottom: 30 }}>
                    Đăng nhập
                </Text>
                <View style={{ marginBottom: 15 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: 'gray',
                        height: 50
                    }}>
                        <Ionicons name='person-outline' size={20} color="#666" />
                        <TextInput
                            placeholder='Tên'

                            style={{
                                flex: 1,
                                paddingVertical: 0
                            }}
                            value={username}
                            onChangeText={(e) => {setUserName(e)}}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 15 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: 'gray',
                        height: 50
                    }}>
                        <Ionicons
                            name='ios-lock-closed-outline'
                            size={20} color="#666"
                            style={{ marginRight: 5 }}
                        />
                        <TextInput
                            placeholder='Mật khẩu'
                            style={{
                                flex: 1,
                                paddingVertical: 0
                            }}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(e) => {setPassword(e)}}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => { Login() }} style={{
                    backgroundColor: '#8fce00',
                    padding: 20,
                    marginBottom: 30,
                    borderRadius: 10}}>
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize:16
                    }}>Đăng nhập</Text>
                </TouchableOpacity>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 12,
                        fontWeight: '300',
                        marginBottom:30
                    }}
                >
                    Hoặc đăng nhập với:
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom:30

                }}>
                    <TouchableOpacity onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical:10
                        }}
                    >
                        <Image source={icons.google} style={{height:30,width:30}}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10
                        }}
                    >
                        <Image source={icons.facebook} style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10
                        }}
                    >
                        <Image source={icons.zalo} style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom:30 }}>
                    <Text style={{ marginBottom: 20 }}>
                        Chưa có tài khoản ?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: '#0000FF', fontWeight: '500' }}>Đăng ký ngay</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{
                    position: 'absolute', top: 20,
                    left: 2,
                }}>
                    <Ionicons
                        name="arrow-back"
                        style={{
                            fontSize: 30,
                            padding: 12,
                            borderRadius: 10,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const CONTAINER_HEIGHT = 50;
export default Login;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: CONTAINER_HEIGHT,
    },
    header: {
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        marginHorizontal: 4,
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