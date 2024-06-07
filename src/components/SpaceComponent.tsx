import { View, Text } from 'react-native'
import React from 'react'

//Compoent dùng làm khoảng cách
interface Props {
    width?: number,
    height?: number
}


const SpaceComponent = (props : Props) => {

    const {width,height} = props

    return (
        <View style={{
            width,
            height
        }}>
        </View>
    )
}

export default SpaceComponent