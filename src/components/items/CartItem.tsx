// CartItem.tsx
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import AddSvg from '/public/svgs/element/add.svg';
import RemoveSvg from '/public/svgs/element/remove.svg';
import NonCheckSvg from '/public/svgs/element/non_check.svg';
import CheckSvg from '/public/svgs/element/check.svg';
import CloseSvg from '/public/svgs/element/close.svg';
import { CartItemType } from '@/types/item';
import { useItemRouting } from '@/utils/itemIdRouting';

const ItemContainer = styled.div`
    display: flex;
    height: 116px;
    align-items: center;
    background-color: white;
    padding: 16px;
    margin: 8px 0;
    flex-direction: row;
    justify-content: space-between;
`;

const Thumbnail = styled.img`
    width: 84px;
    height: 84px;
    border-radius: 16px;
    cursor: pointer;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Name = styled.div`
    font-size: 16px;
    max-width: 200px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
    cursor: pointer;
`;

const Price = styled.div`
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`;

const CountContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    border-radius: 16px;
    background-color: #F1F1F1;
    padding: 4px 8px;
    width: 68px;
    box-sizing: border-box;
`;

const Count = styled.div`
    font-size: 16px;
    padding: 0 8px;
`;

interface CartItemProps {
    item: CartItemType;
    selected: boolean;
    toggleSelection: () => void;
    removeItem: () => void;
    handleIncrement: () => void;
    handleDecrement: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, selected, toggleSelection, removeItem, handleIncrement, handleDecrement }) => {

    const routeToItem = useItemRouting();

    return (
        <ItemContainer>
            <InfoContainer>
                <div onClick={toggleSelection}>
                    {selected ? <CheckSvg /> : <NonCheckSvg />}
                </div>
                <Thumbnail src={item.imageUrl} alt={item.name} onClick={() => routeToItem(item.itemId)} />
                <Info>
                    <Name onClick={() => routeToItem(item.itemId)}>{item.name}</Name>
                    <Price onClick={() => routeToItem(item.itemId)}>{item.price.toLocaleString()} 원</Price>
                    <CountContainer>
                        <RemoveSvg onClick={handleDecrement} />
                        <Count>{item.itemCount}</Count>
                        <AddSvg onClick={handleIncrement} />
                    </CountContainer>
                </Info>
            </InfoContainer>
            <CloseSvg onClick={removeItem}/>
        </ItemContainer>
    );
}

export default CartItem;