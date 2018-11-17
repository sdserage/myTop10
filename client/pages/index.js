import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
//
import { ApolloProvider, Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

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
`;

const Index = () => (
  <div>
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