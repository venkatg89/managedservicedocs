import { registerAction } from "../tealPandaStore";

registerAction('documentTypes/LOADED', (state, action) => ({ list: action.payload || [] }));

export const loaded = (types) => ({
    type: 'documentTypes/LOADED',
    payload: types
});