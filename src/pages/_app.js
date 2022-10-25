import Head from "next/head";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../config";

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
