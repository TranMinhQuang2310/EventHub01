import {View, Text, Button, Image, Switch} from 'react-native';
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
import {ArrowRight, Lock, Sms, User} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import SocialLogin from './components/SocialLogin';
import {LoadingModal} from '../../modals';
import authenticationAPI from '../../apis/authApi';
import {Validate} from '../../utils/validate';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import {Alert} from 'react-native';

interface ErrorMessages {
  email: string;
  password: string;
  confirmPassword: string;
}

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.email ||
          errorMessage.password ||
          errorMessage.confirmPassword)) ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage, values]);

  const handleChangeValues = (key: string, value: string) => {
    const data: any = {...values};

    data[`${key}`] = value;

    setValues(data);
  };

  //Function quản lý validate trong form
  const formValidator = (key: string) => {
    const data = {...errorMessage};
    let message = ``;

    switch (key) {
      case 'email':
        //Bỏ trống field Email
        if (!values.email) {
          message = `Email is required!!!`;
        }
        //Không đúng format Email
        else if (!Validate.email(values.email)) {
          message = `Email is not invalid!!!`;
        } else {
          message = '';
        }
        break;

      case 'password':
        //Bỏ trống field Password
        message = !values.password ? `Password is required!!!` : '';
        break;

      case 'confirmPassword':
        if (!values.confirmPassword) {
          //Bỏ trống field confirmPassword
          message = `Please type confirm password!!!`;
        }
        //ConfirmPassword không trùng Password
        else if (values.confirmPassword !== values.password) {
          message = 'Password is not match!!!';
        } else {
          message = '';
        }
        break;
    }

    data[`${key}`] = message;

    setErrorMessage(data);
  };

  const handleRegister = async () => {
    //Call API verification
    const api = `/verification`;
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email: values.email},
        'post',
      );
      console.log(res);
      setIsLoading(false);

      //navigate qua màn hình Verification
      navigation.navigate('Verification', {
        code: res.data.code,
        ...values,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ContainerComponent isImageBackground isScroll back>
        {/* Input */}
        <SectionComponent>
          <TextComponent text="Sign Up" title size={24} />
          <SpaceComponent height={21} />
          {/* username */}
          <InputComponent
            value={values.username}
            placeholder="Full name"
            onChange={val => handleChangeValues('username', val)}
            //isPassword
            allowClear
            affix={<User size={22} color={appColors.gray} />}
          />
          {/* email */}
          <InputComponent
            value={values.email}
            placeholder="abc@email.com"
            onChange={val => handleChangeValues('email', val)}
            //isPassword
            allowClear
            affix={<Sms size={22} color={appColors.gray} />}
            //Sự kiện sau khi người dùng kết thúc nhập
            onEnd={() => formValidator('email')}
          />
          {/* Password */}
          <InputComponent
            value={values.password}
            placeholder="Password"
            onChange={val => handleChangeValues('password', val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
            //Sự kiện sau khi người dùng kết thúc nhập
            onEnd={() => formValidator('password')}
          />
          {/* Confirm password */}
          <InputComponent
            value={values.confirmPassword}
            placeholder="Confirm password"
            onChange={val => handleChangeValues('confirmPassword', val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
            //Sự kiện sau khi người dùng kết thúc nhập
            onEnd={() => formValidator('confirmPassword')}
          />
        </SectionComponent>
        {/* Validate không nhập đầy đủ thông tin */}
        {errorMessage &&
          (errorMessage.email ||
            errorMessage.password ||
            errorMessage.confirmPassword) && (
            <SectionComponent>
              {Object.keys(errorMessage).map(
                (error, index) =>
                  //Nếu có lỗi => Mới cho hiển thị validate
                  errorMessage[`${error}`] && (
                    <TextComponent
                      text={errorMessage[`${error}`]}
                      key={`error${index}`}
                      color={appColors.danger}
                    />
                  ),
              )}
            </SectionComponent>
          )}
        <SpaceComponent height={16} />
        {/* Button Sign Up */}
        <SectionComponent>
          <ButtonComponent
            onPress={handleRegister}
            text="SIGN UP"
            type="primary"
            disable={isDisable}
            iconFlex="right"
            icon={
              <View style={[globalStyles.iconContainer]}>
                <ArrowRight size={18} color={appColors.white} />
              </View>
            }
          />
        </SectionComponent>
        {/* SocialLogin */}
        <SocialLogin />
        {/* Don’t have an account?  Sign up */}
        <SectionComponent>
          <RowComponent justify="center">
            <TextComponent text="Already have an account? " />
            <ButtonComponent
              type="link"
              text="Sign In"
              onPress={() => navigation.navigate('LoginScreen')}
            />
          </RowComponent>
        </SectionComponent>
      </ContainerComponent>

      {/* Khi bấm Sign Up => Nhảy lên Modal Loading */}
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default SignUpScreen;
