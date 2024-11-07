// CategoryHeader.tsx

import React from 'react';
import styled from 'styled-components';
import DongleSvg from '/public/svgs/logo/blacklogo_dongle.svg'
import DogSvg from '/public/svgs/logo/logo_dog.svg';
import ShoppingBasketSvg from '/public/svgs/header/black_shoppingbag.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/user';

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

const LogoContainer = styled(Link)`
  display: flex;
  gap: 2px;
  text-decoration: none;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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

const CategoryHeader = () => {
  const router = useRouter();
  const cartCount = useUserStore((state) => state.cartCount);

  const handleCartClick = () => {
    router.push('/mymarket/cart');
  };
  
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoContainer href="/home">
          <DongleSvg />
          <DogSvg />
        </LogoContainer>
        <BasketContainer onClick={handleCartClick} style={{ cursor: 'pointer' }}>
          <ShoppingBasketSvg />
          {<ItemCountBadge>{cartCount}</ItemCountBadge>}
        </BasketContainer>
      </LogoWrapper>
    </Wrapper>
  );
}


export default CategoryHeader;