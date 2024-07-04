import {
  View,
  Text,
  Button,
  StatusBar,
  TouchableOpacity,
  Platform,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../../redux/reducers/authReducer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../constants/appColors';
import {
  CardComponent,
  CategoriesList,
  CircleComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import {
  ArrowDown,
  HambergerMenu,
  Notification,
  SearchNormal,
  Sort,
} from 'iconsax-react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GeoLocation from '@react-native-community/geolocation';
import axios from 'axios';
import {AddressModel} from '../../models/AddressModel';
import Geocoder from 'react-native-geocoding';

//Geocoder.init(process.env.MAP_API_KEY as string);
const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  //Gọi authSelector từ file authReducer.ts
  const auth = useSelector(authSelector);

  //Lấy vị trí hiện tại
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();

  // useEffect(() => {
  //   Geocoder.from('Hoàng Hoa Thám').then(position => console.log(position));
  // }, []);

  // console.log(process.env.MAP_API_KEY);

  useEffect(() => {
    GeoLocation.getCurrentPosition(position => {
      if (position.coords) {
        reverseGeoCode({
          //lat : kinh độ , long : vĩ độ
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
      //console.log(position);
    });
  }, []);

  //Lấy vị trí hiện tại
  //B1 : Vào trang : https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1revgeocode/get
  //B2 : Copy link Reverse Geocode
  //B3 : Vào trang : https://platform.here.com/admin/apps
  //B4 : Chọn dự án đã tạo và copy apiKey đã tạo vào phần đuôi
  const reverseGeoCode = async ({lat, long}: {lat: number; long: number}) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-Vi&apiKey=6EcJnTqCWEHKTWVTH-evkA9ClRUGTPSt-U_wm1gxey4`;

    try {
      const res = await axios(api);
      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        setCurrentLocation(items[0]);
        //console.log(items[0]);
      }
      //console.log(res);
    } catch (error) {
      console.log(error);
    }
    //console.log(lat, long);
  };

  const itemEvent = {
    title: 'International Band Music Concert',
    description:
      'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
    location: {
      title: 'Gala Convention Center',
      address: '36 Guild Street London, UK',
    },
    imageUrl: '',
    users: [''],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  };

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: appColors.primary,
          height: Platform.OS === 'android' ? 197 : 213, //229 - 32
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 42,
        }}>
        <View style={{paddingHorizontal: 16}}>
          <RowComponent>
            {/* Icon 3 gạch */}
            {/* Click vào => Open Drawer */}
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>

            {/* Location */}
            <View style={[{flex: 1, alignItems: 'center'}]}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.white2}
                  size={12}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowComponent>
              {currentLocation && (
                <TextComponent
                  text={`${currentLocation.address.city} , ${currentLocation.address.countryName}`}
                  flex={0}
                  color={appColors.white}
                  font={fontFamilies.medium}
                  size={13}
                />
              )}
            </View>

            {/* Icon chuông */}
            <CircleComponent color="#524CE0" size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#524CE0',
                    position: 'absolute',
                    top: -2,
                    right: -2,
                  }}></View>
              </View>
            </CircleComponent>
          </RowComponent>

          <SpaceComponent height={20} />
          <RowComponent>
            <RowComponent
              styles={{flex: 1}}
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: false,
                })
              }>
              {/* Icon search */}
              <SearchNormal
                variant="TwoTone"
                color={appColors.white}
                size={20}
              />
              <View
                style={{
                  width: 1,
                  backgroundColor: appColors.gray2,
                  marginHorizontal: 10,
                  height: 20,
                }}
              />
              <TextComponent
                flex={1}
                text="Search..."
                color={appColors.gray2}
                size={16}
              />
            </RowComponent>

            {/* Filter */}
            <TagComponent
              bgColor={'#5D56F3'}
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: true,
                })
              }
              label="Filters"
              icon={
                <CircleComponent size={20} color="#A29EF0">
                  <Sort size={16} color="#5D56F3" />
                </CircleComponent>
              }
            />
          </RowComponent>
          <SpaceComponent height={20} />
        </View>

        {/* 4 item menu */}
        <View style={{marginBottom: -16}}>
          <CategoriesList isFill />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[{flex: 1, marginTop: Platform.OS === 'ios' ? 22 : 18}]}>
        {/* Upcoming Events */}
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 24}}>
          <TabBarComponent title="Upcoming Events" onPress={() => {}} />
          <FlatList
            //Phải bỏ horizontal vào vì FlatList nằm trong ScrollView
            horizontal
            //Ẩn thanh scroll ngang
            showsHorizontalScrollIndicator={false}
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem key={`event${index}`} item={itemEvent} type="card" />
            )}
          />
        </SectionComponent>

        {/* Invite your friends */}
        <SectionComponent>
          <ImageBackground
            source={require('../../assets/images/invite-image.png')}
            style={{flex: 1, padding: 16, minHeight: 127}}
            imageStyle={{resizeMode: 'cover', borderRadius: 12}}>
            <TextComponent text="Invite your friends" title />
            <TextComponent text="Get $20 for ticket" />

            <RowComponent justify="flex-start">
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    marginTop: 12,
                    backgroundColor: '#00F8FF',
                    paddingHorizontal: 28,
                  },
                ]}>
                <TextComponent
                  text="INVITE"
                  font={fontFamilies.bold}
                  color={appColors.white}
                />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent>

        {/* Nearby You */}
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 24}}>
          <TabBarComponent title="Upcoming Events" onPress={() => {}} />
          <FlatList
            //Phải bỏ horizontal vào vì FlatList nằm trong ScrollView
            horizontal
            //Ẩn thanh scroll ngang
            showsHorizontalScrollIndicator={false}
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem key={`event${index}`} item={itemEvent} type="card" />
            )}
          />
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
