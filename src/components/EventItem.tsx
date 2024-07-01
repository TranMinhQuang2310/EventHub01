import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import CardComponent from './CardComponent';
import TextComponent from './TextComponent';
import {appInfo} from '../constants/appInfos';
import {EventModel} from '../models/EventModel';
import AvatarGroup from './AvatarGroup';
import RowComponent from './RowComponent';
import {Location} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import SpaceComponent from './SpaceComponent';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

//Detail từng card ở màn hình Explore
interface Props {
  //Gọi EventModel ở file EventModel.ts
  item: EventModel;
  type: 'card' | 'list';
}

const EventItem = (props: Props) => {
  const {item, type} = props;

  const navigation: any = useNavigation();

  //console.log(item);
  return (
    <CardComponent
      //Đổ bóng
      isShadow
      //Chiếm 60% màn hình
      styles={{width: appInfo.sizes.WIDTH * 0.7}}
      onPress={() => navigation.navigate('EventDetail', {item})}>
      <ImageBackground
        style={{flex: 1, marginBottom: 12, height: 131, padding: 10}}
        source={require('../assets/images/event-image.png')}
        imageStyle={{
          resizeMode: 'cover',
          borderRadius: 12,
        }}>
        <RowComponent justify="space-between">
          {/* Calendar */}
          <CardComponent styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
            <TextComponent
              color={appColors.danger2}
              font={fontFamilies.bold}
              size={18}
              text="10"
            />
            <TextComponent
              color={appColors.danger2}
              font={fontFamilies.semiBold}
              size={10}
              text="JUNE"
            />
          </CardComponent>

          {/* bookmark */}
          <CardComponent styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
            <MaterialIcons
              name="bookmark"
              color={appColors.danger2}
              size={22}
            />
          </CardComponent>
        </RowComponent>
      </ImageBackground>
      <TextComponent
        //Chỉ hiển thị 1 dòng
        numOfLine={1}
        text={item.title}
        title
        size={18}
      />
      <AvatarGroup />
      <RowComponent>
        <Location size={18} color={appColors.text3} variant="Bold" />
        <SpaceComponent width={8} />
        <TextComponent
          flex={1}
          numOfLine={1}
          text={item.location.address}
          size={12}
          color={appColors.text2}
        />
      </RowComponent>
    </CardComponent>
  );
};

export default EventItem;
