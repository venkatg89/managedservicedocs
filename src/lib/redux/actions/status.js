import { registerAction } from "../tealPandaStore";

registerAction('status/LOADED', (state, action) => ({ list: action.payload || [] }));

export const loaded = (statuses) => ({
    type: 'status/LOADED',
    payload: statuses
});