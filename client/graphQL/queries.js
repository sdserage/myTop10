import gql from 'graphql-tag';

// This should be updated to only grab the essentials
export const gql_GET_LISTS = gql`
  query GetLists($id: ID!) {
    user(id: $id) {
      lists {
        title
        category
        subCategories
        size
        items {
          name
          details
          description
          pictures
          nextItem {
            id
          }
        }
      }
    }
  }
`;

export default {
  gql_GET_LISTS,
};