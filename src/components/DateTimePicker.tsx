import {View, Text} from 'react-native';
import React, {useState} from 'react';
import RowComponent from './RowComponent';
import DatePicker from 'react-native-date-picker';
import TextComponent from './TextComponent';
import {globalStyles} from '../styles/globalStyles';
import {ArrowDown2, Calendar, Clock} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import {DateTime} from '../utils/DateTime';

//Chọn DateTime ở màn hình AddNewScreen
interface Props {
  selected?: Date;
  type: 'date' | 'time';
  onSelect: (val: Date) => void;
  label?: string;
}

const DateTimePicker = (props: Props) => {
  const {selected, type, onSelect, label} = props;
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  console.log(selected);

  return (
    <View style={{flex: 1}}>
      {label && <TextComponent text={label} styles={{marginBottom: 8}} />}
      <RowComponent
        styles={[globalStyles.inputContainer]}
        onPress={() => setIsShowDatePicker(true)}>
        <TextComponent
          //Truyền DateTime.ts để lấy kiểu dữ liệu đã convert
          text={`${
            selected
              ? type === 'time'
                ? DateTime.GetTime(selected)
                : DateTime.GetDate(selected)
              : 'Choice'
          }`}
          flex={1}
          font={fontFamilies.medium}
          styles={{textAlign: 'center'}}
        />
        {type === 'time' ? (
          <Clock size={22} color={appColors.gray} />
        ) : (
          <Calendar size={22} color={appColors.gray} />
        )}
      </RowComponent>
      <DatePicker
        mode={type}
        open={isShowDatePicker}
        date={new Date()}
        modal
        onCancel={() => setIsShowDatePicker(false)}
        onConfirm={val => {
          setIsShowDatePicker(false);
          onSelect(val);
        }}
      />
    </View>
  );
};

export default DateTimePicker;
