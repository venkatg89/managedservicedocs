import PushNotification from '@aws-amplify/pushnotification';
import { getCurrentAuthenticatedUser } from '../auth/security';
import { Auth } from 'aws-amplify';
import { getToken } from '../utils/getToken';
import config from '../utils/configFile.js';
import { Platform } from 'react-native';

export class NotificationService {
  constructor() {
    this.lastId = 0;
  }

  static configure = async (onRegister, onNotification, onNotificationOpened) => {
    PushNotification.configure({appId: config.PinPointAppId});
    
    const token = await getToken();
    const user = await getCurrentAuthenticatedUser();
    
    if (token) {
      Auth.updateUserAttributes(user, { 'custom:deviceId': token } ).then(result => { }).catch(err => console.log(err));
      Auth.updateUserAttributes(user, { 'custom:channelType': Platform.OS == 'ios' ? 'APNS' : 'GCM'  } ).then(result => { }).catch(err => console.log(err));
    }

    PushNotification.onRegister(async token => {
      Auth.updateUserAttributes(user, { 'custom:deviceId': token } ).then(result => { }).catch(err => console.log(err));
      Auth.updateUserAttributes(user, { 'custom:channelType': Platform.OS == 'ios' ? 'APNS' : 'GCM'  } ).then(result => { }).catch(err => console.log(err));
                  
      onRegister && onRegister();
    });

    PushNotification.onNotification(n => (onNotification && onNotification(n)));
    PushNotification.onNotificationOpened(n => (onNotificationOpened && onNotificationOpened(n)));
  }

  local(notification) {
    this.lastId++;
  }

  clearBadge = () => {
  }
}
