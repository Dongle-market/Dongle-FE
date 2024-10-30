// /pages.tsx
'use client';

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BlackLogoSvg from "/public/svgs/logo/blacklogo_dongle.svg";
import LogoDogSvg from "/public/svgs/logo/logo_dog.svg";
import KakaoLoginSvg from "/public/svgs/element/kakao_login.svg";
import SplashScreen from "@/components/splash";

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  height: -webkit-fill-available;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

const KakaoLoginButton = styled(KakaoLoginSvg)`
  position: absolute;
  bottom: 120px;
  cursor: pointer;
`;

const SplashScreenPage = styled(SplashScreen)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  height: -webkit-fill-available;
  width: 100%;
  position: fixed;
  top: 0;
  overflow: hidden;
`;

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page">
      {showSplash && <SplashScreenPage />}
      <LogoWrapper>
        <LogoContainer>
          <BlackLogoSvg />
          <LogoDogSvg />
        </LogoContainer>
        <KakaoLoginButton />
      </LogoWrapper>
    </div>
  );
}