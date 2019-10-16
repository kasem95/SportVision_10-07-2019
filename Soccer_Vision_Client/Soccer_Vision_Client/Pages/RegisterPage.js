import React from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { observer, inject } from 'mobx-react';


class SignUpPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Username: "",
            Email: "",
            Password: "",
        }
    }

    changeUsername = (val) => {
        this.setState({
            Username: val
        })
    }

    changeEmail = (val) => {
        this.setState({
            Email: val
        })
    }

    changePassword = (val) => {
        this.setState({
            Password: val
        })
    }

    register = async () => {
        let user = {
            Username: this.state.Username,
            Email: this.state.Email,
            Password: this.state.Password
        }

        await fetch(`http://ruppinmobile.tempdomain.co.il/site09/api/User`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                console.log("res=", res);
                return res.json();
            })
            .then(
                result => {
                    console.log("fetch GET= ", result);
                    this.props.navigation.navigate("LoginPage")
                },
                error => {
                    console.log("=> err post=", error);
                }
            );

        /*if (this.props.rootStore.UserStore.PhotoURI !== "") {
            console.log(this.props.rootStore.UserStore.PhotoURI)
            this.imageUpload(this.props.rootStore.UserStore.PhotoURI, user.Username + "_Picture.jpg")
        }*/

    }

    imageUpload = async (imgUri, picName) => {
        let urlAPI = "http://ruppinmobile.tempdomain.co.il/site09/uploadpicture";
        let dataI = new FormData();
        dataI.append('picture', {
            uri: imgUri,
            name: picName,
            type: 'image/jpg'
        });
        const config = {
            method: 'POST',
            body: dataI,
        };

        console.log(config.body)

        await fetch(urlAPI, config)
            .then((responseData) => {
                console.log(responseData)
                if (responseData.status === 201) {
                    alert('uploaded successfully!')
                }
                else {
                    alert('error uploding ...');
                }
            })
            .catch(err => {
                alert('err upload= ' + err);
            });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <Container>
                    <Header />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CameraPage')}>
                        <Image style={{
                            paddingVertical: 30,
                            width: 150,
                            height: 150,
                            borderRadius: 75,
                            marginLeft: 100
                        }}
                            resizeMode='cover'
                            source={this.props.rootStore.UserStore.PhotoURI === "" ?
                                require('../assets/profilepicture.png')
                                : { uri: this.props.rootStore.UserStore.PhotoURI }}
                        />
                    </TouchableOpacity>

                    <Content>
                        <Form>
                            <Item fixedLabel>
                                <Label>Username</Label>
                                <Input onChangeText={val => this.changeUsername(val)} />
                            </Item>
                            <Item fixedLabel>
                                <Label>Email</Label>
                                <Input onChangeText={val => this.changeEmail(val)} />
                            </Item>
                            <Item fixedLabel>
                                <Label>Password</Label>
                                <Input onChangeText={val => this.changePassword(val)} />
                            </Item>
                            <Button rounded onPress={this.register}>
                                <Text>REGISTER</Text>
                            </Button>

                        </Form>
                    </Content>

                </Container>
            </KeyboardAvoidingView >
        )
    }
}

export default inject('rootStore')(observer(SignUpPage));