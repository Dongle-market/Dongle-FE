// OrderItem.tsx
'use client';

import React from 'react';
import styled from 'styled-components';

const OrderItemContainer = styled.div`
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  padding: 0 16px 16px 16px;
  align-items: center;
  gap: 16px;
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
`;

const ItemBrand = styled.div`
  font-size: 12px;
  font-weight: 600;
`;

const ItemName = styled.div`
  font-size: 16px;
`;

const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

interface CartItem {
    id: number;
    imageUrl: string;
    brand: string
    name: string;
    price: number;
    selected: boolean;
}

interface OrderItemProps {
    cartItems: CartItem[];
}

const OrderItem: React.FC<OrderItemProps> = ({ cartItems }) => {
    return (
        <>
            {cartItems.map((item, index) => (
                <OrderItemContainer key={index}>
                    <ItemImg src={item.imageUrl} alt={item.name} />
                    <ItemInfoContainer>
                        <ItemBrand>{item.brand}</ItemBrand>
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>{item.price.toLocaleString()} 원</ItemPrice>
                    </ItemInfoContainer>
                </OrderItemContainer>
            ))}
        </>
    );
}

export default OrderItem;