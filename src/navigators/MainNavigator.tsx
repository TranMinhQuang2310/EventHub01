import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';

//Quản lý toàn bộ giao diện chính
const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* Bọc DrawerNavigator ở ngoài toàn bộ màn hình */}
      <Stack.Screen name="Main" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
