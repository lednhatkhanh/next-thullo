import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import '@reach/menu-button/styles.css';
import '@reach/dialog/styles.css';
import '../styles/index.scss';

function ThulloApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>Thullo</title>
        <link rel="icon" type="image/svg+xml" href="/images/logo-small.svg" />
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default ThulloApp;
