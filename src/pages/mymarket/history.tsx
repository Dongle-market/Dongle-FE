// /mymarket/history/pages.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HistoryHeader from '@/components/header/CategoryHeader';
import MyMarketFooterNav from '@/components/navbar/MyMarketFooterNav';
import TabMenu from '@/components/header/TabMenu';
import HistoryItem from '@/components/items/HistoryItem';
import RocketSvg from '../../../public/svgs/element/rocket.svg'
import EmptyOrderSvg from '../../../public/svgs/element/empty_order.svg';
import Link from 'next/link';
import { getOrderInfo } from '../../../src/services/order/order'; // API 호출 함수 임포트
import { Order } from '../../../src/services/order/order.type'; // 타입 임포트

const initialCartItems = [
  { id: 1, imageUrl: '/images/Son&Jeon.png', name: '왜저뤠ㅞㅞ~~', price: 34000 },
  { id: 2, imageUrl: '/images/Baek.png', name: '어얼얽--', price: 34000 },
  { id: 3, imageUrl: '/images/An.png', name: '고기가 이븐하게 익지 않아써여', price: 34000 },
  { id: 4, imageUrl: '/images/An.png', name: '보류입니다.', price: 34000 },
  { id: 5, imageUrl: '/images/An.png', name: '저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여', price: 34000 },
  { id: 6, imageUrl: '/images/Baek.png', name: '이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ', price: 34000 },
  { id: 7, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
  { id: 8, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
  { id: 9, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
  { id: 10, imageUrl: '/images/product1.png', name: '도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스', price: 34000 }
];

const DateGroupContainer = styled.div`
  margin-bottom: 8px;
  padding: 16px;
  background-color: #FFFFFF;
`;

const OrderDateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const OrderDate = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const OrderItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1.5px solid #D9D9D9;
  border-radius: 8px;
  padding: 0 16px;
  margin-top: 16px;
`;

const RocketWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

const RocketDelivery = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #352412;
`;

const DeliveryStatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  margin-top: 16px;
`;

const Icon = styled.span`
  font-size: 16px;
  text-align: center;
  color: #D9D9D9;
`

const DeliveryStatus = styled.span`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const DeliveryDate = styled.span`
  font-size: 16px;
  color: #47DE60;
  text-align: center;
`;

const AllOrderCancelText = styled.div`
  display: flex;
  font-size: 16px;
  color: #D9D9D9;
  text-align: center;
  margin-top: 16px;
`;

const PageContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: inherit;
    height: calc(100vh - 300px);
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

function formatDeliveryDate(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  const dayOfWeek = date.toLocaleString('ko-KR', { weekday: 'short' })[0];
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
  return `${formattedDate}(${dayOfWeek})`;
}

export default function HistoryPage() {
  const [itemCount, setItemCount] = useState(0);
  const [cartItems] = useState(initialCartItems);
  const [orders, setOrders] = useState<Order[]>([]); // 빈 배열로 초기화

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const orderData: Order[] = await getOrderInfo(); // Order[] 타입으로 받음
        setOrders(orderData); // 바로 상태에 저장
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setOrders([]); // 오류 발생 시 빈 배열 설정
      }
    };

    loadOrders();
  }, []);

  const handleDeleteSuccess = (orderItemId: number) => {
    // 삭제 시 orderItemId로 필터링
    setOrders(orders => orders.map(order => ({
      ...order,
      orderItems: order.orderItems.filter(item => item.orderItemId !== orderItemId)
    })));
  };

  useEffect(() => {
    const updateItemCount = () => {
      const count = parseInt(localStorage.getItem('cartItemCount') || '0', 10);
      setItemCount(count);
    };

    updateItemCount();
    window.addEventListener('storage', updateItemCount);
    return () => window.removeEventListener('storage', updateItemCount);
  }, []);

  return (
    <div className="page">
      <HistoryHeader itemCount={itemCount} />
      <div className='content'>
        <TabMenu />
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <DateGroupContainer key={order.orderId}>
              <OrderDateWrapper>
                <OrderDate>{new Date(order.orderDate).toLocaleDateString('ko-KR')}</OrderDate>
                <RocketWrapper>
                  <RocketSvg />
                  <RocketDelivery>동글로켓배송</RocketDelivery>
                </RocketWrapper>
              </OrderDateWrapper>
              {order.orderItems.length > 0 ? (
                <OrderItemContainer>
                <DeliveryStatusWrapper>
                  <DeliveryStatus>{order.status}</DeliveryStatus>
                  <Icon>|</Icon>
                  <DeliveryDate>{formatDeliveryDate(order.orderDate)} 도착</DeliveryDate>
                </DeliveryStatusWrapper>
                {order.orderItems.map(item => (
                  <HistoryItem
                    key={item.itemId}
                    itemId={item.itemId}
                    orderItemId={item.orderItemId}
                    imageUrl={item.image}
                    name={item.title}
                    price={item.price}
                    orderDate={order.orderDate}
                    selectedPetIds={item.pets}
                    amount={item.itemCount}
                    cartItems={cartItems}
                    onDeleteSuccess={() => handleDeleteSuccess(item.itemId)}
                  />
                ))}
              </OrderItemContainer>
              ) : (
                  <AllOrderCancelText>모든 주문이 취소되었습니다.</AllOrderCancelText>
              )}
            </DateGroupContainer>
          ))
        ) : (
          <PageContent>
            <EmptyContainer>
              <EmptyOrderSvg />
              <EmptyText>아직 주문내역이 없어요</EmptyText>
              <DongleMarketButton href='/home'>동글마켓 구경가기</DongleMarketButton>
            </EmptyContainer>
          </PageContent>
        )}
      </div>
      <MyMarketFooterNav />
    </div>
  );
}