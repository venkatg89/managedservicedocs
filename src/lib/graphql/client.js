import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import config from '../utils/configFile';
import { storage } from './storage.js';
import Auth from '@aws-amplify/auth';

const client = new AWSAppSyncClient({
  url: config.AppSyncEndPoint,
  region: config.Region,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => Auth.currentCredentials()
  },
  disableOffline: false,
  offlineConfig: {
    storage: storage
  }
});

export default client;