import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';

// material-ui components
import MuiContainer from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '~/contexts/theme';
import '~/contexts/global.css';

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <MuiContainer maxWidth="xs" style={{ padding: 0 }}>
              <Component {...pageProps} />
            </MuiContainer>
          </StylesProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
