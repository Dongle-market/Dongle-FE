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
import { useRouter } from 'next/router';

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

export default function CartPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItemType[]>(initialItems); // 장바구니 상품 목록 (삭제시 여기서 삭제)
    const [selectedItems, setSelectedItems] = useState<CartItemType[]>(initialItems); // 선택된 상품 목록
    const [selectAll, setSelectAll] = useState(true); // 전체선택용 boolean

    const initialTotalPrice = initialItems.reduce((acc, cur) => acc + (cur.price*cur.itemCount), 0);
    const [totalPrice, setTotalPrice] = useState(initialTotalPrice); // 총 가격

    /** selectedItem 감지 */
    useEffect(() => {
        if (cartItems.length === selectedItems.length) {
            setSelectAll(true); // 전체선택 시 true
        } else {
            setSelectAll(false); // 전체선택 아닐 시 false
        }

        const sumPrice = selectedItems.reduce((acc, cur) => acc + (cur.price*cur.itemCount), 0);
        console.log(selectedItems, sumPrice);
        setTotalPrice(sumPrice);
    }, [selectedItems])

    /** 전체선택 토글 */
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectAll(false);
            setSelectedItems([]);
        } else {
            setSelectAll(true);
            setSelectedItems(cartItems);
        }
    };

    /** 개별 선택 토글 */
    const toggleItemSelection = (item: CartItemType) => {
        let newSelectedItems: CartItemType[] = [];
        if (selectedItems.includes(item)) {
            newSelectedItems = selectedItems.filter(selectedItem => selectedItem !== item);
        } else {
            newSelectedItems = [...selectedItems, item];
        }
        setSelectedItems(newSelectedItems);
        return;
    };

    /** 상품 삭제 및 selectedItem에서도 제거 */
    const removeItem = (item: CartItemType) => {
        if (selectedItems.includes(item)) { // 선택된 상품이면 selectedItems에서도 제거
            const newSelectedItems = selectedItems.filter(selectedItem => selectedItem !== item);
            setSelectedItems(newSelectedItems);
        }
        setCartItems(cartItems.filter(cartItem => cartItem !== item)); // cartItem에서 삭제
    };

    /** 선택된 상품 삭제 */
    const removeSelectedItems = () => {
        setCartItems(cartItems.filter(cartItem => !selectedItems.includes(cartItem)));
        setSelectedItems([]);
    };

    /** 선택한 상품 세션에 담기 */
    const handleOrder = () => {
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        router.push('/payments');
    }

    const itemCount = cartItems.length;
    const selectedCount = Object.values(selectedItems).filter(Boolean).length;

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
                                selected={selectedItems.includes(item)}
                                toggleSelection={() => toggleItemSelection(item)}
                                removeItem={() => removeItem(item)}
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