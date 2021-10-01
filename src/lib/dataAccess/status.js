import { tealPandaStore } from '../redux/tealPandaStore.js';
import { statusActions } from '../redux/actions';

import client from '../graphql/client.js';
import gql from 'graphql-tag';

import * as queries from '../graphql/queries';

export const read = async (filter) => {
    try {    
        let statuses = await client.query({ 
            query: gql(queries.listStatuses),
            fetchPolicy: 'network-only', 
        });

        statuses = statuses.data.listStatuses.items.map (s => ({ id: s.id, name: s.name, isDefault: s.isDefault, code: s.code}) );
        
        tealPandaStore.dispatch(statusActions.loaded(statuses));

        return statuses;
    }
    catch(err) {
        console.log('Error retrieving document status...', err)
        throw ('An error occured retrieving document statuses from the server');
    }
}