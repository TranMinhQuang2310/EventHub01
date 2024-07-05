import {View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SelectModel} from '../models/SelectModel';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import {ArrowDown2} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import {globalStyles} from '../styles/globalStyles';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

interface Props {
  label?: string;
  values: SelectModel[];
  selected?: string | string[];
  onSelect: (val: string) => void;
}

const DropdownPicker = (props: Props) => {
  const {label, values, selected, onSelect} = props;

  const [isVisibleModalize, setIsVisibleModalize] = useState(false);
  const modalieRef = useRef<Modalize>();

  useEffect(() => {
    if (isVisibleModalize) {
      modalieRef.current?.open();
    }
  }, [isVisibleModalize]);

  return (
    <View style={{marginBottom: 8}}>
      {label && <TextComponent text={label} styles={{marginBottom: 8}} />}
      <RowComponent
        styles={[globalStyles.inputContainer]}
        onPress={() => setIsVisibleModalize(true)}>
        <RowComponent styles={{flex: 1}}>
          <TextComponent text="Select" />
        </RowComponent>
        <ArrowDown2 size={22} color={appColors.gray} />
      </RowComponent>

      {/* Open Modalize */}
      <Portal>
        <Modalize ref={modalieRef} onClose={() => setIsVisibleModalize(false)}>
          <View>
            <TextComponent text="fafa" flex={0} />
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};

export default DropdownPicker;
