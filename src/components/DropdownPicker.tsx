import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SelectModel} from '../models/SelectModel';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import {ArrowDown2, SearchNormal1} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import {globalStyles} from '../styles/globalStyles';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import InputComponent from './InputComponent';
import SpaceComponent from './SpaceComponent';
import ButtonComponent from './ButtonComponent';
import {fontFamilies} from '../constants/fontFamilies';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Chọn Dropdown Picker ở màn hình AddNewScreen.tsx
interface Props {
  label?: string;
  values: SelectModel[];
  selected?: string | string[];
  onSelect: (val: string | string[]) => void;
  //Cho phép chọn nhiều
  multible?: boolean;
}

const DropdownPicker = (props: Props) => {
  const {label, values, selected, onSelect, multible} = props;

  const [searchKey, setSearchKey] = useState('');
  const [isVisibleModalize, setIsVisibleModalize] = useState(false);
  const modalieRef = useRef<Modalize>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  //console.log(selected);

  useEffect(() => {
    //Trường hợp Modalize được mở
    if (isVisibleModalize) {
      modalieRef.current?.open();
    }
  }, [isVisibleModalize]);

  useEffect(() => {
    //Trường hợp Modalize được mở và đã chọn item
    if (isVisibleModalize && selected) {
      setSelectedItems(multible ? (selected as string[]) : []);
    }
  }, [isVisibleModalize, selected, multible]);

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      const data = [...selectedItems];

      //Tìm vị trí id
      const index = selectedItems.findIndex(element => element === id);

      //Nếu id có tồn tại
      if (index !== -1) {
        //Bỏ 1 id (Xoá item đã chọn sau khi click icon X)
        data.splice(index, 1);
      }

      setSelectedItems(data);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  //Handle những item đã chọn
  const renderSelectedItem = (id: string) => {
    //Hiển thị tên email
    const item = values.find(element => element.value === id);

    return item ? (
      <RowComponent key={id} styles={[localStyles.selectedItem]}>
        <TextComponent
          text={`${
            item.label.includes('@') ? item.label.split('@')[0] : item.label
          }`}
          color={appColors.primary}
        />
        <SpaceComponent width={8} />
        <TouchableOpacity
          onPress={() => {
            handleSelectItem(id);
            onSelect(selectedItems);
          }}>
          <AntDesign name="close" size={18} color={appColors.text} />
        </TouchableOpacity>
      </RowComponent>
    ) : (
      <></>
    );
  };

  //Handle những item chưa chọn
  const renderSelectItem = (item: SelectModel) => {
    return (
      <RowComponent
        onPress={
          multible
            ? () => handleSelectItem(item.value)
            : () => {
                onSelect(item.value);
                modalieRef.current?.close();
              }
        }
        key={item.value}
        styles={[localStyles.listItem]}>
        <TextComponent
          text={item.label}
          flex={1}
          //Bold item đã chọn
          font={
            selectedItems?.includes(item.value)
              ? fontFamilies.medium
              : fontFamilies.regular
          }
          //Đổi màu item đã chọn
          color={
            selectedItems?.includes(item.value)
              ? appColors.primary
              : appColors.text
          }
        />

        {/* Hiển thị icon sau khi user click chọn item */}
        {selectedItems.includes(item.value) && (
          <MaterialCommunityIcons
            name="checkbox-marked-circle-outline"
            size={22}
            color={appColors.primary}
          />
        )}
      </RowComponent>
    );
  };

  //console.log(values);

  return (
    <View style={{marginBottom: 8}}>
      {label && <TextComponent text={label} styles={{marginBottom: 8}} />}
      <RowComponent
        styles={[globalStyles.inputContainer, {alignItems: 'flex-start'}]}
        onPress={() => setIsVisibleModalize(true)}>
        <RowComponent styles={{flex: 1, flexWrap: 'wrap'}}>
          {selected ? (
            selectedItems.length > 0 ? (
              selectedItems.map(item => renderSelectedItem(item))
            ) : (
              <TextComponent
                text={
                  values.find(element => element.value === selected)?.label ??
                  ''
                }
              />
            )
          ) : (
            <TextComponent text="Select" />
          )}
        </RowComponent>
        <ArrowDown2 size={22} color={appColors.gray} />
      </RowComponent>

      {/* Open Modalize */}
      <Portal>
        <Modalize
          //Thanh kéo lên kéo xuống vào trong
          handlePosition="inside"
          ref={modalieRef}
          //Ẩn thanh cuộn dọc
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          //Khi user chọn => hiển thị button
          FooterComponent={
            multible && (
              <View style={{paddingHorizontal: 20, paddingBottom: 30}}>
                <ButtonComponent
                  text="Agree"
                  type="primary"
                  onPress={() => {
                    onSelect(selectedItems);
                    modalieRef.current?.close();
                  }}
                />
              </View>
            )
          }
          HeaderComponent={
            <RowComponent
              styles={{
                marginBottom: 12,
                paddingHorizontal: 20,
                paddingTop: 30,
              }}>
              <View style={{flex: 1}}>
                <InputComponent
                  styles={{marginBottom: 0}}
                  placeholder="Search..."
                  value={searchKey}
                  onChange={val => setSearchKey(val)}
                  allowClear
                  affix={<SearchNormal1 size={22} color={appColors.text} />}
                />
              </View>
              <SpaceComponent width={20} />
              <ButtonComponent
                type="link"
                text="Cancel"
                onPress={() => modalieRef.current?.close()}
              />
            </RowComponent>
          }
          onClose={() => setIsVisibleModalize(false)}>
          <View style={{paddingHorizontal: 20, paddingVertical: 40}}>
            {values.map(item => renderSelectItem(item))}
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};

export default DropdownPicker;

const localStyles = StyleSheet.create({
  listItem: {
    marginBottom: 20,
  },
  selectedItem: {
    borderWidth: 0.5,
    borderColor: appColors.gray,
    padding: 4,
    marginBottom: 8,
    marginRight: 8,
    borderRadius: 8,
  },
});
