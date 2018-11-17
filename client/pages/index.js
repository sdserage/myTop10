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

const Test = styled.a`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: bolder;
  color: ${props => props.theme.primaryColor};
`;

const Index = () => (
  <div>
    <Link href="/about">
      <Test>About</Test>
    </Link>
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
  </div>
);

export default Index;