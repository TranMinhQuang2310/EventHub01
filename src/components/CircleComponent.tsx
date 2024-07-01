import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {appColors} from '../constants/appColors';

//Vòng tròn bọc filter và 4 item menu ở màn hình Explore
interface Props {
  size?: number;
  children: ReactNode;
  color?: string;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
}

const CircleComponent = (props: Props) => {
  const {size, color, onPress, children, styles} = props;
  const localStyle: any = {
    width: size ?? 40,
    height: size ?? 40,
    backgroundColor: color ?? appColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  };

  return onPress ? (
    <TouchableOpacity onPress={onPress} style={[localStyle, styles]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[localStyle, styles]}>{children}</View>
  );
};

export default CircleComponent;
