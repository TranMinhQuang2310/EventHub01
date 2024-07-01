import {View, Text} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {ButtonComponent, ContainerComponent} from '../../components';
import {Google} from 'iconsax-react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {removeAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  return (
    <ContainerComponent back>
      <Text>ProfileScreen</Text>

      <ButtonComponent
        type="primary"
        text="Logout"
        onPress={async () => {
          await GoogleSignin.signOut();
          dispatch(removeAuth({}));
          //Xoá hẳn trong LocalStorage sau khi click SignOut
          await AsyncStorage.clear();
        }}
      />
    </ContainerComponent>
  );
};

export default ProfileScreen;
