// /item/:itemId/payments.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PaymentsHeader from '@/components/header/PaymentsHeader';
import CartItem from '@/components/items/CartItem';
import TossPayButton from '@/components/payments/TossPayButton';
import NoTossPayButton from '@/components/payments/NoTossPayButton';
import UserContactInfo from '@/components/payments/UserContactInfo';
import OrderItem from '@/components/payments/OrderItem';
import ArrowUpSvg from '/public/svgs/element/arrow_up.svg';
import ArrowDownSvg from '/public/svgs/element/arrow_down.svg';
import NonCheckSvg from '/public/svgs/element/non_check.svg';
import CheckSvg from '/public/svgs/element/check.svg';

const TossPayButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 600px;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
`;

const userInfo = { orderUser: '최우진', contactUser: '심승보', phoneNum: '010-1234-5678', contactAdd: '서울 강남구 선릉로 428' };

interface CartItem {
    id: number;
    imageUrl: string;
    brand: string
    name: string;
    price: number;
    selected: boolean;
};

const initialItems: CartItem[] = [
    { id: 1, imageUrl: '/images/Son&Jeon.png', brand: '아디다스', name: '왜저뤠ㅞㅞ~~', price: 34000, selected: true },
    { id: 2, imageUrl: '/images/Baek.png', brand: '아디다스', name: '어얼얽--', price: 34000, selected: true },
    { id: 3, imageUrl: '/images/An.png', brand: '아디다스', name: '고기가 이븐하게 익지 않아써여', price: 34000, selected: true },
    { id: 4, imageUrl: '/images/An.png', brand: '아디다스', name: '보류입니다.', price: 34000, selected: true },
    { id: 5, imageUrl: '/images/An.png', brand: '아디다스', name: '저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여', price: 34000, selected: true },
    { id: 6, imageUrl: '/images/Baek.png', brand: '아디다스', name: '이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ', price: 34000, selected: true },
    { id: 7, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, selected: false },
    { id: 8, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, selected: false },
    { id: 9, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, selected: false },
    { id: 10, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스', price: 34000, selected: false },
    { id: 11, imageUrl: '/images/Son&Jeon.png', brand: '아디다스', name: '왜저뤠ㅞㅞ~~', price: 34000, selected: false }
];

const OrderProduct = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
    background-color: white;
    font-size: 20px;
    font-weight: 600;
    margin-top: 16px;
`;

const OrderCountContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;
`;

const OrderProductCount = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

const DeliveryMessage = styled.div`
    display: flex;
    padding: 0 16px 16px 16px;
    background-color: white;
    font-size: 12px;
    color: #BCBCBC;
`;

const TotalPriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    background-color: white;
    margin-top: 16px;
    gap: 8px;
`;

const PriceContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    font-size: 16px;
`;

const PriceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #D9D9D9;
    padding-bottom: 8px;
    margin-bottom: 8px;
`;

const PriceText = styled.div`
    font-size: 16px;
`;

const DeliveryPrice = styled.div`
    font-size: 16px;
    color: #ED6648;
`;

const TotalPriceText = styled.div`
    font-size: 20px;
    font-weight: 600;
`;

const TotalPrice = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #ED6648;
`;

const CheckWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 16px;
    background-color: white;
`;

const CheckContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
`;

const CheckText = styled.div`
    font-size: 16px;
    color: #919191;
`;

export default function PaymentsPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);
    const [showDetails, setShowDetails] = useState(false);
    const [check, setCheck] = useState(false);

    const selectedCartItems = cartItems.filter(item => item.selected);
    const orderCount = selectedCartItems.length;

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const toggleCheck = () => {
        setCheck(!check);
    }

    return (
        <div className="page">
            <PaymentsHeader itemCount={cartItems.length} />
            <div className='content'>
                <UserContactInfo
                    orderUser={userInfo.orderUser}
                    contactUser={userInfo.contactUser}
                    phoneNum={userInfo.phoneNum}
                    contactAdd={userInfo.contactAdd}
                />
                <OrderProduct>
                    주문 상품
                    <OrderCountContainer onClick={toggleDetails}>
                        <OrderProductCount>{orderCount}개</OrderProductCount>
                        {showDetails ? <ArrowUpSvg /> : <ArrowDownSvg />}
                    </OrderCountContainer>
                </OrderProduct>
                {showDetails ? (
                    <OrderItem cartItems={selectedCartItems} />
                ) : (
                    <DeliveryMessage>
                        판매자 배송 상품을 여러 개 구매한 경우, 구매한 상품은 함께 배송 될 수 있으며 늦은 발송일에 맞춰 발송될 수 있습니다.
                    </DeliveryMessage>
                )}
                <TotalPriceContainer>
                    <PriceWrapper>
                        <PriceContainer>
                            <PriceText>상품 금액</PriceText>
                            <PriceText>{selectedCartItems.reduce((acc, item) => acc + item.price, 0).toLocaleString()} 원</PriceText>
                        </PriceContainer>
                        <PriceContainer>
                            <PriceText>배송비</PriceText>
                            <DeliveryPrice>무료</DeliveryPrice>
                        </PriceContainer>
                    </PriceWrapper>
                    <PriceContainer>
                        <TotalPriceText>총 결제 금액</TotalPriceText>
                        <TotalPrice>{selectedCartItems.reduce((acc, item) => acc + item.price, 0).toLocaleString()} 원</TotalPrice>
                    </PriceContainer>
                </TotalPriceContainer>
                <CheckWrapper>
                    <CheckContainer onClick={toggleCheck}>
                        {check ? <CheckSvg /> : <NonCheckSvg />}
                        <CheckText>주문내용 확인 및 결제 동의 🐶</CheckText>
                    </CheckContainer>
                </CheckWrapper>
            </div>
            <TossPayButtonWrapper>
                {check ? <TossPayButton /> : <NoTossPayButton />}
            </TossPayButtonWrapper>
        </div>
    );
}