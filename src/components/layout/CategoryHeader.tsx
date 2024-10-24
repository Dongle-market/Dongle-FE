// CategoryHeader.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import DongleSvg from '../../../public/svgs/blacklogo_dongle.svg'
import DogSvg from '../../../public/svgs/logo_dog.svg';
import ShoppingBasketSvg from '../../../public/svgs/black_shoppingbag.svg';

const Wrapper = styled.div`
  padding: 16px 14px;
`;
const LogoContainer = styled.div`
  display: flex;
  gap: 2px
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
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