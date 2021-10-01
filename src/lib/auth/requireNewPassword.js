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

export class RequireNewPassword extends React.Component {
    state = {
        newPassword: '',
        newPasswordConfirm: ''
    };

    onChangeText(key, value) {
        this.setState({
            [key]: value
        })
    }

    async newPassword() {
        const { newPassword, newPasswordConfirm } = this.state;
        const { user } = this.props;

        if (newPassword !== newPasswordConfirm) {
            Alert.alert('Error when changing password: ', "Passwords don't match");
            return;
        }

        await AuthUtils.completeNewPassword(user, newPassword)
        .then()
        .catch(err => { 
            Alert.alert('Error when changing password: ', err);
        });
    }

    onCancel() {
        AuthUtils.dispatch('auth', { event: 'signIn' }, 'Auth' );
    }

    render() {
        return (
            <View style={styles.viewContainer}>
                <KeyboardAwareScrollView contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }}>
                    <View style={styles.form}>
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
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            onChangeText={value => this.onChangeText('newPassword', value)}
                        />
                        <TextInput 
                            style={styles.textInput} 
                            placeholder='Confirm Password'
                            autoCapitalize='none' 
                            autoCorrect={false} 
                            secureTextEntry={true} 
                            returnKeyType='go'
                            ref={(input) => { this.secondTextInput = input; }}
                            onChangeText={value => this.onChangeText('newPasswordConfirm', value)}
                            onSubmitEditing={() => this.newPassword()}
                        />
                        <Button title='Change Password' onPress={() => this.newPassword()} style={styles.newPasswordButton} color={'white'}/>
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
    newPasswordButton: {
        width: '100%'
    }, 
    textColor: {
        color: 'white',
    }
});