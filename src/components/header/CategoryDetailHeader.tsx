// CategoryDetailHeader.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import BackSvg from '/public/svgs/header/back_arrow.svg'
import ShoppingBasketSvg from '/public/svgs/header/black_shoppingbag.svg';

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

interface CategoryDetailHeaderProps {
  title: string;
}

const CategoryDetailHeader: React.FC<CategoryDetailHeaderProps> = ({ title }) => {
  return (
    <Wrapper>
      <BackSvg />
      <Title>{title}</Title>
      <ShoppingBasketSvg />
    </Wrapper>
  );
}

export default CategoryDetailHeader;
