import React, { useState, useEffect } from 'react';
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
import { Rating } from '@rneui/themed';
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = ({ route, navigation }) => {


    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: COLOURS.red,
                position: 'relative',
            }}>
            <Text>Thông tin tài khoản</Text>
        </View>
    );
};

export default User;
