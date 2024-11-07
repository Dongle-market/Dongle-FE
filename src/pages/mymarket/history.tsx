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
  const [, setItemCount] = useState(0);
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
      <HistoryHeader />
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
                      orderId={order.orderId}
                      orderItemId={item.orderItemId}
                      imageurl={item.image}
                      name={item.title}
                      price={item.price}
                      orderDate={order.orderDate}
                      selectedPetIds={item.pets}
                      amount={item.itemCount}
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