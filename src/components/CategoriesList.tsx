import {View, Text, FlatList} from 'react-native';
import React, {ReactNode} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {appColors} from '../constants/appColors';
import TagComponent from './TagComponent';
import {KnifeFork, KnifeFork_Color} from '../assets/svgs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//4 item menu
interface Props {
  //Có màu hoặc không màu
  isFill?: boolean;
}

interface Category {
  icon: ReactNode;
  color: string;
  label: string;
  key: string;
}

const CategoriesList = (props: Props) => {
  const {isFill} = props;

  const categories: Category[] = [
    {
      key: 'sports',
      label: 'Sports',
      icon: (
        <FontAwesome5
          name="basketball-ball"
          color={isFill ? appColors.white : '#F0635A'}
          size={20}
        />
      ),
      color: '#F0635A',
    },
    {
      key: 'music',
      label: 'Music',
      icon: (
        <FontAwesome5
          name="music"
          color={isFill ? appColors.white : '#F59762'}
          size={20}
        />
      ),
      color: '#F59762',
    },
    {
      key: 'food',
      label: 'Food',
      icon: isFill ? (
        <KnifeFork color={isFill ? appColors.white : '#29D697'} />
      ) : (
        <KnifeFork_Color color={isFill ? appColors.white : '#29D697'} />
      ),
      color: '#29D697',
    },
    {
      key: 'art',
      label: 'Art',
      icon: (
        <Ionicons
          name="color-palette"
          color={isFill ? appColors.white : '#46CDFB'}
          size={20}
        />
      ),
      color: '#46CDFB',
    },
  ];
  return (
    <FlatList
      style={{paddingHorizontal: 16}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={({item, index}) => (
        <TagComponent
          styles={{
            marginRight: index === categories.length - 1 ? 28 : 12,
            minWidth: 82,
          }}
          bgColor={isFill ? item.color : appColors.white}
          onPress={() => {}}
          icon={item.icon}
          label={item.label}
          textColor={isFill ? appColors.white : appColors.text2}
        />
      )}
    />
  );
};

export default CategoriesList;
