import {View, Text, StyleProp, TextStyle, Platform} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
  numOfLine?: number;
}

const TextComponent = (props: Props) => {
  const {text, color, size, flex, font, styles, title, numOfLine} = props;

  //Font Size for Android & Ios
  const fontSizeĐefault = Platform.OS === 'ios' ? 16 : 14;

  return (
    <Text
      //Hiển thị số dòng => Nếu không truyền là undefined
      numberOfLines={numOfLine}
      style={[
        globalStyles.text,
        {
          color: color ?? appColors.text,
          flex: flex ?? 0,
          fontSize: size ? size : title ? 24 : fontSizeĐefault,
          fontFamily: font
            ? font
            : title
            ? fontFamilies.medium
            : fontFamilies.regular,
        },
        //styles là styles người dùng nhập vào sẽ đè lên
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
