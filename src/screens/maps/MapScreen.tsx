import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {appInfo} from '../../constants/appInfos';
import GeoLocation from '@react-native-community/geolocation';
import {
  CardComponent,
  CategoriesList,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowLeft2, Location} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {globalStyles} from '../../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {KnifeFork_Color} from '../../assets/svgs';

const MapScreen = ({navigation}: any) => {
  //Lấy vị trí hiện tại
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    long: number;
  }>();

  useEffect(() => {
    GeoLocation.getCurrentPosition(
      position => {
        if (position.coords) {
          //console.log(position.coords);
          setCurrentLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        }
      },
      error => {
        console.log(error), {};
      },
    );
  }, []);
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      {currentLocation ? (
        //Map View
        <MapView
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
          }}
          showsMyLocationButton
          //Nút hiển thị lấy vị trí hiện tại
          showsUserLocation
          initialRegion={{
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
            latitudeDelta: 0.001,
            longitudeDelta: 0.015,
          }}
          //Kiểu map
          mapType="standard">
          {/* Marker đánh dấu vị trí đã chọn trên bản đồ */}
          <Marker
            title="fafa"
            description="fafa"
            onPress={() => console.log('aaa')}
            coordinate={{
              latitude: currentLocation.lat,
              longitude: currentLocation.long,
            }}>
            <View
              style={{
                padding: 12,
                backgroundColor: appColors.white,
                borderRadius: 12,
                width: 56,
                height: 56,
              }}>
              <KnifeFork_Color />
            </View>
          </Marker>
        </MapView>
      ) : (
        <></>
      )}

      {/* Header */}
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.5)',
          top: 0,
          right: 0,
          left: 0,
          padding: 20,
          paddingTop: 48,
        }}>
        <RowComponent>
          {/* Thanh search */}
          <View style={{flex: 1}}>
            <InputComponent
              styles={{marginBottom: 0}}
              affix={
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Explore', {
                      screen: 'HomeScreen',
                    })
                  }>
                  <ArrowLeft2 size={24} color={appColors.text} />
                </TouchableOpacity>
              }
              placeholder="Search"
              value=""
              onChange={val => console.log(val)}
            />
          </View>
          <SpaceComponent width={12} />
          {/* Icon location*/}
          <CardComponent
            styles={[globalStyles.noSpaceCard, {width: 56, height: 56}]}
            color={appColors.white}>
            <MaterialIcons
              name="my-location"
              size={28}
              color={appColors.primary}
            />
          </CardComponent>
        </RowComponent>
        <SpaceComponent height={20} />

        {/* 4 tag */}
        <CategoriesList />
      </View>
    </View>
  );
};

export default MapScreen;
