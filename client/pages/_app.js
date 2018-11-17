import React from 'react'
import App, { Container } from 'next/app'
import withApolloClient from '../lib/with-apollo-client';
// import gql from 'graphql-tag';
// //
import { ApolloProvider } from 'react-apollo';
// import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import fetch from 'node-fetch';

// const client = new ApolloClient({
//   ssrMode: true,
//   link: createHttpLink({
//     uri: 'http://localhost:3998/graphql',
//     fetch,
//     // credentials: 'same-origin',
//     // headers: {
//     //   cookie: requestAnimationFrame.header('Cookie'),
//     // },
//   }),
//   cache: new InMemoryCache(),
// });

 class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render () {
    const { Component, pageProps, apolloClient } = this.props
console.log(pageProps)
    return (
      <Container>
        {/* <Component {...pageProps} /> */}
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);