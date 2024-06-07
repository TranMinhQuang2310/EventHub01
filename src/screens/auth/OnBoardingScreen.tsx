import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import Swiper from 'react-native-swiper'
import { appInfo } from '../../constants/appInfos'
import { appColors } from '../../constants/appColors'
import { TextComponent } from '../../components/'
import { fontFamilies } from '../../constants/fontFamilies'

//Màn hình sau khi load xong màn hình chờ
const OnBoardingScreen = ({navigation} : any) => {

    //Trước khi chuyển trang (vị trí mặc định là 0)
    const [index,setIndex] = useState(0)

    return (
        <View style={[globalStyles.container]}>
            <Swiper
                //Đến cuối cùng => Không cho scoll tiếp
                loop={false}
                // Khi vuốt qua sẽ biết được slide trang số mấy
                onIndexChanged={num => setIndex(num)}
                index={index}
                //Dot nào active => Chuyển sang màu trắng
                activeDotColor={appColors.white}
            >
                <Image
                    source={require('../../assets/images/onboarding-1.png')}
                    style={{
                        flex : 1,
                        width : appInfo.sizes.WIDTH,
                        height : appInfo.sizes.HEIGHT,
                        resizeMode : 'cover'
                    }} 
                />
                <Image
                    source={require('../../assets/images/onboarding-2.png')}
                    style={{
                        flex : 1,
                        width : appInfo.sizes.WIDTH,
                        height : appInfo.sizes.HEIGHT,
                        resizeMode : 'cover'
                    }} 
                />
                <Image
                    source={require('../../assets/images/onboarding-3.png')}
                    style={{
                        flex : 1,
                        width : appInfo.sizes.WIDTH,
                        height : appInfo.sizes.HEIGHT,
                        resizeMode : 'cover'
                    }}
                />
            </Swiper>

            {/* Nút Skip/Next */}
            <View style={[
                {
                    paddingHorizontal : 16,
                    paddingVertical : 20,
                    position : 'absolute',
                    bottom : 0,
                    right : 0,
                    left : 0,
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    alignItems : 'center'
                }
            ]}>
                {/* Nút Skip */}
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <TextComponent 
                        text="Skip" 
                        color={appColors.gray2}
                        font={fontFamilies.medium}
                    />
                </TouchableOpacity>
                
                {/* Nút Next */}
                <TouchableOpacity
                    onPress={() =>
                        //nếu index > 2 => Qua màn hình LoginScreen
                        index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')}>
                    <TextComponent 
                        text="Next" 
                        color={appColors.white}
                        font={fontFamilies.medium}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
    text : {
        color : appColors.white,
        fontSize : 16,
        fontWeight : '500'
    }
})