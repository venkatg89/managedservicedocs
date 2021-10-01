import React from 'react'
import {
  View,
  Alert,
  TextInput,
  StyleSheet
} from 'react-native';

import { Button } from '../../components';
import * as AuthUtils from './security';

export class SignUp extends React.Component {
    state = {
        password: '',
        email: ''
    };

    onChangeText(key, value) {
        this.setState({
            [key]: value
        })
    }

    async signUp() {
        const { email, password } = this.state;

        await AuthUtils.signUp(email, password)
        .then(() => {Alert.alert('Enter the confirmation code you received.');})
        .catch(err => { 
            Alert.alert('Error when signing up: ', err);
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
                    onChangeText={value => this.onChangeText('email', value)}
                />
                <TextInput 
                    style={styles.textInput} 
                    placeholder='Password'
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    secureTextEntry={true} 
                    returnKeyType='go'
                    ref={(input) => { this.secondTextInput = input; }}
                    onChangeText={value => this.onChangeText('password', value)}
                />
                <Button title='Sign-Up' onPress={() => this.signUp()} style={styles.signUpButton} />
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