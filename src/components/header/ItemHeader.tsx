// ItemHeader.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import BackSvg from '/public/svgs/header/back_arrow.svg'
import ShoppingBasketSvg from '/public/svgs/header/black_shoppingbag.svg';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/user';

const Wrapper = styled.div`
  padding: 14px 16px;
  position: fixed;    /* 헤더를 상단에 고정 */
  width: 100%;
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
  justify-content: space-between;
`;

const BasketContainer = styled.div`
  position: relative;
`;

const ItemCountBadge = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #E55737;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const ItemHeader = () => {
  const router = useRouter();
  const history = useRouter();
  const cartCount = useUserStore((state) => state.cartCount);

  const handleBackClick = () => {
    history.back();
  };

  const handleCartClick = () => {
    router.push('/mymarket/cart');
  };
  
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoContainer onClick={handleBackClick} style={{ cursor: 'pointer' }}>
          <BackSvg />
        </LogoContainer>
        <BasketContainer onClick={handleCartClick} style={{ cursor: 'pointer' }}>
          <ShoppingBasketSvg />
          {<ItemCountBadge>{cartCount}</ItemCountBadge>}
        </BasketContainer>
      </LogoWrapper>
    </Wrapper>
  );
}


export default ItemHeader;