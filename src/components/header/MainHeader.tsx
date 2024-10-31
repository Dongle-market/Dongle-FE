// MainHeader.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DongleSvg from '/public/svgs/logo/whitelogo_dongle.svg'
import DogSvg from '/public/svgs/logo/logo_dog.svg';
import ShoppingBasketSvg from '/public/svgs/header/white_shoppingbag.svg';
import Link from 'next/link';

const HeaderContainer = styled.div`
  position: fixed;
  padding: 14px 16px;
  width: 100%;
  max-width: 600px;
  top: 0;
  z-index: 1000;
  box-sizing: border-box;
`;
const LogoContainer = styled(Link)`
  display: flex;
  gap: 2px;
  text-decoration: none;
`;

const LogoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BasketContainer = styled.div`
  position: relative;
`;

const ItemCountBadge = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: white;
  color: #E55737;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

interface CategoryHeaderProps {
  itemCount: number;
}

const MainHeader: React.FC<CategoryHeaderProps> = ({ itemCount }) => {
  return (
    <HeaderContainer>
      <LogoWarpper>
        <LogoContainer href="/home">
          <DongleSvg />
          <DogSvg />
        </LogoContainer>
        <BasketContainer>
          <ShoppingBasketSvg />
          {itemCount >= 0 && <ItemCountBadge>{itemCount}</ItemCountBadge>}
        </BasketContainer>
      </LogoWarpper>      
    </HeaderContainer>
  );
}

export default MainHeader;