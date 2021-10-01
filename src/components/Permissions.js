import { PermissionsAndroid, Platform } from 'react-native';

export async function requestCameraPermission() {
  if (Platform.OS !== 'android') {
    return;
  }
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
  } catch (err) {
    console.log(err);
  }
}

export async function requestPhonePermission() {
  if (Platform.OS !== 'android') {
    return;
  }

  try {
      const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE
      );
  } catch (err) {
      console.log(err);
  }
}