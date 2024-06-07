import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ForgotPassword, LoginScreen, SignUpScreen, Verification } from '../screens'
import OnBoardingScreen from '../screens/auth/OnBoardingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'


const AuthNavigator = () => {
    const Stack = createNativeStackNavigator()
    // const [isExistingUser, setIsExistingUser] = useState(false);

    // useEffect(() => {
    //     checkUserExisting()
    // },[])

    // const checkUserExisting = async () => {
    //     const res = await AsyncStorage.getItem('auth')

    //     res && setIsExistingUser(true)
    // }

    // console.log(isExistingUser)

    return (
        <Stack.Navigator
            screenOptions={{
                //Ẩm header mặc định
                headerShown : false
            }}
        >
            <Stack.Screen name='OnBoardingScreen' component={OnBoardingScreen} />   
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            <Stack.Screen name='Verification' component={Verification} />
        </Stack.Navigator>
    )
}

export default AuthNavigator