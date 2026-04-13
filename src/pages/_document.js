import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* meta begin */}
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          {/* meta end */}

          {/* favicon begin */}
          <link rel="icon" href="favicon/epic-logo-icon.png" type="image/png" />
          <link rel="apple-touch-icon" href="favicon/epic-logo-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="favicon/epic-logo-icon.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="favicon/epic-logo-icon.png" />
          <link rel="manifest" href="favicon/site.webmanifest" />
          <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          {/* favicon */}

          {/* Bootstrap + Swiper in head; Font Awesome deferred in _app.js (DeferredPluginStyles) */}
          <link rel="stylesheet" href="/css/plugins/bootstrap-grid.css" />
          <link rel="stylesheet" href="/css/plugins/swiper.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
