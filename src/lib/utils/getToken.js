import { NativeModules, Platform } from 'react-native';
const { TPUtilsPushNotification } = NativeModules;
import { AsyncStorage } from '@aws-amplify/core';
import config from './configFile.js';

export const getToken = async () => {
    return new Promise(async (resolve, reject) => {
        if (Platform.OS === 'android') {
            TPUtilsPushNotification.getToken((token) => resolve(token));
        } else {
            const deviceToken = await AsyncStorage.getItem('push_token' + config.PinPointAppId);
            resolve(deviceToken);
        }
    });
}