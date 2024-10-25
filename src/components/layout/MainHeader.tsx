// MainHeader.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import DongleSvg from '/public/svgs/whitelogo_dongle.svg'
import DogSvg from '/public/svgs/logo_dog.svg';
import ShoppingBasketSvg from '/public/svgs/white_shoppingbag.svg';

const Wrapper = styled.div`
  padding: 16px 14px;
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
    <Wrapper>
      <LogoWarpper>
        <LogoContainer>
          <DongleSvg />
          <DogSvg />
        </LogoContainer>
        <ShoppingBasketSvg />
      </LogoWarpper>      
    </Wrapper>
  );
}

export default MainHeader;