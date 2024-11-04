// /mymarket/cart/pages.tsx
'use client';

import React, { useCallback, useEffect, useState } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialItems: CartItemType[] = [
    { itemId: 21, imageUrl: '/images/Son&Jeon.png', brand: '아디다스', name: '왜저뤠ㅞㅞ~~', price: 34000, itemCount: 1 },
    { itemId: 22, imageUrl: '/images/Baek.png', brand: '아디다스', name: '어얼얽--', price: 34000, itemCount: 1 },
    { itemId: 23, imageUrl: '/images/An.png', brand: '아디다스', name: '고기가 이븐하게 익지 않아써여', price: 34000, itemCount: 1 },
    { itemId: 24, imageUrl: '/images/An.png', brand: '아디다스', name: '보류입니다.', price: 34000, itemCount: 1 },
    { itemId: 25, imageUrl: '/images/An.png', brand: '아디다스', name: '저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여', price: 34000, itemCount: 1 },
    { itemId: 26, imageUrl: '/images/Baek.png', brand: '아디다스', name: '이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ', price: 34000, itemCount: 1 },
    { itemId: 27, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, itemCount: 1 },
    { itemId: 28, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, itemCount: 1 },
    { itemId: 29, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, itemCount: 1 },
    { itemId: 30, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스', price: 34000, itemCount: 1 },
    { itemId: 31, imageUrl: '/images/Son&Jeon.png', brand: '아디다스', name: '왜저뤠ㅞㅞ~~', price: 34000, itemCount: 1 }
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
        setSelectAll(cartItems.length === selectedItems.length); // 전체 선택

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
    const toggleItemSelection = (itemId: number) => {
        let newSelectedItems: CartItemType[] = [];
        if (selectedItems.some(selectedItem => selectedItem.itemId === itemId)) {
            newSelectedItems = selectedItems.filter(selectedItem => selectedItem.itemId !== itemId);
        } else {
            const newSelectedItem = cartItems.find(item => item.itemId === itemId);
            if (newSelectedItem) { newSelectedItems = [...selectedItems, newSelectedItem]; }
        }
        setSelectedItems(newSelectedItems);
        return;
    };

    /** 상품 삭제 및 selectedItem에서도 제거 */
    const removeItem = (itemId: number) => {
        const newSelectedItems = selectedItems.filter(selectedItem => selectedItem.itemId !== itemId);
        const newCartItems = cartItems.filter(cartItem => cartItem.itemId !== itemId); // cartItem에서 삭제
        setCartItems(newCartItems);
        setSelectedItems(newSelectedItems);
    };

    /** 선택된 상품 삭제 */
    const removeSelectedItems = () => {
        setCartItems(cartItems.filter(cartItem => !selectedItems.some(selectedItem => selectedItem.itemId === cartItem.itemId)));
        setSelectedItems([]);
    };

    const updateItemUtil = (items: any[], itemId: number, increment: boolean) => {
        let isError = false;
        const newItems = items.map(item => {
            if (item.itemId === itemId) {
                const newCount = increment ? item.itemCount+1 : item.itemCount-1;
                if (newCount < 1) {
                    isError = true;
                    return item;
                }
                return { ...item, itemCount: newCount };
            } else {
                return item;
            }
        })
        return { newItems, isError };
    }

    const handleIncrement = (itemId: number) => {
        const { newItems: newCartItems, } = updateItemUtil(cartItems, itemId, true);
        const { newItems: newSelectedItems, } = updateItemUtil(selectedItems, itemId, true);

        setCartItems(newCartItems);
        setSelectedItems(newSelectedItems);
    };

    const handleDecrement = (itemId: number) => {
        const { newItems: newCartItems, isError: err1 } = updateItemUtil(cartItems, itemId, false);
        const { newItems: newSelectedItems, isError: err2 } = updateItemUtil(selectedItems, itemId, false);

        if (err1 || err2) {
            handleToast();
            return;
        }

        setCartItems(newCartItems);
        setSelectedItems(newSelectedItems);
    };

    const handleToast = useCallback(() => {
        toast.error("1개부터 구매가능합니다", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                marginBottom: '32px',
                marginRight: '16px',
                marginLeft: '16px'
            }
        });
    }, []);

    /** 선택한 상품 세션에 담기 */
    const handleOrder = () => {
        localStorage.setItem('cartItems', JSON.stringify(selectedItems));
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
                                selected={selectedItems.some(selectedItem => selectedItem.itemId === item.itemId)}
                                toggleSelection={() => toggleItemSelection(item.itemId)}
                                removeItem={() => removeItem(item.itemId)}
                                handleIncrement={() => handleIncrement(item.itemId)}
                                handleDecrement={() => handleDecrement(item.itemId)}
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