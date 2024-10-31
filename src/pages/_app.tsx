import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import { useCallback } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const kakaoSDKKey = process.env.NEXT_PUBLIC_KAKAO_SDK_KEY;

  /** 카카오 SDK 초기화 */
  const kakaoInit = useCallback(() => {
    if (window.Kakao.isInitialized()) return;
    window.Kakao.init(kakaoSDKKey);
  }, [])

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>동글</title>
      </Head>
      <Script 
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js" 
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4" 
        crossOrigin="anonymous" 
        onLoad={kakaoInit}
      />
      <ToastContainer position="bottom-center" autoClose={5000} />
      <Component {...pageProps} />
    </>

  )
}