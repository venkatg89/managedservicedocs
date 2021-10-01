import { registerAction } from "../tealPandaStore";

registerAction('eula/GET_DEVICE_EULA', (state, action) => ({ ...state, accepted: action.meta }));

export const getDeviceEula = (accepted) => ({
    type: 'eula/GET_DEVICE_EULA',
    meta: accepted
});