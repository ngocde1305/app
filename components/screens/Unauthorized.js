import {
    SafeAreaView, ScrollView, View, Animated, StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image, FlatList, ActivityIndicator,Text
} from 'react-native';

const Unauthorized = ({ route, navigation }) => {
    return (
        <View style={{ width: '100%', height: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: 'http://cdn.onlinewebfonts.com/svg/img_568656.png' }} style={{ margin: 10, tintColor: 'green', width: 100, height: 100 }} />
            <Text style={{}}>Vui lòng đăng nhập để tiếp tục</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{ margin: 10, padding: 10, backgroundColor: 'green', borderRadius: 10 }}>
                <Text style={{ fontWeight: '700', color: 'white' }}>Đăng nhập</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12 }}>Hoặc đăng ký tài khoản mới</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={{ margin: 10, padding: 10, backgroundColor: 'green', borderRadius: 10 }}>
                <Text style={{ fontWeight: '700', color: 'white' }}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
    )
}; export default Unauthorized