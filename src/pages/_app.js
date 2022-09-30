import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="icon/x-image" href="/images/logo.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
