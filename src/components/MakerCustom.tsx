import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {globalStyles} from '../styles/globalStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {KnifeFork_Color} from '../assets/svgs';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  onPress: () => void;
  type: string;
}

const MakerCustom = (props: Props) => {
  const {type, onPress} = props;
  //console.log(type);

  const renderIcon = (type: string) => {
    let icon;

    switch (type) {
      case 'art':
        icon = <Ionicons name="color-palette" color={'#46CDFB'} size={24} />;
        break;

      case 'sport':
        icon = (
          <FontAwesome5 name="basketball-ball" color={'#F0635A'} size={24} />
        );
        break;

      case 'food':
        icon = <KnifeFork_Color />;
        break;

      default:
        icon = <FontAwesome5 name="music" color={'#F59762'} size={24} />;
        break;
    }

    return icon;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={require('../assets/images/Union.png')}
        style={[
          globalStyles.shadow,
          {
            width: 56,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
        imageStyle={{
          resizeMode: 'contain',
          width: 56,
          height: 56,
        }}>
        {renderIcon(type)}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default MakerCustom;