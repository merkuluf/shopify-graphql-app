const { GraphQLClient, gql } = require('graphql-request');

const endpoint = 'https://cpb-new-developer.myshopify.com/admin/api/2024-01/graphql.json';
const SHOPIFY_TOKEN = process.env.SHOPIFY_TOKEN;



const client = new GraphQLClient(endpoint, {
    headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_TOKEN,
    },
});

module.exports = {
    client,
    gql,
};
