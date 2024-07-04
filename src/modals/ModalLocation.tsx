import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../constants/appColors';
import {SearchNormal1} from 'iconsax-react-native';
import axios from 'axios';
import {LocationModel} from '../models/LocationModel';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {appInfo} from '../constants/appInfos';
import GeoLocation from '@react-native-community/geolocation';
import {AddressModel} from '../models/AddressModel';
import Geocoder from 'react-native-geocoding';

Geocoder.init(process.env.MAP_API_KEY as string);

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (val: {
    address: string;
    position?: {
      lat: number;
      long: number;
    };
  }) => void;
}

//Chọn location sau khi click từ màn hình AddNewScreen
const ModalLocation = (props: Props) => {
  const {visible, onClose, onSelect} = props;
  const [searhKey, setSearhKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [addressSelected, setAddressSelected] = useState('');

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
      error => console.log(error),
    );
  }, []);

  //Chuyển đến vị trí sau khi click chọn địa điểm
  useEffect(() => {
    Geocoder.from(addressSelected)
      .then(res => {
        const position = res.results[0].geometry.location;

        setCurrentLocation({
          lat: position.lat,
          long: position.lng,
        });
      })
      .catch(error => console.log(error));
  }, [addressSelected]);

  useEffect(() => {
    //Trường hợp thanh search rỗng => list danh sách cũng phải rỗng
    if (!searhKey) {
      setLocations([]);
      setIsLoading(false);
    }
  }, [searhKey]);

  const handleClose = () => {
    onClose();
  };

  const handleSearchLocation = async () => {
    //limit = 10 => 10 kết quả
    //B1 : Vào trang : https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1autocomplete/get
    //B2 : Copy link autocomplete
    //B3 : Vào trang : https://platform.here.com/admin/apps
    //B4 : Chọn dự án đã tạo và copy apiKey đã tạo vào phần đuôi
    const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searhKey}&limit=10&apiKey=-AhUXAijVv3H8x6Wt6ig4t6tGJ5MylEVn4pL46VGBMw`;

    try {
      setIsLoading(true);
      const res = await axios.get(api);

      if (res && res.data && res.status === 200) {
        setLocations(res.data.items);
      }

      //console.log(res.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //console.log(locations);

  return (
    //animationType="slide" => Open Modal từ dưới lên
    <Modal animationType="slide" visible={visible} style={{flex: 1}}>
      <View style={{paddingVertical: 42}}>
        <RowComponent
          justify="flex-end"
          styles={{marginVertical: 5, paddingHorizontal: 20}}>
          <View style={{flex: 1}}>
            <InputComponent
              styles={{marginBottom: 0}}
              affix={<SearchNormal1 size={20} color={appColors.gray} />}
              placeholder="Search"
              value={searhKey}
              allowClear
              onChange={val => setSearhKey(val)}
              onEnd={handleSearchLocation}
            />
          </View>
          {/* Action search */}
          <View
            style={{
              position: 'absolute',
              top: 60,
              right: 10,
              left: 10,
              backgroundColor: appColors.white,
              zIndex: 5,
              padding: 20,
            }}>
            {isLoading ? (
              <ActivityIndicator />
            ) : locations.length > 0 ? (
              <FlatList
                data={locations}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{marginBottom: 12}}
                    onPress={() => {
                      setAddressSelected(item.address.label);
                      setSearhKey('');
                    }}>
                    <TextComponent text={item.address.label} />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View>
                <TextComponent
                  text={searhKey ? 'Location not found' : 'Search location'}
                />
              </View>
            )}
          </View>
          <SpaceComponent width={12} />
          <ButtonComponent text="Cancel" type="link" onPress={handleClose} />
        </RowComponent>

        {currentLocation && (
          //Map View
          <MapView
            style={{
              width: appInfo.sizes.WIDTH,
              height: 500,
              marginVertical: 58,
              zIndex: -1,
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
            mapType="standard"
          />
        )}

        <ButtonComponent
          text="Confirm"
          onPress={() => {
            //Lấy vị trí và địa chỉ hiện tại sau khi click Confirm
            onSelect({
              address: addressSelected,
              position: currentLocation,
            });

            //Đóng Modal
            onClose();
          }}
          type="primary"
        />
      </View>
    </Modal>
  );
};

export default ModalLocation;
