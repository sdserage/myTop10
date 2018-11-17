import React from 'react'
import App, { Container } from 'next/app'
import withApolloClient from '../graphQL/lib/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';


const theme = {
  primaryColor: 'red',
};

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
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);