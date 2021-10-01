import React from 'react'
import {
  View,
  Alert,
  Text,
  TextInput
} from 'react-native';
import { Button, Icon, TitleBar } from '../../components';
import { Settings } from '../../views';
import * as AuthUtils from './security';
//import { withTheme } from "@callstack/react-theme-provider";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const style =  theme => ({
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
        width: '100%',
    },
    titleBar: {
        color: '#157EFB',
    },
    textColor: {
        //color: theme.colors.contrast,
    }
});

class ChangePasswordComponent extends React.Component {
    state = {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
    };

    onChangeText(key, value) {
        this.setState({
            [key]: value
        })
    }

    async newPassword() {
        const { oldPassword, newPassword, newPasswordConfirm } = this.state;

        if (newPassword !== newPasswordConfirm) {
            Alert.alert('Error when changing password: ', "Passwords don't match");
            return;
        }

        await AuthUtils.changePassword(oldPassword, newPassword)
        .then(() => this.updatePasswordAlert())
        .catch(err => { 
            Alert.alert('Error when changing password: ', err);
        });
    }

    updatePasswordAlert = async () => {
        await Alert.alert(
          'Password Update',
          'Password has been changed.',
          [
            {text: 'OK', onPress: () => this.props.handleNavigation(Settings, 'Settings')},
          ],
          { cancelable: false }
        )
      }

    render() {
        const { handleNavigation, theme } = this.props;
        const  classes = style(theme);
        return (
            <>
                <TitleBar title={'Account Profile'} button={ <Icon name='arrow-back' style={classes.titleBar} size={25} onPress={() => handleNavigation(Settings, 'Settings')}> Settings</Icon>} />        
                <View style={{...this.props.style}}>
                    <KeyboardAwareScrollView contentContainerStyle={classes.container} resetScrollToCoords={{ x: 0, y: 0 }} enableOnAndroid>
                        <View style={{...classes.form}}>
                            <TextInput 
                                style={classes.textInput} 
                                placeholder="Old Password"
                                autoCapitalize='none' 
                                autoCorrect={false} 
                                secureTextEntry={true} 
                                returnKeyType='next' 
                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                onChangeText={value => this.onChangeText('oldPassword', value)}
                            />
                            <Text style={classes.textColor}>
                                Password must contain:
                            </Text>
                            <Text style={classes.textColor}>
                            ·   A minimum of 6 characters,
                            </Text>
                            <Text style={classes.textColor}>
                            ·   At least one uppercase letter (A),
                            </Text>
                            <Text style={classes.textColor}>
                            ·   At least one lowercase letter (a), and
                            </Text>
                            <Text style={classes.textColor}>
                            ·   At least one number (0, 9)
                            </Text>
                            <TextInput 
                                style={classes.textInput} 
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
                                style={classes.textInput} 
                                placeholder='Confirm Password'
                                autoCapitalize='none' 
                                autoCorrect={false} 
                                secureTextEntry={true} 
                                returnKeyType='go'
                                ref={(input) => { this.thirdTextInput = input; }}
                                onChangeText={value => this.onChangeText('newPasswordConfirm', value)}
                                onSubmitEditing={() => this.newPassword()}
                            />
                            <Button title='Change Password' onPress={() => this.newPassword()} style={classes.newPasswordButton}/>
                            <Button title='Cancel' onPress={() => handleNavigation(Settings, 'Settings')} style={classes.newPasswordButton}/>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </>
        );
    }
}

const ChangePassword = withTheme(ChangePasswordComponent);
export { ChangePassword };