import React from 'react'
import App, { Container } from 'next/app'
import withApolloClient from '../graphQL/lib/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../components/GlobalStyle';
import AppWrapper from '../components/AppWrapper';
import theme from '../util/theme';

class MyTop10 extends App {
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
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <>
              <AppWrapper>
                <Component {...pageProps} />
              </AppWrapper>
              <GlobalStyle />
            </>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyTop10);