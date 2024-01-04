const { GraphQLClient, gql } = require('graphql-request');

const endpoint = 'https://cpb-new-developer.myshopify.com/admin/api/2024-01/graphql.json';

const client = new GraphQLClient(endpoint, {
    headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': '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',
    },
});

module.exports = {
    client,
    gql,
};
