import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import MyCart from './components/screens/MyCart'
import ProductInfo from './components/screens/ProductInfo'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Register from './components/screens/Register'
import New from './components/screens/New'
import UserProfile from './components/screens/UserProfile'
import Tabs from './navigation/tabs'
import Chat from './components/screens/Chat'
import Unauthorized from './components/screens/Unauthorized'
import { AuthProvider,AuthContext } from './context/AuthContext'
const Stack = createStackNavigator();

const App = () => {
    //const {username }=useContext(AuthContext);
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'HomeScreen'}
                >
                    <Stack.Screen name="HomeScreen" component={Tabs} />
                    <Stack.Screen name="MyCart" component={MyCart} />
                    <Stack.Screen name="ProductInfo" component={ProductInfo} />
                    <Stack.Screen name="New" component={New} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Chat" component={Chat} />
                    <Stack.Screen name="UserProfile" component={UserProfile} />
                    <Stack.Screen name="Unauthorized" component={Unauthorized} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}

export default App;