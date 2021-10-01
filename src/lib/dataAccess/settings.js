import client from '../graphql/client.js';
import gql from 'graphql-tag';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

import * as security from '../auth/security.js';

export const read = async (key, defaultValue) => {
    
    // A default value is neccesary as if the setting is not found for the user we go ahead and create the setting.
    if (defaultValue === undefined)
        throw ("A default value must be specified when reading a setting.")

    let matched = await readSetting(key);
    
    if (matched === undefined || !matched.listSettings) {
        return createSetting(key, defaultValue);
    }

    return matched.data.listSettings.items[0];
}

export const readAll = async () => {
    const user = await security.getCurrentAuthenticatedUser();
    const result = await client.query({ 
        query: gql(queries.listSettings), 
        fetchPolicy: 'network-only',
        variables: { 
            filter: { 
                userId: { 
                    eq: user.username 
                } 
            } 
        } 
    });

    return result && result.data.listSettings.items;
}

export const write = async (key, value) => {
    const user = await security.getCurrentAuthenticatedUser();
    const result = await readSetting(key);

    if (result.data.listSettings.items && result.data.listSettings.items.length) {
        const fromDb = result.data.listSettings.items[0];
        const setting = { key: fromDb.key, value, userId: user.username };
        
        return await client.mutate({ 
            mutation: gql(mutations.updateSetting),
            variables: { input: setting },
            optimisticResponse: () => ({
                updateSetting: { ...setting, __typename: "Setting" }
            }),
        });
    } else {
        const result =  createSetting(key, value);

        return result;
    }

    return true;
}


export const subscribe = (key, callback) => {

}

const createSetting = async (key, value = '') => {
    const user = await security.getCurrentAuthenticatedUser();

    return await client.mutate({ mutation: gql(mutations.createSetting), variables: { input: { key, value, userId: user.username } } });
}

const readSetting = async key => {
    const user = await security.getCurrentAuthenticatedUser();

    const result = await client.query({ 
        query: gql(queries.listSettings),
        fetchPolicy: 'network-only', 
        variables: { 
            filter: { 
                userId: { eq: user.username },
                key: { eq: key } 
            } 
        }
    });

    return result;
}

