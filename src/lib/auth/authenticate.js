import React from 'react'
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';

//import DocumentsOptionsLogo from "../../assets/documents_Options_ScreenOnePiece.svg";
//import { SignIn, RequireNewPassword, ForgotPassword } from './index';

const style =  theme => ({
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
    }
});

export default class AuthenticateComponent extends React.Component {
    render() {
        const { authEvent, username, user, theme } = this.props;
        const  classes = style(theme);
        return (
            <View style={classes.container}>
                <TouchableWithoutFeedback 
                    style={classes.container} 
                    onPress={Keyboard.dismiss}>
                    <View style={{...this.props.style, ...classes.container}}>
                        {/* <DocumentsOptionsLogo style={classes.background} /> */}
                        <View style={classes.screenContainer}>
                            <View style={classes.header}/>
                                {/* {
                                    this.renderSwitch(authEvent, username, user)
                                } */}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    };

    // renderSwitch = (authEvent, username, user) => {
    //     switch (authEvent) {  
    //         case 'signIn':
    //             return <SignIn username={username}/>
    //         case 'NEW_PASSWORD_REQUIRED':
    //             return <RequireNewPassword user={user}/>
    //         case 'forgotPassword':
    //             return <ForgotPassword/>
    //         default:
    //             return <SignIn username={username}/>
    //     }
    // }
}
