import { registerAction } from "../tealPandaStore";

registerAction('navigation/VIEW_CLICKED', (state, action) => ({ ...state, view: action.meta }));

export const viewClicked = (view) => ({
    type: 'navigation/VIEW_CLICKED',
    meta: view
});