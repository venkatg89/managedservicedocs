import Auth from '@aws-amplify/auth';
import Amplify, { Hub } from '@aws-amplify/core';
import config from '../utils/configFile';
import { NotificationService } from '../pushNotification';
import { Alert } from 'react-native';

const amplifyConfiguration = () => {
    Amplify.configure({
        Auth: {
            // REQUIRED - Amazon Cognito Identity Pool ID
            identityPoolId: config.IdentityPoolId,
            // REQUIRED - Amazon Cognito Region
            region: config.Region,
            // OPTIONAL - Amazon Cognito User Pool ID
            userPoolId: config.UserPoolId,
            // OPTIONAL - Amazon Cognito Web Client ID
            userPoolWebClientId: config.UserPoolWebClientId,
        },
        Analytics: {
            AWSPinpoint: {
                appId: config.PinPointAppId
            }
        }
    });
}

const getCurrentAuthenticatedUser = () => {
    return new Promise(async (resolve, reject) => {
        Auth.currentAuthenticatedUser()
        .then(user => {
            resolve(user);
        }).catch(e => {
            console.log(e);
            reject(e);
        })
    });
}

export const getCurrentSession = () => {
    return new Promise(async (resolve, reject) => {
        Auth.currentSession()
        .then(session => {
            resolve(session)
        })
        .catch(e => {
            console.log(e)
            reject(e)
        })
    })
}

export const getCurrentUserCredentials = () => {
    return new Promise(async (resolve, reject) => {
        Auth.currentUserCredentials()
        .then(user => {
            resolve(user)
        })
        .catch(e => {
            console.log(e)
            reject(e)
        })
    })
}

export const getCurrentCredentials = async () => (
    await Auth.currentUserCredentials()
);

export const getCurrentUserInfo = () => {
    return new Promise(async (resolve, reject) => {
        Auth.currentUserInfo()
        .then(user => {
            resolve(user);
        })
        .catch(e => {
            console.log(e);
            reject(e);
        })
    });
}

export const signIn = (username, password) => {
    return new Promise(async (resolve, reject) => {
    // .toLowerCase() called on username in order to support case-insensitivity
        Auth.signIn(username.toLowerCase(), password)
        .then((user) => { 
            console.log(user);
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                dispatch('auth', { event: 'NEW_PASSWORD_REQUIRED', user: user }, 'Auth' );
            } else {
                NotificationService.configure();
            }
            resolve();
        })
        .catch(err => {
            //TODO catch reset from congnito console
            // if (err.code === 'PasswordResetRequiredException')
            // The error happens when the password is reset in the Cognito console
            // In this case you need to call forgotPassword to reset the password
            // Please check the Forgot Password part.

            if (!err.message) {
                console.log('Error when signing in: ', err);
                reject(err);                 
            } else {
                console.log('Error when signing in: ', err.message);
                reject(err.message);
            }
        })
    });  
}

export const signUp = (username, password) => {
    return new Promise(async (resolve, reject) => {
        await Auth.signUp({ 
            username,
            password
        })
        .then(() => {
            dispatch('auth', { event: 'confirmation', username: username }, 'Auth' );
            resolve();
        })
        .catch(err => {
            if (!err.message) {
                console.log('Error when signing up: ', err);
                reject(err);
            } else {
                console.log('Error when signing up: ', err.message);
                reject(err.message);
            }
        });
    });
}

export const confirmSignUp = (username, authCode) => {
    return new Promise(async (resolve, reject) => {
        await Auth.confirmSignUp(username, authCode)
        .then(() => {
          dispatch('auth', { event: 'signIn', username: username }, 'Auth' );
          resolve();
        })
        .catch(err => {
          if (!err.message) {
            console.log('Error when entering confirmation code: ', err);
            reject(err);
          } else {
            console.log('Error when entering confirmation code: ', err.message);
            reject(err.message);
          }
        });
    });
}

export const resendSignUp = (username) => {
    return new Promise(async (resolve, reject) => {
        await Auth.resendSignUp(username)
        .then(() => {
            console.log('Confirmation code resent successfully');
            resolve();
        })
        .catch(err => {
          if (!err.message) {
            console.log('Error requesting new confirmation code: ', err);
            reject(err);
          } else {
            console.log('Error requesting new confirmation code: ', err.message);
            reject(err.message);
          }
        })
    });
}

export const completeNewPassword = (user, newPassword) => {
    return new Promise(async (resolve, reject) => {
        await Auth.completeNewPassword(user, newPassword)
        .then(() => {
            console.log('New password updated');
            NotificationService.configure();
            resolve();
        })
        .catch(err => {
            if (!err.message) {
                console.log('Error on new Password: ', err);
                reject(err);
            } else {
                console.log('Error on new Password: ', err.message);
                reject(err.message);
            }
        })
    });
}

export const changePassword = (oldPassword, newPassword) => {
    return new Promise(async (resolve, reject) => {
        getCurrentAuthenticatedUser()
        .then(user => {
            Auth.changePassword(user, oldPassword, newPassword)
            .then((data) => {
                console.log(data);
                resolve();
            })
            .catch(err => {
                if (!err.message) {
                    console.log('Error on change Password: ', err);
                    reject(err);
                } else {
                    console.log('Error on change Password: ', err.message);
                    reject(err.message);
                }
            })
        })
        .catch(err => {
            if (!err.message) {
                console.log('Error on change Password: ', err);
                reject(err);
            } else {
                console.log('Error on change Password: ', err.message);
                reject(err.message);
            }
        })
    });
}

export const forgotPassword = (username) => {
    return new Promise(async (resolve, reject) => {
        // .toLowerCase() called on username in order to support case-insensitivity
        Auth.forgotPassword(username.toLowerCase())
        .then(data => {
            console.log(data);
            resolve();
            Alert.alert('Forgot password submitted', 'An email with a reset code has been sent.');
        })
        .catch(err => {
            if (!err.message) {
                console.log('Error forgot Password: ', err);
                reject(err);
            } else {
                console.log('Error forgot Password ', err.message);
                reject(err.message);
            }
        })
    });
}

export const forgotPasswordSubmit = (username, code, newPassword) => {
    const new_password = newPassword;
    // .toLowerCase() called on username in order to support case-insensitivity
    return new Promise(async (resolve, reject) => {
        Auth.forgotPasswordSubmit(username.toLowerCase(), code, new_password)
        .then(data => {
            console.log('forgot password submit: ' + data);
            resolve();
        })
        .catch(err => {
            if (!err.message) {
                console.log('Error forgot Password submit: ', err);
                reject(err);
            } else {
                console.log('Error forgot Password submit', err.message);
                reject(err.message);
            }
        })
    })
}

export const signOut = () => {
    Auth.signOut();
}

export const getUserAttributes = async () => {
    let userAttributes;
    await getCurrentAuthenticatedUser()
    .then(user => { 
        userAttributes = user;
    })
    .catch(err => {
        if (!err.message) {
            console.log('Error User Attrubutes: ', err);
        } else {
            console.log('Error User Attrubutes', err.message);
        }
    })  
    if (userAttributes === undefined) {
        return {
            accessToken: undefined,
            idToken: undefined
        }
    } else {
        return {
            accessToken: userAttributes.signInUserSession.accessToken.jwtToken,
            idToken: userAttributes.signInUserSession.idToken.jwtToken
        }
    }
}

export const listen = (channel, payload, source) => {
    Hub.listen(channel, payload, source);
}

export const dispatch = (channel, payload, source) => {
    Hub.dispatch(channel, payload, source);
}

export const init = () => {
    amplifyConfiguration();
}

export { getCurrentAuthenticatedUser }