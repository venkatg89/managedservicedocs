import React from 'react'
import {
  View,
  Alert,
  TextInput,
  StyleSheet
} from 'react-native';

import { Button } from '../../components';

import * as AuthUtils from './security';

export class ConfirmSignUp extends React.Component {
    state = {
        username: '',
        authCode: ''
    }

    onChangeText(key, value) {
        this.setState({
          [key]: value
        })
    }

    async confirmSignUp() {
        const { username, authCode } = this.state;
        await AuthUtils.confirmSignUp(username, authCode)
        .then(() => {Alert.alert('Confirm sign up successful.');})
        .catch(err => { 
            Alert.alert('Error when entering confirmation code: ', err);
        });
    }

    async resendSignUp() {
        const { username } = this.state;
        await AuthUtils.resendSignUp(username)
        .then(() => {Alert.alert('Confirmation code resent successfully');})
        .catch(err => { 
            Alert.alert('Error requesting new confirmation code: ', err);
        });
    }

    render() {
        return (
            <View style={styles.form}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Email"
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    keyboardType='email-address'
                    returnKeyType='next' 
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    onChangeText={value => this.onChangeText('username', value)}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder='Confirmation Code'
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    keyboardType='numeric'
                    returnKeyType='go'
                    ref={(input) => { this.secondTextInput = input; }}
                    onChangeText={value => this.onChangeText('authCode', value)}
                />
                <Button title='Confirmation Code' onPress={() => this.confirmSignUp()} style={styles.signUpButton}/>
                <Button title='Resend Code' onPress={() => this.resendSignUp()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        position: 'absolute',
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    textInput: {
        backgroundColor: 'white',
        width: 300,
        height: 40
    },
    screenContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1
    },
    header: {
        width: '90%',
        flex: .25
    },
    form: {
        flex: .63,
        width: 300,
        justifyContent: 'space-around'
    },
    signUpButton: {
        width: '100%'
    }, 
});