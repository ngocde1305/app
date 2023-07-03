import React, { useState, useRef,useContext, useEffect } from 'react';
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
    TextInput,Pressable
} from 'react-native';
import InputField from './InputField'
import { icons } from "../../constants"
import Colors from "../../constants/Colors"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
const Register = ({ route, navigation }) => {
    const { register } = useContext(AuthContext);
    const [isValidUserName, setIsValidUserName] = useState();
    const [isValidEmail, setIsValidEmail] = useState();
    const [isValidPassword, setIsValidPassword] = useState();
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState();
    const [userNameMessage, setUserNameMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const validateUserName = (value) => {
        const strongRegex = new RegExp("^[a-zA-Z0-9_-]{4,16}$");
        const user = value;
        if (strongRegex.test(user)) {
            setIsValidUserName(true);
        } else {
            setIsValidUserName(false);
            setUserNameMessage('Tên phải dài tối thiểu 4 ký tự');
        }
    };
    const validateEmail = (value) => {
        const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        const email = value;
        console.log(value)
        if (strongRegex.test(email)) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
            setEmailMessage('Vui lòng nhập đúng định dạng Email');
        }
    };
    const validatePassword = (value) => {
        const strongRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        const password = value;

        if (strongRegex.test(password)) {
            setIsValidPassword(true);
        } else {
            setIsValidPassword(false);
            setPasswordMessage('Mật khẩu phải chứa ít nhất 8 ký tự gồm chữ viết hoa, chữ thường, ký tự đặc biệt, số');
        }
    };

    const validateConfirmPassword = (value) => {
        const confirmPassword = value;
        if (data.password === value) {
            setIsValidConfirmPassword(true);
        } else {
            setIsValidConfirmPassword(false);
            setConfirmPasswordMessage('Mật khẩu phải giống nhau');
        }
    };
    useEffect(() => {


        validateConfirmPassword(data.confirmPassword)

    }, [data.password])
    const InputView = ({ icon, validValue, validMessage }) => {
        return (
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: validValue ? 'gray' : 'red',
                    height: 50
                }}>
                    {icon}
                    <TextInput
                        placeholder='Email'
                        keyboardType='email-address'
                        style={{
                            flex: 1,
                            paddingVertical: 0
                        }}
                        value={data.email}
                        onChangeText={(e) => validateEmail(e)}
                    />
                    {validValue ? <Ionicons
                        name='checkmark-circle-outline'
                        size={20} color="green"
                        style={{ marginRight: 5 }}
                    />
                        :
                        <Ionicons
                            name='close-circle-outline'
                            size={20} color="red"
                            style={{ marginRight: 5 }}
                        />
                    }
                </View>
                {!validValue &&
                    <Text>{validMessage}</Text>
                }
            </View>
        )
    }
    const handleOnChange = (name, value) => {

        console.log(data)
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }
    return (
        <View
            style={{ flex: 1, position: 'relative', justifyContent: 'center', backgroundColor: '#0DA271' }}>  
            <ScrollView style={{ paddingHorizontal: 25, paddingTop: 20, backgroundColor: '#ffffff', marginHorizontal: 10, borderRadius: 10 }}>
                
                <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: '500', marginBottom: 30 }}>
                    Đăng ký
                </Text>

                {/*<InputView icon={<MaterialIcons name='alternate-email' size={20} color="#666" />}*/}

                {/*    validMessage={message}*/}
                {/*    validValue={isValidEmail}*/}
                {/*/>*/}

                <View style={{ marginBottom: 15 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: isValidEmail == null ? 'gray' : isValidEmail ? 'green' : 'red',
                        height: 50
                    }}>
                        <MaterialIcons name='alternate-email' size={20} color="#666" />
                        <TextInput
                            name='email'
                            placeholder='Email'
                            keyboardType='email-address'
                            style={{
                                flex: 1,
                                paddingVertical: 0
                            }}
                            value={data.email}
                            //onChange={(e)=>handleOnChange(e) }
                            onChangeText={(e) => { validateEmail(e), handleOnChange("email", e) }}
                        />
                        {isValidEmail == null ? null : (isValidEmail ? <Ionicons
                            name='checkmark-circle-outline'
                            size={20} color="green"
                            style={{ marginRight: 5 }}
                        />
                            :
                            <Ionicons
                                name='close-circle-outline'
                                size={20} color="red"
                                style={{ marginRight: 5 }}
                            />
                        )
                        }
                    </View>
                    {!isValidEmail &&
                        <Text style={{ fontSize: 9 }}>{emailMessage}</Text>
                    }
                </View>

                <View style={{ marginBottom: 15 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: isValidUserName == null ? 'gray' : isValidUserName ? 'green' : 'red',
                        height: 50
                    }}>
                        <Ionicons name='person-outline' size={20} color="#666" />
                        <TextInput
                            placeholder='Tên'

                            style={{
                                flex: 1,
                                paddingVertical: 0
                            }}
                            value={data.username}
                            onChangeText={(e) => { validateUserName(e), handleOnChange("username", e) }}
                        />
                        {isValidUserName == null ? null : (isValidUserName ? <Ionicons
                            name='checkmark-circle-outline'
                            size={20} color="green"
                            style={{ marginRight: 5 }}
                        />
                            :
                            <Ionicons
                                name='close-circle-outline'
                                size={20} color="red"
                                style={{ marginRight: 5 }}
                            />
                        )
                        }
                    </View>
                    {!isValidUserName &&
                        <Text style={{ fontSize: 9 }}>{userNameMessage}</Text>
                    }
                </View>

                <View style={{ marginBottom: 15 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: isValidPassword == null ? 'gray' : isValidPassword ? 'green' : 'red',
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
                            value={data.password}
                            secureTextEntry={true}
                            onChangeText={(e) => { validatePassword(e), handleOnChange("password", e) }}
                        />
                        {isValidPassword == null ? null : (isValidPassword ? <Ionicons
                            name='checkmark-circle-outline'
                            size={20} color="green"
                            style={{ marginRight: 5 }}
                        />
                            :
                            <Ionicons
                                name='close-circle-outline'
                                size={20} color="red"
                                style={{ marginRight: 5 }}
                            />
                        )
                        }
                    </View>
                    {!isValidPassword &&
                        <Text style={{fontSize:9,}}>{passwordMessage}</Text>
                    }
                </View>

                <View style={{ marginBottom: 15 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: isValidConfirmPassword == null ? 'gray' : isValidConfirmPassword ? 'green' : 'red',
                        height: 50
                    }}>
                        <Ionicons
                            name='ios-lock-closed-outline'
                            size={20} color="#666"
                            style={{ marginRight: 5 }}
                        />
                        <TextInput
                            placeholder='Nhập lại mật khẩu'
                            style={{
                                flex: 1,
                                paddingVertical: 0
                            }}
                            value={data.confirmPassword}
                            secureTextEntry={true}
                            onChangeText={(e) => { validateConfirmPassword(e), handleOnChange("confirmPassword", e) }}
                        />
                        {isValidConfirmPassword == null ? null : (isValidConfirmPassword ? <Ionicons
                            name='checkmark-circle-outline'
                            size={20} color="green"
                            style={{ marginRight: 5 }}
                        />
                            :
                            <Ionicons
                                name='close-circle-outline'
                                size={20} color="red"
                                style={{ marginRight: 5 }}
                            />
                        )
                        }
                    </View>
                    {!isValidConfirmPassword &&
                        <Text style={{ fontSize: 9 }}>{confirmPasswordMessage}</Text>
                    }
                </View>



                <TouchableOpacity onPress={() => {register(data) }} style={{
                    backgroundColor: '#8fce00',
                    padding: 20,
                    marginBottom: 30,
                    borderRadius: 10
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: 16
                    }}>Đăng ký</Text>
                </TouchableOpacity>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 12,
                        fontWeight: '300',
                        marginBottom: 30
                    }}
                >
                    Hoặc đăng ký với:
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 30

                }}>
                    <TouchableOpacity onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10
                        }}
                    >
                        <Image source={icons.google} style={{ height: 30, width: 30 }} />
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
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                    <Text style={{ marginBottom: 20 }}>
                        Đã có tài khoản ?
                    </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                        <Text style={{ color: '#0000FF', fontWeight: '500' }}>Đăng nhập ngay</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{height:60}}></View>
            </ScrollView>
            <TouchableOpacity onPress={() => { navigation.navigate('HomeScreen'), console.log('xxxxx') }} style={{
                position: 'absolute', top:20,
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
    );
};
const CONTAINER_HEIGHT = 50;
export default Register;
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