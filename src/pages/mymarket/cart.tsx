// /mymarket/cart/pages.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CartHeader from '@/components/header/CategoryHeader';
import MyMarketFooterNav from '@/components/navbar/MyMarketFooterNav';
import TabMenu from '@/components/header/TabMenu';
import NonCheckSvg from '/public/svgs/element/non_check.svg';
import CheckSvg from '/public/svgs/element/check.svg';
import CartItem from '@/components/items/CartItem';
import OrderSummary from '@/components/items/OrderSummary';
import EmptyCartSvg from '../../../public/svgs/element/empty_cart.svg';
import Link from 'next/link';
import { CartItemType } from '@/types/item';

const initialItems: CartItemType[] = [
    { itemId: 1, imageUrl: '/images/Son&Jeon.png', brand: '아디다스', name: '왜저뤠ㅞㅞ~~', price: 34000, itemCount: 1 },
    { itemId: 2, imageUrl: '/images/Baek.png', brand: '아디다스', name: '어얼얽--', price: 34000, itemCount: 1 },
    { itemId: 3, imageUrl: '/images/An.png', brand: '아디다스', name: '고기가 이븐하게 익지 않아써여', price: 34000, itemCount: 1 },
    { itemId: 4, imageUrl: '/images/An.png', brand: '아디다스', name: '보류입니다.', price: 34000, itemCount: 1 },
    { itemId: 5, imageUrl: '/images/An.png', brand: '아디다스', name: '저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여', price: 34000, itemCount: 1 },
    { itemId: 6, imageUrl: '/images/Baek.png', brand: '아디다스', name: '이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ', price: 34000, itemCount: 1 },
    { itemId: 7, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, itemCount: 1 },
    { itemId: 8, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, itemCount: 1 },
    { itemId: 9, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, itemCount: 1 },
    { itemId: 10, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스', price: 34000, itemCount: 1 },
    { itemId: 11, imageUrl: '/images/Son&Jeon.png', brand: '아디다스', name: '왜저뤠ㅞㅞ~~', price: 34000, itemCount: 1 }
];

const ChoiceDelete = styled.div`
    display: flex;
    height: 48px;
    background-color: white;
    padding: 12px 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;
`;

const CheckBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
`;

const TotalChoiceText = styled.span`
    font-family: 'Pretendard';
    font-size: 12px;
    color: black;
    text-align: center;
`;

const DeleteText = styled.span`
    font-size: 12px;
    color: #545454;
    text-align: center;
`;

const PageContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: inherit;
    height: calc(100vh - 300px);
    position: fixed;
    top: 108px;
`;

const EmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const EmptyText = styled.span`
    font-size: 16px;
    color: #D9D9D9;
    text-align: center;
    margin-top: 16px;
`;

const DongleMarketButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;
    border: 1.5px solid #D9D9D9;
    padding: 12px;
    text-decoration: none;
    margin-top: 8px;
`;

interface SelectedItems {
    [key: number]: boolean;
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItemType[]>(initialItems); // 장바구니 상품 목록
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({}); // 선택된 상품 boolean
    const [selectAll, setSelectAll] = useState(true); // 전체선택용 boolean

    useEffect(() => {
        const initialSelectedItems: SelectedItems = {};
        cartItems.forEach(item => {
            initialSelectedItems[item.itemId] = true;
        });
        setSelectedItems(initialSelectedItems);
    }, [cartItems]);

    /** selectedItem 감지 */
    useEffect(() => {
        const selectedItemsLength = Object.values(selectedItems).filter((value) => (value === true)).length;
        if (cartItems.length === selectedItemsLength) {
            setSelectAll(true); // 전체선택 시 true
        } else {
            setSelectAll(false); // 전체선택 아닐 시 false
        }
    }, [selectedItems])

    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        const newSelectedItems: SelectedItems = {};
        cartItems.forEach(item => {
            newSelectedItems[item.itemId] = newSelectAll;
        });
        setSelectedItems(newSelectedItems);
    };

    const toggleItemSelection = (id: number) => {
        const newSelectedItems = { ...selectedItems, [id]: !selectedItems[id] };
        setSelectedItems(newSelectedItems);
    };

    const removeItem = (id: number) => {
        const newItems = cartItems.filter(item => item.itemId !== id);
        setCartItems(newItems);
        setSelectedItems(prevState => {
            const newState: SelectedItems = { ...prevState };
            delete newState[id];
            const allSelected = newItems.every(item => newState[item.itemId]);
            setSelectAll(allSelected);
            return newState;
        });
    };

    const removeSelectedItems = () => {
        const newItems = cartItems.filter(item => !selectedItems[item.itemId]);
        setCartItems(newItems);
        setSelectedItems(prevState => {
            const newSelectedItems: SelectedItems = {};
            newItems.forEach(item => {
                newSelectedItems[item.itemId] = prevState[item.itemId] ?? false;
            });
            const allSelected = newItems.length > 0 && Object.values(newSelectedItems).every(value => value);
            setSelectAll(allSelected);
            return newSelectedItems;
        });
    };

    /** 선택한 상품 세션에 담기 */
    const handleOrder = () => {
        const orderItems = cartItems.map((item) => {
            if (selectedItems[item.itemId]) {
                console.log(item);
            }
        })
    }

    const itemCount = cartItems.length;
    const selectedCount = Object.values(selectedItems).filter(Boolean).length;
    const totalPrice = cartItems.reduce((total, item) => total + (selectedItems[item.itemId] ? item.price : 0), 0);

    return (
        <div className="page">
            <CartHeader itemCount={cartItems.length} />
            <div className='content' style={{ paddingBottom: '163px' }}>
                <TabMenu />
                {cartItems.length === 0 ? (
                    <PageContent>
                        <EmptyContainer>
                            <EmptyCartSvg />
                            <EmptyText>장바구니가 텅 비었어요</EmptyText>
                            <DongleMarketButton href='/home'>동글마켓 구경가기</DongleMarketButton>
                        </EmptyContainer>
                    </PageContent>
                ) : (
                    <>
                        <ChoiceDelete>
                            <CheckBoxContainer onClick={toggleSelectAll}>
                                {selectAll ? <CheckSvg /> : <NonCheckSvg />}
                                <TotalChoiceText>전체선택</TotalChoiceText>
                            </CheckBoxContainer>
                            <DeleteText onClick={removeSelectedItems}>선택 삭제</DeleteText>
                        </ChoiceDelete>
                        {cartItems.map(item => (
                            <CartItem
                                key={item.itemId}
                                item={item}
                                selected={selectedItems[item.itemId]}
                                toggleSelection={() => toggleItemSelection(item.itemId)}
                                removeItem={() => removeItem(item.itemId)}
                            />
                        ))}
                    </>
                )}
            </div>
            {itemCount > 0 && <OrderSummary itemCount={selectedCount} totalPrice={totalPrice} onClick={handleOrder} />}
            <MyMarketFooterNav />
        </div>
    );
}