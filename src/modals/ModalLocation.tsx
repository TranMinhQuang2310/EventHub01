import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
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

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (val: string) => void;
}

//Chọn location sau khi click từ màn hình AddNewScreen
const ModalLocation = (props: Props) => {
  const {visible, onClose, onSelect} = props;
  const [searhKey, setSearhKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);

  useEffect(() => {
    //Trường hợp thanh search rỗng => list danh sách cũng phải rỗng
    if (!searhKey) {
      setLocations([]);
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
    }
  };

  return (
    //animationType="slide" => Open Modal từ dưới lên
    <Modal animationType="slide" visible={visible} style={{flex: 1}}>
      <View style={{paddingVertical: 42, paddingHorizontal: 20}}>
        <RowComponent justify="flex-end" styles={{marginVertical: 5}}>
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
          <SpaceComponent width={12} />
          <ButtonComponent text="Cancel" type="link" onPress={handleClose} />
        </RowComponent>

        {/* Action search */}
        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : locations.length > 0 ? (
            <FlatList
              data={locations}
              renderItem={({item}) => (
                <>
                  <TextComponent text={item.address.label} />
                </>
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
      </View>
    </Modal>
  );
};

export default ModalLocation;
