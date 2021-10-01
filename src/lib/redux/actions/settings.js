import { defaultAsyncReducer, registerAction } from '../tealPandaStore.js';
import { settings } from '../../dataAccess'


registerAction('settings/SAVE_SETTING_PENDING', (state, action) => ({ [action.meta.name]: action.meta.value }));
registerAction('settings/SAVE_SETTING_REJECTED', (state, action) => ({ error: action.payload }));
registerAction('settings/SAVE_SETTING_FULFILLED', (state, action) => ({ [action.payload.data.updateSetting.key]:action.payload.data.updateSetting.value }));
registerAction('settings/GET_SETTINGS_FULFILLED', (state, action) => ( action.payload.reduce((a, c) => (a[c.key] = c.value, a), {})));

export const saveSetting = (name, value) => ({
    type: 'settings/SAVE_SETTING',
    meta: { name, value },
    payload: settings.write(name, value)
})

export const getSetting = (name, defaultvalue) => ({
    type: 'settings/GET_SETTING',
    payload: settings.read(name, defaultValue)
})

export const loadSettings = () => ({
    type: 'settings/GET_SETTINGS',
    payload: settings.readAll()
})
