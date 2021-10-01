import client from '../graphql/client.js';
import gql from 'graphql-tag';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

import * as security from '../auth/security.js';
import { createGuid } from '../utils/guid.js';

export const create = async (images, type, status) => {
    const user = await security.getCurrentAuthenticatedUser();
    const dateOfCapture = new Date();

    const id = createGuid();

    return await client.mutate({
        mutation: gql(mutations.createDocument),
        variables: {
            input: { 
                userId: user.username,
                id,
                images,
                type,
                status, 
                dateOfCapture,
            } 
        },
        optimisticResponse: {
                createDocument: {
                    id,
                    userId: user.username,
                    images,
                    type: { ...type, __typename: 'type' },
                    status: { ...status, __typename: 'status' },
                    dateOfCapture,
                    __typename: 'document'
                }
        },
        update: (proxy, { data: { createDocument } }) => {
            let data = proxy.diff({
                query: gql(queries.listDocuments), 
                variables: { 
                    filter: { 
                        userId: { eq: user.username }
                    } 
                },
                returnPartialData: true 
            }).result;
            
            if(data.listDocuments) {
                data.listDocuments.items.push(createDocument);
            } else {
                data.listDocuments = {
                    __typename: 'ModelDocumentConnection',
                    items: [ createDocument ]
                }
            }

            proxy.writeQuery({
                query: gql(queries.listDocuments), 
                variables: { 
                    filter: { 
                        userId: { eq: user.username }
                    } 
                }, data
            });
        }
    });
}

export const read = async (filter) => {
    const user = await security.getCurrentAuthenticatedUser();
    console.log(`Loading documents`);
    try {
        let documents = [];

        let result = await client.query({ 
            query: gql(queries.listDocuments),
            fetchPolicy: 'network-only',
            variables: { 
                filter: { 
                    userId: { eq: user.username }
                } 
            }
        });

        documents.push(...result.data.listDocuments.items)

        while (result.data.listDocuments.nextToken)
        {
            result = await client.query({ 
                query: gql(queries.listDocuments),
                fetchPolicy: 'network-only',
                variables: { 
                    filter: { 
                        userId: { eq: user.username }
                    },
                    nextToken: result.data.listDocuments.nextToken
                },
            });

            documents.push(...result.data.listDocuments.items)
        }

        return documents;        
    }
    catch( err) {
        console.log('Error retrieving documents', err)
        throw ('An error occured retrieving documents from the server');
    }
}

export const remove = async (ids) => {
    const user = await security.getCurrentAuthenticatedUser();
    let results = [];

    try {
         results = ids.map(async id => await client.mutate({
                mutation: gql(mutations.deleteDocument),
                variables: {
                    input: {
                        id: id,
                        userId: user.username
                    }
                }
            })
         )
    } catch (err){
        console.log(`Error deleting documents`, err);
        throw ('An error occured deleting documents from the server')
    }

    return results;
}