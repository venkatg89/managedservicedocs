import React from 'react';
import { BackHandler, AppState, View, SafeAreaView, StatusBar, Text } from 'react-native';
import { Menu } from './src/views';
import { BottomNav, Slide, requestCameraPermission, UserDefaultsViewManager } from './src/components';

import SplashScreen from 'react-native-splash-screen';

import { Authenticate } from './src/lib/auth';
import * as AuthUtils from './src/lib/auth/security';
import { connect } from 'react-redux';
import { settingActions } from './src/lib/redux/actions';
import { tealPandaStore } from './src/lib/redux/tealPandaStore.js';
import { eulaActions } from './src/lib/redux/actions';

import { createTheming } from '@callstack/react-theme-provider';
import defaultTheme from './src/lib/theme/defaultTheme';
const { ThemeProvider, withTheme, useTheme } = createTheming(defaultTheme);

const style = theme => ({
  safeArea: {
    backgroundColor: theme.colors.titleBar,
    flex: 1,
  },
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: theme.colors.backgroundColor,
    flex: 1,
    zIndex: 2
  },
  lastScreenContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1
  },
  activeScreen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'stretch',
    overflow: 'visible'
  }
});

// @connect(store => ({}),
//   dispatch => (
//     {
//       loadSettings: () => ( dispatch( settingActions.loadSettings() ) ) 
//     }
//   )
// )
class App extends React.Component{
  state = {
    ActiveScreen: undefined,
    navStack: [],
    appState: AppState.currentState, 
    touchIdEnabled: undefined,
    shouldSlide: false, 
    signedIn: false,
    user: null,
    authEvent: '',
    username: ''
  };

  componentWillMount() {
    AuthUtils.init();
    AuthUtils.listen('auth', this.authListener);
  }

  authListener = (data) => {
    const { channel, payload } = data;
    if (channel === 'auth') {
      switch (payload.event) {
        case 'signIn':
          this.loadUser();
          this.setState({ authEvent: payload.event, username: payload.username ? payload.username : '' });
          break;
        case 'signIn_failure':
          this.setState({ authEvent: payload.event });
          break;
        case 'signOut':
        case 'forgotPassword':
          this.setState({ signedIn: false, user: null, authEvent: payload.event })
          break;
        case 'NEW_PASSWORD_REQUIRED':
          this.setState({ signedIn: false, user: payload.user ? payload.user : null, authEvent: payload.event })
          break;
        default:
          break;
      }
    }
  }

  async componentDidMount() {
    SplashScreen.hide();
    this.loadUser();

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.eula();
    requestCameraPermission();
    
    AppState.addEventListener('change', this.handleAppStateChange); 
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  eula = async () => {
    await UserDefaultsViewManager.getUserDefaultAcceptEula(value => {
      tealPandaStore.dispatch(eulaActions.getDeviceEula(value));
    })
  }

  loadUser = async () => {
    // await AuthUtils.getCurrentAuthenticatedUser()
    // .then(user => { 
    //   this.setState({ signedIn: true, user: user });
    //   this.props.loadSettings();
    // })
    // .catch(() => { 
    //   this.setState({ signedIn: false, user: null });
    // });
  }

  handleNavigation = (newScreen, title, props) => { 
    let { navStack } = this.state;
    
    let thisScreen = navStack.length ? navStack[navStack.length - 1] : undefined;

    if (thisScreen && thisScreen.title == title) {
      return;
    }

    navStack.push({screen: newScreen, title});

    this.setState({
      ActiveScreen: newScreen, 
      screenTitle: title,
      navStack,
      props: props,
      LastScreen: thisScreen && thisScreen.screen,
      lastScreenTitle: thisScreen && thisScreen.title,
      shouldSlide: true
    }); 
  }

  handleBackButton = () => {
    let { navStack } = this.state;
    
    if(navStack.length == 0) {
      return false;
    }

    let thisScreen = navStack.pop();

    lastScreen = navStack.length ? lastScreen = navStack[navStack.length - 1] : undefined;

    this.setState({
      navStack, 
      ActiveScreen: lastScreen ? lastScreen.screen : undefined,
      LastScreen: thisScreen && thisScreen.screen,
      lastScreenTitle: thisScreen && thisScreen.title,
      screenTitle: lastScreen && lastScreen.title,
      shouldSlide: true 
    });

    return true;
  }

  handleAppStateChange = async nextAppState => {
    if ( this.state.appState.match(/inactive|background/) && nextAppState === 'active') {    
    }
    
    if( this.state.appState === ('active') && nextAppState.match(/inactive|background/)) {
    }

    this.setState({appState: nextAppState});
  }

  render() {

    console.log('theme', this.props);

    const { ActiveScreen, screenTitle, props, LastScreen, signedIn, authEvent, username, user } = this.state;
    const  classes = style(defaultTheme);
    return ( 
      signedIn ?
      ActiveScreen ?
        (
          <SafeAreaView style={classes.safeArea}>
            <StatusBar backgroundColor="#235e9b" />
            <View style={classes.container}>
              {LastScreen ?
                <View style={classes.lastScreenContainer}>
                  <LastScreen style={classes.activeScreen} />
                </View> : null}
              <Slide duration={250} style={classes.container} animateOnUpdate={() => (this.state.shouldSlide)} onAnimationComplete={() => { this.setState({ shouldSlide: false, LastScreen: undefined }) }} >
                <ActiveScreen style={classes.activeScreen} handleNavigation={this.handleNavigation} {...props} />
              </Slide>
              {screenTitle ? <BottomNav onPress={this.handleNavigation} /> : null}
            </View>
          </SafeAreaView>
        )
        : <Menu onSelect={this.handleNavigation} />
      :
        <SafeAreaView style={classes.safeArea}>
          <Authenticate authEvent={authEvent} username={username} user={user} />
        </SafeAreaView>
    );
  }
}


class AppTheme extends React.Component {

  render() {
    return (
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )
  }
}

export default AppTheme;