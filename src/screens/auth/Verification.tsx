import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';
import {ArrowRight} from 'iconsax-react-native';
import authenticationAPI from '../../apis/authApi';
import {LoadingModal} from '../../modals';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Verification = ({navigation, route}: any) => {
  const {code, email, password, username} = route.params;

  const [currentCode, setCurrentCode] = useState<string>(code);
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');
  const [limit, setLimit] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  const dispatch = useDispatch();

  //Mới vào => cho focus vào textInput đầu tiên
  useEffect(() => {
    ref1.current.focus();
  }, []);

  //Đếm tới số 0 => cho dừng
  useEffect(() => {
    if (limit > 0) {
      //setInterval => Đếm từng khoảng thời gian
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [limit]);

  //Đếm số lượng phần tử nhập vào mảng sau khi chọn số
  useEffect(() => {
    let item = ``;
    codeValues.forEach(val => (item += val));

    setNewCode(item);
    console.log(item);
  }, [codeValues]);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;

    setCodeValues(data);
  };

  //function Resend Email => Call API verification
  const handleResendVerification = async () => {
    setCodeValues(['', '', '', '']);
    setNewCode('');

    const api = `/verification`;
    setIsLoading(true);

    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );

      console.log(res);
      //Sau khi click Resend Email => set limit về 120
      setLimit(120);
      //Set cho chạy từ 20 như ban đầu
      setCurrentCode(res.data.code);
      setIsLoading(false);

      //console.log(res.data.code);
    } catch (error) {
      setIsLoading(false);
      console.log(`Can not send verification code ${error}`);
    }
  };

  //function cho phép đăng ký thành công sau khi nhập đúng mã code
  const handleVerification = async () => {
    if (limit > 0) {
      console.log('New Number :' + newCode, 'Current Number :' + currentCode);
      //Chuyển từ kiểu string => kiểu number
      //Nếu số mới nhập vào KHÔNG BẰNG số cũ => Nhấn button =>  ra lỗi
      if (parseInt(newCode) !== parseInt(currentCode)) {
        setErrorMessage('Invalid code');
      } else {
        setErrorMessage('');

        const api = `/register`;
        const data = {
          email,
          password,
          username: username ?? '',
        };

        try {
          const res: any = await authenticationAPI.HandleAuthentication(
            api,
            data,
            'post',
          );

          //Sau khi click đăng ký thành công => Có accesstoken => Gọi hàm addAuth từ file authReducer.ts
          dispatch(addAuth(res.data));

          //=> Lưu dữ liệu người dùng vào Local
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        } catch (error) {
          setErrorMessage('User has already exist!!!');
          console.log(`Can not create new User ${error}`);
        }
      }
      //console.log('Register Done');
    } else {
      //Sau khi hết 20s => Nếu nhập 4 số cũ => Nhấn button =>  ra lỗi
      setErrorMessage('Time out verification code , please resend new code!!!');
    }
  };

  return (
    <ContainerComponent back isImageBackground isScroll>
      <SectionComponent>
        <TextComponent text="Verification" title />
        <SpaceComponent height={12} />
        <TextComponent
          //replace 5 kí tự đầu thành dấu *
          text={`We’ve send you the verification code on ${email.replace(
            /.{1,5}/,
            (m: any) => '*'.repeat(m.length),
          )}`}
        />
        <SpaceComponent height={26} />
        <RowComponent justify="space-around">
          <TextInput
            keyboardType="number-pad"
            ref={ref1}
            style={[styles.input]}
            value={codeValues[0]}
            placeholder="-"
            maxLength={1}
            //Sau khi nhập xong => cho focus vào textInput tiếp theo
            onChangeText={val => {
              val.length > 0 && ref2.current.focus();
              handleChangeCode(val, 0);
            }}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref2}
            style={[styles.input]}
            value={codeValues[1]}
            placeholder="-"
            maxLength={1}
            //Sau khi nhập xong => cho focus vào textInput tiếp theo
            onChangeText={val => {
              val.length > 0 && ref3.current.focus();
              handleChangeCode(val, 1);
            }}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref3}
            style={[styles.input]}
            value={codeValues[2]}
            placeholder="-"
            maxLength={1}
            //Sau khi nhập xong => cho focus vào textInput tiếp theo
            onChangeText={val => {
              val.length > 0 && ref4.current.focus();
              handleChangeCode(val, 2);
            }}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref4}
            style={[styles.input]}
            value={codeValues[3]}
            placeholder="-"
            maxLength={1}
            //Sau khi nhập xong => ...
            onChangeText={val => {
              handleChangeCode(val, 3);
            }}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{marginTop: 40}}>
        <ButtonComponent
          //Nhập đủ 4 số => enable button
          disable={newCode.length !== 4}
          onPress={handleVerification}
          text="Continue"
          type="primary"
          //Icon ->
          iconFlex="right"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor:
                    newCode.length !== 4 ? appColors.gray : appColors.primary,
                },
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
        />
      </SectionComponent>

      {/* Validate hiển thị sau khi hết 20s => Nếu nhập 4 số cũ => Nhấn button =>  ra lỗi */}
      {errorMessage && (
        <SectionComponent>
          <TextComponent
            styles={{textAlign: 'center'}}
            text={errorMessage}
            color={appColors.danger}
          />
        </SectionComponent>
      )}

      <SectionComponent>
        {limit > 0 ? (
          <RowComponent justify="center">
            <TextComponent text="Re-send code in " flex={0} />
            <TextComponent
              text={`${(limit - (limit % 60)) / 60} : ${
                limit - (limit - (limit % 60))
              }`}
              flex={0}
              color={appColors.link}
            />
          </RowComponent>
        ) : (
          <RowComponent>
            <ButtonComponent
              type="link"
              text="Resend email verification"
              onPress={handleResendVerification}></ButtonComponent>
          </RowComponent>
        )}
      </SectionComponent>

      {/* Icon Loading */}
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default Verification;

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontFamily: fontFamilies.semiBold,
    textAlign: 'center',
  },
});
