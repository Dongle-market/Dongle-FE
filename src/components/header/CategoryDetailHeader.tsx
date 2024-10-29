// CategoryDetailHeader.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import BackSvg from '/public/svgs/header/back_arrow.svg'
import ShoppingBasketSvg from '/public/svgs/header/black_shoppingbag.svg';

const Wrapper = styled.div`
  padding: 16px 14px;
`;

const Title = styled.div`
    font-weight: 600;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface CategoryDetailHeaderProps {
  title: string;
}

const CategoryDetailHeader : React.FC<CategoryDetailHeaderProps> = ({ title }) => {
  return (
    <Wrapper>
      <LogoWrapper>
          <BackSvg />
          <Title>{title}</Title>
        <ShoppingBasketSvg />
      </LogoWrapper>      
    </Wrapper>
  );
}


export default CategoryDetailHeader;