import React from 'react';
import { Container, Text, Header, Body, Title, Item, StyleProvider } from 'native-base';
import { Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { observer, inject } from 'mobx-react';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';




class ProfilePage extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return{
            title: 'Profile',
            headerRight: <TouchableOpacity onPress={()=>params.logout()}><Text style={{fontSize: 15, fontWeight: 'bold', marginRight: 10}}>logout</Text></TouchableOpacity>
        };
    };

    constructor(props) {
        super(props)

        const { user } = this.props.rootStore.UserStore

        this.state = {
            user: user
        }
    }

    componentDidMount(){
        this.props.navigation.setParams({ logout: this.logout })
        console.log(this.props.rootStore.UserStore.user.imageURL)
    }

    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }


    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Item style={{ backgroundColor: 'orange' }}>
                        <Image
                            style={{
                                paddingVertical: 30,
                                width: 150,
                                height: 150,
                                borderRadius: 75,
                                marginLeft: 100
                            }}
                            source={this.props.rootStore.UserStore.user.imageURL === "" ?
                            require('../assets/profilepicture.png')
                            : { uri: this.props.rootStore.UserStore.user.imageURL }} />
                    </Item>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 30,
                        }}
                    >
                        {this.state.user.username}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 30,
                        }}
                    >
                        {this.state.user.points}
                    </Text>
                </Container>
            </StyleProvider>
        );
    }

}

export default inject("rootStore")(observer(ProfilePage))