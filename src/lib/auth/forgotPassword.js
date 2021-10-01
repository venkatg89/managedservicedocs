import React from 'react'
import {
  View,
  Alert,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { Button } from '../../components';
import * as AuthUtils from './security';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export class ForgotPassword extends React.Component {
    state = {
        username: '',
        forgotPasswordSent: false,
        code: '',
        newPassword: '',
        newPasswordConfirm: ''
    };

    onChangeText(key, value) {
        this.setState({
            [key]: value
        })
    }

    async forgotPassword() {
        const { username } = this.state;

        await AuthUtils.forgotPassword(username)
        .then(() => {this.setState({forgotPasswordSent: true})})
        .catch(err => { 
            Alert.alert('Error forgot password: ', err);
        });
    }

    async forgotPasswordSubmit() {
        const { username, code, newPassword, newPasswordConfirm } = this.state;

        if (newPassword !== newPasswordConfirm) {
            Alert.alert('Error when changing password: ', "Passwords don't match");
            return;
        }

        await AuthUtils.forgotPasswordSubmit(username, code, newPassword)
        .then(() => {
            Alert.alert('Password updated.  Please Sign In.')
            AuthUtils.dispatch('auth', { event: 'signIn' }, 'Auth' )
        })
        .catch(err => { 
            Alert.alert('Error forgot password: ', err);
        });
    }

    onCancel() {
        AuthUtils.dispatch('auth', { event: 'signIn' }, 'Auth' );
    }

    render() {
        const { forgotPasswordSent } = this.state;
        return (
            <View style={styles.viewContainer}>
                <KeyboardAwareScrollView contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }}>
                    <View style={styles.form}>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder='Email'
                            autoCapitalize='none' 
                            autoCorrect={false} 
                            textContentType='username' 
                            keyboardType='email-address'
                            returnKeyType='next' 
                            onChangeText={value => this.onChangeText('username', value)}
                            editable={!forgotPasswordSent}
                            onSubmitEditing={() => this.forgotPassword()}
                        />
                        { forgotPasswordSent ?
                            <>
                                <TextInput 
                                    style={styles.textInput} 
                                    placeholder="Code"
                                    autoCapitalize='none' 
                                    autoCorrect={false} 
                                    returnKeyType='next' 
                                    keyboardType='numeric'
                                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    onChangeText={value => this.onChangeText('code', value)}
                                />
                                <Text style={styles.textColor}>
                                Password must contain:
                                </Text>
                                <Text style={styles.textColor}>
                                ·   A minimum of 6 characters,
                                </Text>
                                <Text style={styles.textColor}>
                                ·   At least one uppercase letter (A),
                                </Text>
                                <Text style={styles.textColor}>
                                ·   At least one lowercase letter (a), and
                                </Text>
                                <Text style={styles.textColor}>
                                ·   At least one number (0, 9)
                                </Text>
                                <TextInput 
                                    style={styles.textInput} 
                                    placeholder="Password"
                                    autoCapitalize='none' 
                                    autoCorrect={false} 
                                    secureTextEntry={true} 
                                    returnKeyType='next' 
                                    ref={(input) => { this.secondTextInput = input; }}
                                    onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                                    onChangeText={value => this.onChangeText('newPassword', value)}
                                />
                                <TextInput 
                                    style={styles.textInput} 
                                    placeholder='Confirm Password'
                                    autoCapitalize='none' 
                                    autoCorrect={false} 
                                    secureTextEntry={true} 
                                    returnKeyType='go'
                                    ref={(input) => { this.thirdTextInput = input; }}
                                    onChangeText={value => this.onChangeText('newPasswordConfirm', value)}
                                    onSubmitEditing={() => this.forgotPasswordSubmit()}
                                />
                                <Button title='Change Password' onPress={() => this.forgotPasswordSubmit()} style={styles.newPasswordButton} color={'white'}/>                          
                            </>
                        : 
                            <>
                                <Button title='Forgot Password' onPress={() => this.forgotPassword()} style={styles.newPasswordButton} color={'white'}/>   
                            </>
                        }
                        <Button title='Cancel' onPress={() => this.onCancel()} style={styles.newPasswordButton} color={'white'}/>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        backgroundColor: 'white',
        width: 300,
        height: 40
    },
    form: {
        flex: .63,
        width: 300,
        justifyContent: 'space-around'
    },
    newPasswordButton: {
        width: '100%'
    }, 
    textColor: {
        color: 'white',
    }  
});