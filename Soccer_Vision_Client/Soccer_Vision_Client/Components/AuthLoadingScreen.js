import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { observer, inject } from 'mobx-react';

class AuthLoadingScreen extends React.Component {
  constructor(props){
      super(props);
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const data = await AsyncStorage.getItem('user');
    const user = JSON.parse(data);
    this.props.rootStore.UserStore.user = user;
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    this.props.navigation.navigate(user!==null ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default inject('rootStore')(observer(AuthLoadingScreen));