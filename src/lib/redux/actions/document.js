import { registerAction } from '../tealPandaStore';
import { documents } from '../../dataAccess';

registerAction('documents/SAVE_DOCUMENT_FULFILLED', (state, action) => (console.log('Document saved'), { ...state }));
registerAction('documents/GET_DOCUMENTS_FULFILLED', (state, action) =>
     (console.log('Documents received: ', action.payload.length), {...state, list: action.payload.reduce((a, d) => (a.push({ ...d }), a), [] ) } ));
registerAction('documents/DELETE_DOCUMENTS', (state, action) => (console.log(`Documents deleted`), { ...state }))

export const saveDocument = document => ({
    type: 'documents/SAVE_DOCUMENT',
    payload: documents.create(document)
})

export const getDocuments = filter => ({
    type: 'documents/GET_DOCUMENTS',
    payload: documents.read(filter)
})

export const deleteDocuments = ids => ({
    type: 'documents/DELETE_DOCUMENTS',
    payload: documents.remove(ids)
})