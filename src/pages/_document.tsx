import React from 'react';
import Document, { Head, Main, NextScript, Html } from 'next/document';

export default class ThulloDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
