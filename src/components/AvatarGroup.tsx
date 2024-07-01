import {View, Text, Image} from 'react-native';
import React from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import SpaceComponent from './SpaceComponent';

//Icon avatar ở màn hình HomeScreen và EventDetail

interface Props {
  size?: number;
}

const AvatarGroup = (props: Props) => {
  const {size} = props;
  const photoURL =
    'https://cdn.oneesports.vn/cdn-data/sites/4/2022/02/hinh-nen-Luffy-2K-chat-ngau.jpg';
  return (
    <RowComponent justify="flex-start" styles={{marginVertical: 12}}>
      {Array.from({length: 3}).map((item, index) => (
        <Image
          key={`img${index}`}
          source={{uri: photoURL}}
          style={{
            width: size ?? 24,
            height: size ?? 24,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: appColors.white,
            marginLeft: index > 0 ? -8 : 0,
          }}
        />
      ))}
      <SpaceComponent width={12} />
      <TextComponent
        text="+20 Going"
        //Điều chỉnh size cỡ chữ theo kích thước avatar
        size={12 + (size ? (size - 24) / 5 : 0)}
        color={appColors.primary}
        font={fontFamilies.semiBold}
      />
    </RowComponent>
  );
};

export default AvatarGroup;
