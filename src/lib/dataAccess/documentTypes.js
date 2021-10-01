import { tealPandaStore } from '../redux/tealPandaStore.js';
import { documentTypeActions } from '../redux/actions';

import client from '../graphql/client.js';
import gql from 'graphql-tag';

import * as queries from '../graphql/queries';

export const read = async (filter) => {
    try {    
        let documentTypes = await client.query({ 
            query: gql(queries.listDocumentTypes),
            fetchPolicy: 'network-only'
        });

        documentTypes = documentTypes.data.listDocumentTypes.items.map (dt => ({ id: dt.id, name: dt.name, isDefault: dt.isDefault, code: dt.code }) );
        tealPandaStore.dispatch(documentTypeActions.loaded(documentTypes));

        return documentTypes;
    }
    catch(err) {
        console.log('Error retrieving document types...', err)
        throw ('An error occured retrieving document types from the server');
    }
}