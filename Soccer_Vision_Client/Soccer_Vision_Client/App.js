import React from 'react';
import { createAppContainer, createSwitchNavigator } from
  'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/RegisterPage';
import MainPage from './Pages/MainPage'
import CameraPage from './Pages/CameraPage'
import ProfilePage from './Pages/ProfilePage'
import { Provider } from 'mobx-react';
import Store from './Classes/Store'
import { AppLoading } from 'expo';
import { Container } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AuthLoadingScreen from './Components/AuthLoadingScreen'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {

    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider rootStore={Store}>
        <Container>
          <AppContainer />
        </Container>
      </Provider>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    ProfilePage,
    MainPage,
  }
);
const AuthStack = createStackNavigator(
  {
    Home, 
    LoginPage,
    SignUpPage,
    CameraPage,
  }
); 

const AppContainer = createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppNavigator,
  Auth: AuthStack,
},{
  initialRouteName: 'AuthLoading'
}))
export default App;
