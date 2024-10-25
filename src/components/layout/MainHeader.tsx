// MainHeader.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import DongleSvg from '/public/svgs/whitelogo_dongle.svg'
import DogSvg from '/public/svgs/logo_dog.svg';
import ShoppingBasketSvg from '/public/svgs/white_shoppingbag.svg';

const HeaderContainer = styled.div`
  position: fixed;
  padding: 14px 16px;
  width: 100%;
  max-width: 600px;
  top: 0;
  z-index: 1000;
  box-sizing: border-box;
`;
const LogoContainer = styled.div`
  display: flex;
  gap: 2px
`;

const LogoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MainHeader = () => {
  return (
    <HeaderContainer>
      <LogoWarpper>
        <LogoContainer>
          <DongleSvg />
          <DogSvg />
        </LogoContainer>
        <ShoppingBasketSvg />
      </LogoWarpper>      
    </HeaderContainer>
  );
}

export default MainHeader;