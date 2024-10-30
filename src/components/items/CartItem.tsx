// CartItem.tsx
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import AddSvg from '/public/svgs/element/add.svg';
import RemoveSvg from '/public/svgs/element/remove.svg';
import BoxSvg from '/public/svgs/element/box.svg';
import CheckBoxSvg from '/public/svgs/element/check_box.svg';
import CloseSvg from '/public/svgs/element/close.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Item {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
}

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
`;

const Price = styled.div`
    font-size: 16px;
    font-weight: 600;
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
    item: Item;
    selected: boolean;
    toggleSelection: () => void;
    removeItem: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, selected, toggleSelection, removeItem }) => {
    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        } else {
            toast.error("1개부터 구매가능합니다", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    };

    return (
        <ItemContainer>
            <InfoContainer onClick={toggleSelection}>
                {selected ? <CheckBoxSvg /> : <BoxSvg />}
                <Thumbnail src={item.imageUrl} alt={item.name} />
                <Info>
                    <Name>{item.name}</Name>
                    <Price>{item.price.toLocaleString()} 원</Price>
                    <CountContainer>
                        <RemoveSvg onClick={handleDecrement} />
                        <Count>{count}</Count>
                        <AddSvg onClick={handleIncrement} />
                    </CountContainer>
                </Info>
            </InfoContainer>
            <CloseSvg onClick={removeItem}/>
        </ItemContainer>
    );
}

export default CartItem;