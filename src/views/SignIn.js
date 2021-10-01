import React from 'react';
import { View, 
    Text,
    TextInput,
    Switch,
    ActionSheetIOS,
    Platform,
    Linking } from 'react-native';

import { BottomSheet, Button } from '../components';
import { withTheme } from "@callstack/react-theme-provider";
import DocumentsOptionsLogo from "../assets/documents_Options_ScreenOnePiece.svg";
const supportEmail = 'MSMobileAppSupport@jjkeller.com';
const supportEmailSubject = 'Managed Services Mobile App Support';
const supportPhoneNumber = '1-833-813-7264'

const style = theme => ({
    container: {
        flex: 1,
        backgroundColor: '#245f9b'
    },
    background: {
        position: 'absolute',
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    textInput: {
        backgroundColor: theme.colors.contrast,
        width: 300,
        height: 40
    },
    screenContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1
    },
    header: {
        flex: .25
    },
    form: {
        flex: .63,
        width: 300,
        justifyContent: 'space-around'
    },
    menuItem: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    signInButton: {
        width: '100%'
    }, 
    link :{
        fontWeight: 'bold',
        color: theme.colors.contrast
    }
});

class SignInComponent extends React.Component {
    state = { showActions : false }

    render() {
        const { theme } = this.props;
        const classes = style(theme);
        return (
            <View style={{...this.props.style, ...classes.container}}>
                <DocumentsOptionsLogo style={classes.background} />
                <View style={classes.screenContainer}>
                    <View style={classes.header}/>
                    <View style={classes.form}>
                        <Text>Please Sign-In</Text>
                        <TextInput style={classes.textInput}/>
                        <TextInput style={classes.textInput} type='password'/>
                        <View style={{flexDirection: 'row' }}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{width: 70}}>Remember User ID</Text>
                                <Switch />
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{width: 70}}>Enable Touch ID</Text>
                                <Switch />
                            </View>
                        </View>
                        <Button title='Sign-In' onPress={() => { }}  style={classes.signInButton}/>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Text style={classes.link} onPress={() => { this.setState({ showActions: true })}}>Trouble Signing-In?</Text>
                            <Text style={classes.link}>Forgot Password?</Text>
                        </View>
                    </View>
                    { Platform.OS == 'ios' ? this.renderIOSActionSheet() : this.renderAndroidActionSheet() }
                </View>
            </View>
        )
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
                break;
            case 1:
                Linking.openURL(`mailto:${supportEmail}?subject=${supportEmailSubject}`);
                break;
            case 2:
                this.setState({ showActions: false });
                break;
        }
    }
}

const SignIn = withTheme(SignInComponent);
export { SignIn };