import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Facebook, Google} from '../../../assets/svgs';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import authenticationAPI from '../../../apis/authApi';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Cấu hình đăng nhập = google
GoogleSignin.configure({
  webClientId:
    //Copy từ "OAuth 2.0 client IDs"
    '714431920676-cq5pogbkt6io18upd652itmidagrs560.apps.googleusercontent.com',
});

//Đăng nhập = gg, facebook ở màn hình LoginScreen
const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    //Gọi API handleLoginWithGoogle
    const api = `/google-signin`;

    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      const user = userInfo.user;

      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        user,
        'post',
      );

      console.log(res.data);
      //Sau khi click đăng nhập xong => Có accesstoken tu` backend => Gọi hàm addAuth từ file authReducer.ts
      dispatch(addAuth(res.data));

      //=> Lưu dữ liệu người dùng vào Local
      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SectionComponent>
      <TextComponent
        styles={{textAlign: 'center'}}
        text="OR"
        color={appColors.gray4}
        size={16}
        font={fontFamilies.medium}
      />
      <SpaceComponent height={16} />

      <ButtonComponent
        type="primary"
        onPress={handleLoginWithGoogle}
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Google"
        textFont={fontFamilies.regular}
        icon={<Google />}
        iconFlex="left"
      />
      <ButtonComponent
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Facebook"
        textFont={fontFamilies.regular}
        icon={<Facebook />}
        iconFlex="left"
        onPress={() => Alert.alert('Tính năng đang phát triển')}
      />
    </SectionComponent>
  );
};

export default SocialLogin;
