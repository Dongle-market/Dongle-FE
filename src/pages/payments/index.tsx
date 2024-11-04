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
import { OrderRequestType } from '@/services/payments/payments.type';
import { getUserInfo } from '@/services/users/users';
import { CartItemType } from '@/types/item';
import { UserResponse } from '@/services/users/users.type';
import { postOrder } from '@/services/payments/payments';

const TossPayButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 600px;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
`;

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

// TODO : 장바구니 혹은 단일 상품 정보를 navigator로 받아오기
export default function PaymentsPage() {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [userData, setUserData] = useState<UserResponse>();
    const [totalPrice, setTotalPrice] = useState(0); // 총 가격
    const [orderData, setOrderData] = useState<OrderRequestType>(); // 서버에 보낼 주문 데이터
    const [showDetails, setShowDetails] = useState(false); // 주문상품 펼치기
    const [check, setCheck] = useState(false); // 결제 동의 선택

    useEffect(() => {
      const cartItemsString = localStorage.getItem('cartItems');
      if (cartItemsString) {
        const parsedCartItems = JSON.parse(cartItemsString);
        setCartItems(parsedCartItems);
      }
      
      getUserInfo().then((data) => {
        setUserData(data);
      }).catch((error) => {
        console.error(error);
      })
    }, [])

    useEffect(() => {
        setShowDetails(cartItems.length < 5); // 장바구니 상품이 5개 이하일 경우 펼치기
        if (cartItems && userData) {
            setTotalPrice(cartItems.reduce((acc, item) => acc + item.price*item.itemCount, 0));
            setOrderData({
                receiverName: userData.userName,
                addr: userData.addr || '서울특별시 강남구 선릉로 428',
                addrDetail: userData.addrDetail || '멀티캠퍼스 선릉 402호',
                phoneNumber: userData.phoneNumber || '010-1234-5678',
                totalPrice: cartItems.reduce((acc, item) => acc + item.price*item.itemCount, 0),
                orderItems: {
                    ...cartItems.map(item => {
                        return {
                            itemId: item.itemId,
                            itemCount: item.itemCount,
                            price: item.price
                        }
                    })
                }
            })
        }
    }, [cartItems, userData])


    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const toggleCheck = () => {
        setCheck(!check);
    }

    const handleOrder = async (orderData: OrderRequestType) => {
      try {
        const orderResponse = await postOrder(orderData);
        
      } catch (error) {
        
      }
    }

    return (
        <div className="page">
            <PaymentsHeader itemCount={cartItems.length} />
            <div className='content'>

                {/** 주문자 정보 */}
                {orderData && <UserContactInfo
                    orderUser={orderData.receiverName}
                    contactUser={orderData.receiverName}
                    phoneNum={orderData.phoneNumber}
                    contactAdd={orderData.addr + ' ' + orderData.addrDetail}
                />}

                {/** 주문 상품 */}
                {cartItems && 
                    <OrderProduct>
                        주문 상품
                        <OrderCountContainer onClick={toggleDetails}>
                            <OrderProductCount>{cartItems.length}개 항목</OrderProductCount>
                            {showDetails ? <ArrowUpSvg /> : <ArrowDownSvg />}
                        </OrderCountContainer>
                    </OrderProduct>
                }
                {showDetails ? (
                    <OrderItem cartItems={cartItems} />
                ) : (
                    <DeliveryMessage>
                        판매자 배송 상품을 여러 개 구매한 경우, 구매한 상품은 함께 배송 될 수 있으며 늦은 발송일에 맞춰 발송될 수 있습니다.
                    </DeliveryMessage>
                )}
                <TotalPriceContainer>
                    <PriceWrapper>
                        <PriceContainer>
                            <PriceText>상품 금액</PriceText>
                            <PriceText>{totalPrice.toLocaleString()} 원</PriceText>
                        </PriceContainer>
                        <PriceContainer>
                            <PriceText>배송비</PriceText>
                            <DeliveryPrice>무료</DeliveryPrice>
                        </PriceContainer>
                    </PriceWrapper>
                    <PriceContainer>
                        <TotalPriceText>총 결제 금액</TotalPriceText>
                        <TotalPrice>{totalPrice.toLocaleString()} 원</TotalPrice>
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
                {check && orderData ? <TossPayButton onClick={() => handleOrder(orderData)} /> : <NoTossPayButton />}
            </TossPayButtonWrapper>
        </div>
    );
}