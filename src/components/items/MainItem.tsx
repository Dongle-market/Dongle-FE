// MainItem.tsx

import React from 'react';
import styled from 'styled-components';
import { removeHtmlTags } from '@/utils/removeHtmlTags';

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px;
`;

const Name = styled.div`
  color: #666;
  font-size: 14px;
  margin-top: 8px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
`;


interface Item {
  itemId: number;
  title: string;
  lprice: number;
  image: string;
}

interface MainItemProps {
  item: Item;
}

const MainItem: React.FC<MainItemProps> = ({ item }) => {
    return (
        <ItemContainer key={item.itemId}>
            <Image src={item.image} alt={item.title} />
            <Name>{removeHtmlTags(item.title)}</Name>
            <Price>{item.lprice.toLocaleString()} 원</Price>
        </ItemContainer>
    );
};

export default MainItem;