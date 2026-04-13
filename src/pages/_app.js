import React from "react";
import Head from "next/head";
import './index.scss';
import "../styles/globals.css";

import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
          {/* seo begin */}
          <title>Epic Finance | Vehicle Finance New Zealand</title>
          <meta
            name="description"
            content="Epic Finance helps New Zealanders access fair, flexible vehicle finance with fast decisions and trusted support."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* seo end */}        
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
