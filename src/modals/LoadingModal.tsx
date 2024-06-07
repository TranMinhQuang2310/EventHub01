import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { TextComponent } from '../components'

interface Props {
    visible : boolean
    mess?: string
}
//Modal Loading sau khi click Sign In/Sign Up
const LoadingModal = (props : Props) => {

    const {visible,mess} = props

    return (
        <Modal
            visible={visible}
            style={[{flex : 1}]}
            transparent
            statusBarTranslucent
        >
            <View style={{
                flex : 1,
                backgroundColor : 'rgba(0,0,0,0.5)',
                justifyContent : 'center',
                alignItems : 'center'
            }}>
                {/* Icon loading */}
                <ActivityIndicator color={'#fff'} size={32} />

                <TextComponent text='Loading' flex={0} color={'#fff'} />
            </View>

        </Modal>
    )
}

export default LoadingModal