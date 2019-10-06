import React from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button,Text } from 'native-base';

function SignUpPage(props) {
    let user = {
        Username: "",
        Email: "",
        Password: ""
    }

    function changeUsername(val) {
        user.Username = val;
    }

    function changeEmail(val) {
        user.Email = val;
    }

    function changePassword(val) {
        user.Password = val;
    }

    async function register(){
        await fetch(`http://ruppinmobile.tempdomain.co.il/site09/api/Users/User`, {
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
                    props.navigation.navigate("LoginPage")
                },
                error => {
                    console.log("=> err post=", error);
                }
            );
    }

    return (
        <Container>
            <Header />
            <Content>
                <Form>
                    <Item fixedLabel>
                        <Label>Username</Label>
                        <Input onChangeText={val=>changeUsername(val)}/>
                    </Item>
                    <Item fixedLabel>
                        <Label>Email</Label>
                        <Input onChangeText={val=>changeEmail(val)}/>
                    </Item>
                    <Item fixedLabel last>
                        <Label>Password</Label>
                        <Input onChangeText={val=>changePassword(val)}/>
                    </Item>
                    <Button rounded onPress={()=>props.navigation.navigate('CameraPage')}>
                        <Text>camera</Text>
                    </Button>

                    <Button rounded onPress={register}>
                        <Text>LOGIN</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}

export default SignUpPage;