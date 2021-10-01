import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform, requireNativeComponent } from 'react-native';

const AbbyyCamera = requireNativeComponent('AbbyyCameraView');
const { AbbyyCameraViewManager } = NativeModules;
const EventEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(NativeModules.RNEventEmitter) : DeviceEventEmitter;

export { AbbyyCameraViewManager, AbbyyCamera, EventEmitter }; 