import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../config";
import Head from "next/head";

import "../styles/globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" type="icon/x-image" href="/images/logo.svg" />
      </Head>
      <Component {...pageProps} />
      <div><Toaster position="top-center" /></div>
    </Provider>
  );
}

export default MyApp;
