// Splash Screen.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import BigLogoDongleSvg from '/public/svgs/logo/biglogo_dongle_kor.svg';

const SplashContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-width: inherit;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  height: 100vh;
  max-width: inherit;
  width: 100%;
  background-color: #F8F8F8;
`;

const SplashScreen = () => {
  return (
    <SplashContainer>
      <LogoContainer>
        내 반려동물을 위한 쇼핑몰
        <BigLogoDongleSvg />
      </LogoContainer>
    </SplashContainer>
  );
};

export default SplashScreen;