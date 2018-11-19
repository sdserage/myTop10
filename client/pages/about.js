import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PageWrapper from '../components/styledComponents/PageWrapper';

const GET_USERS = gql`
  query getUsers{
    users {
      userName
      email
      lists {
        author {
          firstName
        }
        items {
          name
        }
      }
    }
  }
`;

export default () => (
  <PageWrapper>
    <h1>About</h1>
        <Query query={GET_USERS}>
      {({loading, error, data}) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>
        return <div>
          Hello GraphQL
            {JSON.stringify(data.users)}
        </div>
      }}
    </Query>
    <p>This is the about page</p>
  </PageWrapper>
);