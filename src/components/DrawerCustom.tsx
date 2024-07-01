import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SpaceComponent from './SpaceComponent';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../redux/reducers/authReducer';
import {appColors} from '../constants/appColors';
import {
  Bookmark2,
  Calendar,
  Logout,
  Message2,
  MessageQuestion,
  Setting2,
  Sms,
  User,
} from 'iconsax-react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Design Left Menu
const DrawerCustom = ({navigation}: any) => {
  //Gọi thông tin User từ redux
  const user = useSelector(authSelector);
  //console.log(user);

  const dispatch = useDispatch();

  const size = 20;
  const color = appColors.gray2;
  const profileMenu = [
    {
      key: 'MyProfile',
      title: 'My Profile',
      icon: <User size={size} color={color} />,
    },
    {
      key: 'Message',
      title: 'Message',
      icon: <Message2 size={size} color={color} />,
    },
    {
      key: 'Calendar',
      title: 'Calendar',
      icon: <Calendar size={size} color={color} />,
    },
    {
      key: 'Bookmark',
      title: 'Bookmark',
      icon: <Bookmark2 size={size} color={color} />,
    },
    {
      key: 'ContactUs',
      title: 'Contact Us',
      icon: <Sms size={size} color={color} />,
    },
    {
      key: 'Settings',
      title: 'Settings',
      icon: <Setting2 size={size} color={color} />,
    },
    {
      key: 'HelpAndFAQs',
      title: 'Help & FAQs',
      icon: <MessageQuestion size={size} color={color} />,
    },
    {
      key: 'SignOut',
      title: 'Sign Out',
      icon: <Logout size={size} color={color} />,
    },
  ];

  const handleSignOut = async () => {
    await GoogleSignin.signOut();
    dispatch(removeAuth({}));
    //Xoá hẳn trong LocalStorage sau khi click SignOut
    await AsyncStorage.clear();
  };

  return (
    <View style={[localStyles.container]}>
      {/* Avatar */}
      <TouchableOpacity
        onPress={() => {
          //Click avatar => Close Drawer
          navigation.closeDrawer();
          //Click avatar => navigate qua trang ProfileScreen
          navigation.navigate('Profile', {
            screen: 'ProfileScreen',
          });
        }}>
        {/* Nếu có hình avatar */}
        {user.photo ? (
          <Image source={{uri: user.photo}} style={[localStyles.avatar]} />
        ) : (
          //Nếu không có hình avatar
          <View
            style={[localStyles.avatar, {backgroundColor: appColors.gray2}]}>
            <TextComponent
              title
              size={22}
              color={appColors.white}
              //Tách chữ cái đầu tiên trong tên
              text={
                user.name
                  ? user.name
                      .split(' ')
                      [user.name.split(' ').length - 1].substring(0, 1)
                  : ''
              }
            />
          </View>
        )}
        <TextComponent text={user.name} title size={18} />
      </TouchableOpacity>

      {/* List Menu */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{flex: 1, marginVertical: 20}}
        renderItem={({item, index}) => (
          <RowComponent
            styles={[localStyles.listItem]}
            onPress={
              //Trường hợp click button SignOut
              item.key === 'SignOut'
                ? () => handleSignOut()
                : () => {
                    console.log(item.key);
                    navigation.closeDrawer();
                  }
            }>
            {item.icon}
            <TextComponent
              text={item.title}
              styles={[localStyles.listItemText]}
            />
          </RowComponent>
        )}
      />

      {/* Button Upgrade Pro */}
      <RowComponent justify="flex-start">
        <TouchableOpacity
          style={[
            globalStyles.button,
            {backgroundColor: '#00F8FF33', height: 'auto'},
          ]}>
          <MaterialCommunityIcons name="crown" size={22} color={'#00F8FF'} />
          <SpaceComponent width={8} />
          <TextComponent color="#00F8FF" text="Upgrade Pro" />
        </TouchableOpacity>
      </RowComponent>
    </View>
  );
};

export default DrawerCustom;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: Platform.OS === 'ios' ? StatusBar.currentHeight : 48,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },
  listItemText: {
    paddingLeft: 12,
  },
});
