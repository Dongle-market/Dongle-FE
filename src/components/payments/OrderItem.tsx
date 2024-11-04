// OrderItem.tsx
'use client';

import { CartItemType } from '@/types/item';
import React from 'react';
import styled from 'styled-components';
import XsmallSvg from '/public/svgs/element/x_small.svg';

const OrderItemContainer = styled.div`
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  padding: 0 16px 16px 16px;
  align-items: center;
  gap: 16px;
  flex-grow: 1;
`;

const ItemImg = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 16px;
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
`;

const ItemBrand = styled.div`
  font-size: 12px;
  font-weight: 600;
`;

const ItemNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
`;

const ItemName = styled.div`
  font-size: 16px;
  width: 80%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const ItemCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #919191;
`;

const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

interface OrderItemProps {
    cartItems: CartItemType[];
}

const OrderItem: React.FC<OrderItemProps> = ({ cartItems }) => {
    return (
        <>
            {cartItems.map((item, index) => (
                <OrderItemContainer key={index}>
                    <ItemImg src={item.imageUrl} alt={item.name} />
                    <ItemInfoContainer>
                        <ItemBrand>{item.brand}</ItemBrand>
                        <ItemNameContainer>
                          <ItemName>{item.name}</ItemName>
                          <ItemCount>
                            <XsmallSvg />
                            {item.itemCount}
                          </ItemCount>
                        </ItemNameContainer>

                        <ItemPrice>{(item.price*item.itemCount).toLocaleString()} 원</ItemPrice>
                    </ItemInfoContainer>
                </OrderItemContainer>
            ))}
        </>
    );
}

export default OrderItem;