import React from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { KeyboardAvoidingView, ScrollView, AsyncStorage } from 'react-native'
import { observer, inject } from 'mobx-react';
import User from '../Classes/User'
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

const AppID = '514084169415898';
const googleIOSClientID = "478192099665-t6ehj9l5jjsgnl6skpj0o7kie2t43anj.apps.googleusercontent.com"
const googleAndroidClientID = "478192099665-0rp515m0fkgqebev04qompgtc7ms25m9.apps.googleusercontent.com"

function Login(props) {

  let user =
  {
    email: null,
    password: null
  }

  function changeEmail(val) {
    user.email = val
  }

  function changePass(val) {
    user.password = val
  }

  async function login() {
    console.log(user)

    await fetch(`http://ruppinmobile.tempdomain.co.il/site09/api/Users/${user.email},${user.password}/login`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json;',
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch GET= ", result);
          if (typeof result == "string") {
            alert(result);
          } else {
            //console.log(result)
            let user = new User(result.UserID, result.Email, result.Password, result.Username, result.IsInMatch, result.MatchID, result.Points);
            props.rootStore.UserStore.insertUser(user);
            AsyncStorage.setItem('user', JSON.stringify(user))
            props.navigation.navigate("App")
          }
        },
        error => {
          console.log("=> err post=", error);
        }
      );
  }

  async function btnLoginFB() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(AppID,
      { permissions: ['public_profile', 'email'], });
    if (type === 'success') {
      //after getting the token we can use a simple fetch against the facebook API
      // Get the user's name using Facebook's Graph API
      const response = await
        fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`);
      let res = await response.json();
      props.rootStore.UserStore.FBToken = token;
      alert('Logged in!' + `Hi NAME: ${res.name}!\nEMAIL: ${res.email}\nPICTURE:
    ${res.picture}\nRES:${JSON.stringify(res)} `);

      console.log(JSON.stringify(res))

      let user = {
        id: res.id,
        username: res.name,
        email: res.email
      }
      console.log(typeof user.userID)
      await fetch(`http://ruppinmobile.tempdomain.co.il/site09/Users.asmx/GetLoginDetailsFB`, {
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
            let u = JSON.parse(result.d);
            let u2 = new User(u.UserID, u.Email, u.Password, u.Username, u.IsInMatch, u.MatchID, u.Points, res.picture.data.url);
            props.rootStore.UserStore.user = u2;
            AsyncStorage.setItem('user', JSON.stringify(u2))
            props.navigation.navigate("App");
          },
          error => {
            console.log("=> err post=", error);
          }
        );


    } else {
      // type === 'cancel'
      console.log("cancelled")
    }
  };

  async function btnLoginG() {
    // First- obtain access token from Expo's Google API
    try {
      const result = await Google.logInAsync({
        androidClientId: googleAndroidClientID,
        iosClientId: googleIOSClientID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log(result.user);
        let usertemp = {
          id: result.user.id,
          username: result.user.name,
          email: result.user.email
        }

        await fetch(`http://ruppinmobile.tempdomain.co.il/site09/Users.asmx/GetLoginDetailsGoogle`, {
          method: "POST",
          body: JSON.stringify(usertemp),
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
              let u = JSON.parse(result.d);
              let u2 = new User(u.UserID, u.Email, u.Password, u.Username, u.IsInMatch, u.MatchID, u.Points, result.user.photoUrl);
              props.rootStore.UserStore.user = u2;
              AsyncStorage.setItem('user', JSON.stringify(u2))
              props.navigation.navigate("App");
            },
            error => {
              console.log("=> err post=", error);
            }
          );

      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error");
    }
  }

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }


  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <Header />
          <Content>
            <Form>
              <Item fixedLabel>
                <Label>Email</Label>
                <Input onChangeText={val => changeEmail(val)} />
              </Item>
              <Item fixedLabel last>
                <Label>Password</Label>
                <Input onChangeText={val => changePass(val)} />
              </Item>
            </Form>
            <Button rounded onPress={login}>
              <Text>LOGIN</Text>
            </Button>
            <Button rounded onPress={btnLoginFB}>
              <Text>Facebook LOGIN</Text>
            </Button>
            <Button rounded onPress={btnLoginG}>
              <Text>GOOGLE LOGIN</Text>
            </Button>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}


export default inject('rootStore')(observer(Login))
