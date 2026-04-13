import React from "react";
import Head from "next/head";
import { Syne, Sora, Satisfy } from "next/font/google";
import "./index.scss";
import "../styles/globals.css";
import DeferredPluginStyles from "@/src/components/DeferredPluginStyles";

import { register } from "swiper/element/bundle";
register();

// className on the root = inherited body text (Sora). Variables must exist on an ancestor of
// all nodes that use $font-1/$font-2/$font-3 in SCSS (including html/body rules).
const fontSyne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  preload: false,
});

const fontSora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const fontSatisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-satisfy",
  display: "swap",
  preload: false,
});

function MyApp({ Component, pageProps }) {
  const fontRootClass = [
    fontSora.className,
    fontSora.variable,
    fontSyne.variable,
    fontSatisfy.variable,
  ].join(" ");

  return (
    <div className={fontRootClass}>
      <Head>
        <title>Epic Finance | Vehicle Finance New Zealand</title>
        <meta
          name="description"
          content="Epic Finance helps New Zealanders access fair, flexible vehicle finance with fast decisions and trusted support."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <DeferredPluginStyles />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
