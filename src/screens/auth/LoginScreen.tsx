import {View, Text, Button, Image, Switch, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {ArrowRight, Lock, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import SocialLogin from './components/SocialLogin';
import authenticationAPI from '../../apis/authApi';
import {Validate} from '../../utils/validate';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const emailValidation = Validate.email(email);

    if (!email || !password || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  //Call API login
  const handleLogin = async () => {
    const emailValidation = Validate.email(email);
    //Nếu nhập đúng format email
    if (emailValidation) {
      try {
        //Đẩy dữ liệu xuống DB sau khi click Sign In
        const res = await authenticationAPI.HandleAuthentication(
          //login là gắn thêm đường link api đã tạo bên server
          '/login',
          {email, password},
          'post',
        );

        //Sau khi click đăng nhập xong => Có accesstoken tu` backend => Gọi hàm addAuth từ file authReducer.ts
        dispatch(addAuth(res.data));

        //=> Lưu dữ liệu người dùng vào Local
        await AsyncStorage.setItem(
          'auth',
          //Nếu có click "Remember me" => Không cho đăng nhập lại lần nữa
          isRemember ? JSON.stringify(res.data) : email,
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      //Nếu nhập sai format Email
      Alert.alert('Format Email not correct!!!');
    }
  };

  return (
    <ContainerComponent isImageBackground isScroll>
      {/* Logo */}
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <Image
          source={require('../../assets/images/text-logo.png')}
          style={{
            width: 162,
            height: 114,
            marginBottom: 30,
          }}
        />
      </SectionComponent>

      {/* Input */}
      <SectionComponent>
        <TextComponent text="Sign In" title size={24} />
        <SpaceComponent height={21} />
        {/* Email */}
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          //isPassword
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />

        {/* Password */}
        <InputComponent
          value={password}
          placeholder="Password"
          onChange={val => setPassword(val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        {/* Remember Me */}
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <SpaceComponent width={4} />
            <TextComponent text="Remember me" />
          </RowComponent>
          {/* Forgot Password */}
          <ButtonComponent
            text="Forgot Password"
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}
            type="text"
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      {/* Button Sign In */}
      <SectionComponent>
        <ButtonComponent
          text="SIGN IN"
          type="primary"
          iconFlex="right"
          disable={isDisable}
          icon={
            <View style={[globalStyles.iconContainer]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
          onPress={handleLogin}
        />
      </SectionComponent>
      {/* SocialLogin */}
      <SocialLogin />
      {/* Don’t have an account?  Sign up */}
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don’t have an account? " />
          <ButtonComponent
            type="link"
            text="Sign up"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
