import {View, Text, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../../redux/reducers/authReducer';

const HomeScreen = () => {
  const dispatch = useDispatch();

  //Gọi authSelector từ file authReducer.ts
  const auth = useSelector(authSelector);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HomeScreen</Text>
      <Button
        title="Logout"
        //Gọi hàm removeAuth từ file authReducer.ts => Click Logout về màn hình OnBoardingScreen
        onPress={async () => {
          //Giữ lại tên email trong Local sau khi click Logout
          //await AsyncStorage.setItem('auth',auth.email)
          await AsyncStorage.clear();
          dispatch(removeAuth({}));
        }}
      />
    </View>
  );
};

export default HomeScreen;
