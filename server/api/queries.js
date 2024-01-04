const { gql } = require('./graphqlClient')

const products = gql`
    {
      products(first: 10) {
        edges {
          node {
            id
            bodyHtml
            images(first: 5) {
              nodes {
                src
              }
            }
          }
        }
      }
    }
  `


module.exports = {
  products,
}