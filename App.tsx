import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SplashScreen } from './src/screens'
import AuthNavigator from './src/navigators/AuthNavigator'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
    //Hiển thị màn hình chờ khi bắt đầu open App
    const [isShowSplash , setIsShowSplash] = useState(true)

    //set thời gian sau bao nhiêu giây vào trang Login
    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsShowSplash(false)
      }, 1500)

      return () => clearTimeout(timeout)
    })

    return isShowSplash ? <SplashScreen /> : <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
}

export default App