import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>동글</title>
      </Head>
      <ToastContainer position="bottom-center" autoClose={5000} />
      <Component {...pageProps} />
    </>

  )
}