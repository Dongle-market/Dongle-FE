// CategoryHeader.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import DongleSvg from '/public/svgs/logo/blacklogo_dongle.svg'
import DogSvg from '/public/svgs/logo/logo_dog.svg';
import ShoppingBasketSvg from '/public/svgs/header/black_shoppingbag.svg';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  padding: 0 16px;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  top: 0;
  max-width: inherit;
  box-sizing: border-box;
  background-color: #f8f8f8;
  z-index: 1000;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 2px;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const CategoryHeader = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoContainer>
          <DongleSvg />
          <DogSvg />
        </LogoContainer>
        <ShoppingBasketSvg />
      </LogoWrapper>      
    </Wrapper>
  );
}


export default CategoryHeader;