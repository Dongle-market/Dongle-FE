// ItemHeader.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import BackSvg from '/public/svgs/header/back_arrow.svg'
import ShoppingBasketSvg from '/public/svgs/header/black_shoppingbag.svg';

const Wrapper = styled.div`
  padding: 14px 16px;
  position: fixed;    /* 헤더를 상단에 고정 */
  width: 100%;
  top: 0;
  max-width: inherit;
  box-sizing: border-box;
  background-color: #f8f8f8;
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

const ItemHeader = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoContainer>
          <BackSvg />
        </LogoContainer>
        <ShoppingBasketSvg />
      </LogoWrapper>      
    </Wrapper>
  );
}


export default ItemHeader;