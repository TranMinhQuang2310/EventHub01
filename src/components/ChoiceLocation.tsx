import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {globalStyles} from '../styles/globalStyles';
import {ArrowRight2, Location} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import CardComponent from './CardComponent';
import SpaceComponent from './SpaceComponent';
import ModalLocation from '../modals/ModalLocation';

//Chọn vị trí ở màn hình AddNewScreen.tsx
const ChoiceLocation = () => {
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false);

  return (
    <>
      <RowComponent
        onPress={() => setIsVisibleModalLocation(!isVisibleModalLocation)}
        styles={[globalStyles.inputContainer]}>
        {/* Icon Locatrion */}
        <View style={styles.card}>
          <View
            style={{
              ...styles.card,
              backgroundColor: appColors.white,
              width: 30,
              height: 30,
              borderRadius: 12,
            }}>
            <Location
              variant="Bold"
              size={15}
              color={`${appColors.primary}80`}
            />
          </View>
        </View>
        <SpaceComponent width={12} />
        <TextComponent text="NewYork, USA" flex={1} />
        <ArrowRight2 color={appColors.primary} size={22} />
      </RowComponent>

      {/* Mở Modal sau khi click */}
      <ModalLocation
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={val => console.log(val)}
      />
    </>
  );
};

export default ChoiceLocation;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#5568FF80',
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
