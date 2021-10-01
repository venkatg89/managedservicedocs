import React from 'react'
import {
  Text,
  View,
  Alert,
  TextInput,
  StyleSheet,
  ActionSheetIOS,
  Linking,
  Platform,
  Modal,
  ScrollView,
  Dimensions
} from 'react-native';

import { BottomSheet, Button, EulaText, PrivacyPolicyText, UserDefaultsViewManager } from '../../components';
import * as AuthUtils from './security';
import { connect } from 'react-redux';
import { eulaActions }  from '../redux/actions';

const supportEmail = 'MSMobileAppSupport@jjkeller.com';
const supportEmailSubject = 'Managed Services Mobile App Support';
const supportPhoneNumber = '1-833-813-7264';

// @connect((store) => ({
//     accepted: store.eula.accepted
// }),
// dispatch => ({
//     getDeviceEula: (value) => ( dispatch( eulaActions.getDeviceEula(value) ) ) 
// }))
export class SignIn extends React.Component {
    state = {
        username: '',
        password: '',
        showActions : false,
        width: (Dimensions.get('window').width * 90) / 100, 
        height: (Dimensions.get('window').height * 80) / 100
    };

    onChangeText(key, value) {
        this.setState({
            [key]: value
        })
    }

    async signIn() {
        const { username, password } = this.state;

        await AuthUtils.signIn(username, password)
        .then()
        .catch(err => { 
            Alert.alert('Error when signing in: ', err);
        });
    }

    forgotPassword() {
        AuthUtils.dispatch('auth', { event: 'forgotPassword' }, 'Auth' );
    }

    render() {
        const { showActions, width, height  } = this.state;
        const { accepted } = this.props;
        return (
            <>
            <View style={styles.form}>
                <Text style={styles.textColor}>Please Sign-In</Text> 
                <TextInput 
                    style={styles.textInput} 
                    placeholder='Email'
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    textContentType='username' 
                    keyboardType='email-address'
                    returnKeyType='next' 
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    onChangeText={value => this.onChangeText('username', value)}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder='Password'
                    autoCapitalize='none' 
                    autoCorrect={false}  
                    textContentType='password' 
                    secureTextEntry={true} 
                    returnKeyType='go'
                    ref={(input) => { this.secondTextInput = input; }}
                    onChangeText={value => this.onChangeText('password', value)}
                    onSubmitEditing={() => this.signIn()}
                />
                <Button title='Sign-In' onPress={() => this.signIn()} style={styles.signInButton}/>
                <View style={{flexDirection: 'row', width: '100%', justifyContent:'space-between'}}>
                    <Text style={styles.link} onPress={() => { this.setState({ showActions: true })}}>Trouble Signing-In?</Text>
                    <Text style={styles.link} onPress={() => this.forgotPassword()}>Forgot Password?</Text>
                </View>
                <Modal 
                    animationType={"fade"} 
                    transparent={true}
                    visible={accepted !== 'true' && accepted !== undefined}
                    onRequestClose= {() => {}}>      
                    <View style={styles.modal}>
                        <View style={[styles.modalContainer, {width: width}]}>
                            <View style={[styles.agreementView, {height: height}]}>
                                <ScrollView>
                                    <EulaText textStyle={{color: 'black'}}/>
                                    <PrivacyPolicyText textStyle={{color: 'black'}}/>
                                </ScrollView>
                                <View style={styles.agreementAccept}>
                                    <Button title='Accept' color='#000000' onPress={() => this.acceptEula()}/>
                                </View>
                            </View>
                            <View style={styles.agreementCancel}>                            
                                <Button title='Cancel' color='#000000' onPress={() => this.cancelEula()}/>
                            </View>
                        </View>
                    </View>         
                </Modal>                         
            </View> 
            { 
                showActions ?
                Platform.OS == 'ios' ? this.renderIOSActionSheet() : this.renderAndroidActionSheet()
                : <></>
            }  
            </>
        )
    };

    acceptEula = () => {
        UserDefaultsViewManager.setAcceptEula('true');
        UserDefaultsViewManager.getUserDefaultAcceptEula(value => {
            this.props.getDeviceEula(value);
        });
    }

    cancelEula = () => {
        UserDefaultsViewManager.cancelEula();
    }

    renderIOSActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Call J.J. Keller Technical Support', 'e-mail J.J. Keller Technical Support', 'Cancel'],
                cancelButtonIndex: 2
            },
            this.handleAction
        )
    }

    renderAndroidActionSheet = () => ( 
        <BottomSheet
        options={['Call J.J. Keller Technical Support', 'e-mail J.J. Keller Technical Support', 'Cancel']} 
        onSelected={this.handleAction} shown={this.state.showActions} onHide={() => this.setState({showActions: false})}/>
    )

    handleAction = (idx) => {
        switch(idx) {
            case 0:
                Linking.openURL(`tel:${supportPhoneNumber}`);
                this.setState({ showActions: false });
                break;
            case 1:
                Linking.openURL(`mailto:${supportEmail}?subject=${supportEmailSubject}`);
                this.setState({ showActions: false });
                break;
            case 2:
                this.setState({ showActions: false });
                break;
        }
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        width: 300,
        height: 40
    },
    textColor: {
        color: 'white'
    },
    form: {
        flex: .63,
        width: 300,
        justifyContent: 'space-around'
    },
    signInButton: {
        width: '100%'
    }, 
    link :{
        fontWeight: 'bold',
        color: 'white'
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    agreementView: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10
    },
    agreementAccept: {
        justifyContent: 'center',
        height: 50,
    },
    agreementCancel: {
        padding: 10,
        justifyContent: 'center',
        height: 60,
        backgroundColor: 'white',  
        borderRadius: 10,
        marginTop: 10
    }
});