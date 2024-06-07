import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardType } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { EyeSlash } from 'iconsax-react-native'
import { appColors } from '../constants/appColors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { globalStyles } from '../styles/globalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

//Component Input chung
interface Props {
    value: string
    onChange: (val : string) => void
    //Icon trước
    affix?: ReactNode
    placeholder?: string
    //Icon sau
    suffix?: ReactNode
    //Kiểm tra phải password không
    isPassword?: boolean
    //Clear toàn bộ data nhập
    allowClear?: boolean
    //Kiểu người dùng nhập
    type?: KeyboardType
    //Sau khi người dùng kết thúc nhập
    onEnd?: () => void
}

const InputComponent = (props : Props) => {

    const {
        value, 
        onChange , 
        affix , 
        placeholder , 
        suffix , 
        isPassword , 
        allowClear , 
        type,
        onEnd
    } = props

    const [isShowPass, setIsShowPass] = useState(isPassword ?? false)

    return (
        <View style={[styles.inputContainer]}>
            {/* Icon trước */}
            {affix && affix}
            <TextInput
                style={[styles.input, globalStyles.text]}
                value={value}
                placeholder={placeholder ?? ''}
                onChangeText={val => onChange(val)} 
                //Ẩn kí tự nhập vào
                secureTextEntry={isShowPass}
                placeholderTextColor={'#747688'}
                //Kiểu người dùng nhập
                keyboardType={type ?? 'default'}
                //Không tự động viết hoa chữ cái đầu tiên
                autoCapitalize='none'
                //Sau khi người dùng kết thúc nhập
                onEndEditing={onEnd}
            />
            {/* Icon sau */}
            {suffix && suffix}
            <TouchableOpacity
                //Nếu truyền isPassword => click vào icon mắt hiển thị pass
                onPress={
                    isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')
                }
            >
                {
                    isPassword ? (
                        //Nếu là password => Hiển thị Icon mắt
                        <FontAwesome
                            name={isShowPass ? 'eye-slash' : 'eye'} 
                            size={22} 
                            color={appColors.gray} 
                        />
                    ) : (
                        //Nếu có dữ liệu nhập vào => Hiển thị icon "X"
                        value.length > 0 && allowClear && (
                            <AntDesign 
                                name='close' 
                                size={32} 
                                color={appColors.text} 
                            />
                        )
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

export default InputComponent

const styles = StyleSheet.create({
    inputContainer : {
        flexDirection : 'row',
        borderRadius : 12,
        borderWidth : 1,
        borderColor : appColors.gray3,
        width : '100%',
        minHeight : 56,
        justifyContent : 'center',
        alignItems : 'center',
        paddingHorizontal : 15,
        backgroundColor : appColors.white,
        marginBottom : 19
    },
    input : {
        padding : 0,
        margin : 0,
        flex : 1,
        paddingHorizontal : 14,
        color : appColors.text
    }
})