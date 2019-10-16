import React from 'react'
import {
    Container,
    Title,
    Header,
    Button,
    Right,
    Body,
    Text
} from "native-base";
import {AsyncStorage} from 'react-native'
import { observer, inject } from 'mobx-react'

class MainPage extends React.Component{

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        title: 'Home'
    }


    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render(){
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>{this.props.rootStore.UserStore.user.username}</Title>
                    </Body>
                    <Right />
                </Header>
                <Button rounded light style={{ marginBottom: 20 }}>
                    <Text>Profile</Text>
                </Button>
                <Button rounded light style={{ marginBottom: 20 }}>
                    <Text>Matches</Text>
                </Button>
                <Button rounded light style={{ marginBottom: 20 }}>
                    <Text>Create Match</Text>
                </Button>
                <Button rounded light style={{ marginBottom: 20 }} onPress={this.logout}>
                    <Text>LOGOUT</Text>
                </Button>
            </Container>
        );
    }
    
}

export default inject('rootStore')(observer(MainPage))