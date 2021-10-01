import React from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { Icon } from './';
import { Capture, Review, Help, Settings } from '../views';
import * as AuthUtils from '../lib/auth/security';
import { connect } from 'react-redux';
import { navigationActions }  from '../lib/redux/actions';

const icon_size = 30;
const default_color = '#157EFB';
const selected_color = '#A9A9A9';

// @connect(store => ({
//     navigation: store.navigation
// }),
// dispatch => ({
//     viewClicked: (view) => ( dispatch(navigationActions.viewClicked(view)))
// }))

export class BottomNav extends React.Component {
    render() {
        const { navigation, viewClicked } = this.props;
        return (
        <View style={styles.container} elevation={3}>
            <TouchableOpacity style={styles.iconButton} onPress={() => { viewClicked('capture'); this.props.onPress(Capture, 'Capture')}}>
                <Icon name='camera' style={{color: navigation.view === 'capture' ? selected_color : default_color}} size={icon_size}/>
                <Text style={{...styles.buttonText, color: navigation.view === 'capture' ? selected_color : default_color}}>Capture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => { viewClicked('review'); this.props.onPress(Review, 'Review Docs')}}>
                <Icon name='list-box' style={{color: navigation.view === 'review' ? selected_color : default_color}} size={icon_size}/>
                <Text numberOfLines={1} style={{...styles.buttonText, color: navigation.view === 'review' ? selected_color : default_color}}>Review Docs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => { viewClicked('help'); this.props.onPress(Help, 'Help') }}>
                <Icon name='help-buoy' style={{color: navigation.view === 'help' ? selected_color : default_color}} size={icon_size}/>
                <Text style={{...styles.buttonText, color: navigation.view === 'help' ? selected_color : default_color}}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => { viewClicked('settings'); this.props.onPress(Settings, 'Settings') }}>
                <Icon name='options' style={{color: navigation.view === 'settings' ? selected_color : default_color}} size={icon_size}/>
                <Text style={{...styles.buttonText, color: navigation.view === 'settings' ? selected_color : default_color}}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={this.signOutAlert}>
                <Icon name='log-out' style={{color: default_color}} size={icon_size}/>
                <Text style={{...styles.buttonText, color: default_color}}>Sign-Out</Text>
            </TouchableOpacity>
        </View>
    )}

    signOutAlert = async () => {
        await Alert.alert(
          'Sign Out',
          'Are you sure you want to sign out from the app?',
          [
            {text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
            {text: 'OK', onPress: () => this.signOut()},
          ],
          { cancelable: false }
        )
      }

    signOut = async () => {
        this.props.onPress(undefined);
        await AuthUtils.signOut();
    }
}

const styles =  StyleSheet.create({
    container: {
        height: 70,
        width: '100%',
        backgroundColor: '#E6E9F1',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'flex-end',

    },
    iconButton: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 12
    }
});