// Splash Screen.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import BigLogoDongleSvg from '/public/svgs/logo/biglogo_dongle_kor.svg';

const SplashContainer = styled.div<{ show: boolean }>`
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
  z-index: ${props => props.show ? 1000 : 0};
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.5s;
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

interface SplashScreenProps {
  show: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  show
}) => {
  return (
    <SplashContainer show={show}>
      <LogoContainer>
        내 반려동물을 위한 쇼핑몰,
        <BigLogoDongleSvg />
      </LogoContainer>
    </SplashContainer>
  );
};

export default SplashScreen;