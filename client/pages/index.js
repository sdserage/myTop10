import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_USERS = gql`
  query getUsers{
    users {
      firstName
      lastName
      lists {
        title
      }
    }
  }
`;

const context = {};

const PageWrapper = styled.section`
  padding: ${props => props.theme._spacer()};
  display: flex;
  flex-direction: column;
`;

const Home = () => (
  <PageWrapper>
    <Query query={GET_USERS}>
      {({loading, error, data}) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>
        return (
          <>
            <h1>Home</h1>
          </>
        )
      }}
    </Query>
  </PageWrapper>
);

export default Home;