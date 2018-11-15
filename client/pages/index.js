import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
//
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: 'http://localhost:3998/graphql',
    fetch,
    // credentials: 'same-origin',
    // headers: {
    //   cookie: requestAnimationFrame.header('Cookie'),
    // },
  }),
  cache: new InMemoryCache(),
});

const context = {};

const Test = styled.a`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: bolder;
`;

const Index = () => (
  <ApolloProvider client={client}>
  <div>
    <Link href='/login'>
      <Test>login/register</Test>
    </Link>
    <Link href='/about'>
      <Test>about</Test>
    </Link>
    <p>Hello Next.js</p>
  </div>
  </ApolloProvider>
);

export default Index;