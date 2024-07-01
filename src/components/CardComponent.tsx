import {View, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';

interface Props {
  onPress?: () => void;
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  //Đổ bóng
  isShadow?: boolean;
  color?: string;
}

//Hiển thị form Card ở màn hình Explore
const CardComponent = (props: Props) => {
  const {onPress, children, styles, isShadow, color} = props;

  const localStyle: StyleProp<ViewStyle>[] = [
    globalStyles.card,
    isShadow ? globalStyles.shadow : undefined,
    {backgroundColor: color ?? appColors.white},
    styles,
  ];
  return (
    <TouchableOpacity style={localStyle} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default CardComponent;
