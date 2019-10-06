import React from 'react'
import { View, TextInput, Text , Button } from 'react-native'
import { observer, inject } from 'mobx-react'

function MainPage (props) {
    return(
        <View>
            <Text>{props.rootStore.UserStore.user.userName}</Text>
            <Button title="PROFILE">PROFILE</Button>
        </View>
    );
}

export default inject('rootStore')(observer(MainPage))