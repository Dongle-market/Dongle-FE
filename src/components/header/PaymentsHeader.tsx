// PaymentsHeader.tsx

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import BackSvg from '/public/svgs/header/back_arrow.svg';
import ShoppingBasketSvg from '/public/svgs/header/black_shoppingbag.svg';
import { useUserStore } from '@/store/user';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  padding: 14px 16px;
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

const Title = styled.div`
  font-weight: 600;
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

const PaymentsHeader = () => {
    const router = useRouter();
    const cartCount = useUserStore((state) => state.cartCount);

    const handleBackClick = () => {
        router.back();
    };

    const handleCartClick = () => {
        router.push('/mymarket/cart');
    };

    return (
        <Wrapper>
            <BackSvg onClick={handleBackClick} style={{ cursor: 'pointer' }} />
            <Title>결제하기</Title>
            <BasketContainer onClick={handleCartClick} style={{ cursor: 'pointer' }}>
                <ShoppingBasketSvg />
                {<ItemCountBadge>{cartCount}</ItemCountBadge>}
            </BasketContainer>
        </Wrapper>
    );
}

export default PaymentsHeader;
