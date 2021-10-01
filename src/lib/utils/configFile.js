import Config from 'react-native-config';

//AWS
const IdentityPoolId = Config.RN_IdentityPoolId;
const Region = Config.RN_Region;
const UserPoolId = Config.RN_UserPoolId;
const UserPoolWebClientId = Config.RN_UserPoolWebClientId;
const PinPointAppId = Config.RN_PinPointAppId;
const AppSyncEndPoint = Config.RN_AppSyncEndPoint;

export default { IdentityPoolId, Region, UserPoolId, UserPoolWebClientId, PinPointAppId, AppSyncEndPoint };