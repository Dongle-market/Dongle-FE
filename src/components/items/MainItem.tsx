// MainItem.tsx
'use client';

import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-top: 4px;
`;

const Name = styled.div`
  color: #666;
  font-size: 14px;
  margin-top: 8px;
`;

interface MainItemProps {
    name: string;
    price: number;
    imageUrl: string;
}

const MainItem: React.FC<MainItemProps> = ({ name, price, imageUrl }) => {
    return (
        <ItemContainer>
            <Image src={imageUrl} alt={name} />
            <Name>{name}</Name>
            <Price>{price}원</Price>
        </ItemContainer>
    );
};

export default MainItem;