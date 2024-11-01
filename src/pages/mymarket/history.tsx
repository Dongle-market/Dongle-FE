// /mymarket/history/pages.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HistoryHeader from '@/components/header/CategoryHeader';
import MyMarketFooterNav from '@/components/navbar/MyMarketFooterNav';
import TabMenu from '@/components/header/TabMenu';
import HistoryItem from '@/components/items/HistoryItem';
import RocketSvg from '../../../public/svgs/element/rocket.svg'
import { group } from 'console';

interface HistoryItem {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

interface HistoryGroup {
  date: string;
  status: string;
  items: HistoryItem[];
}

const items: HistoryGroup[] = [
  {
    date: '2024-10-30',
    status: '결제완료',
    items: [
      { id: 1, imageUrl: '/images/An.png', name: '보류입니다.', price: 34000 },
      { id: 2, imageUrl: '/images/Baek.png', name: '어얼얽--', price: 34000 },
      { id: 3, imageUrl: '/images/An.png', name: '고기가 이븐하게 익지 않아써여', price: 34000 },
      { id: 4, imageUrl: '/images/Baek.png', name: '이거는 장바구니에 없는 거지롱~~', price: 34000 },
    ]
  },
  {
    date: '2024-11-02',
    status: '배송완료',
    items: [
      { id: 5, imageUrl: '/images/An.png', name: '저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여', price: 34000 },
      { id: 6, imageUrl: '/images/Baek.png', name: '이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ', price: 34000 },
      { id: 7, imageUrl: '/images/product1.png', name: '이건 장바구니에 없는 거지롱~~‼️', price: 34000 },
      { id: 8, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
      { id: 9, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
      { id: 10, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 }
    ]
  }
];

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
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
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

interface GroupedItems {
  [key: string]: HistoryGroup;
}

function formatDeliveryDate(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1); // 하루 추가
  const dayOfWeek = date.toLocaleString('ko-KR', { weekday: 'short' })[0]; // 요일의 첫 글자
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`; // '월/일' 형식
  return `${formattedDate}(${dayOfWeek})`; // 최종 문자열 조합
}

export default function HistoryPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [itemCount, setItemCount] = useState(0);
  // const [groupedItems, setGroupedItems] = useState<{ [key: string]: HistoryItem[] }>({});

  useEffect(() => {
    const updateItemCount = () => {
      const count = parseInt(localStorage.getItem('cartItemCount') || '0', 10);
      setItemCount(count);
    };

    updateItemCount();
    window.addEventListener('storage', updateItemCount);
    return () => window.removeEventListener('storage', updateItemCount);
  }, []);

  const [groupedItems, setGroupedItems] = useState<GroupedItems>({});

  useEffect(() => {
    const groupedByDate = items.reduce((acc: GroupedItems, group) => {
      acc[group.date] = group; // 이제 정의된 타입에 맞게 저장합니다.
      return acc;
    }, {});

    setGroupedItems(groupedByDate);
  }, []);

  return (
    <div className="page">
      <HistoryHeader itemCount={itemCount} />
      <div className='content'>
        <TabMenu />
        {/* {Object.entries(groupedItems).map(([date, items]) => (
          <DateGroupContainer key={date}>
            <OrderDateWrapper>
              <OrderDate>{date}</OrderDate>
              <RocketWrapper>
                <RocketSvg />
                <RocketDelivery>동글로켓배송</RocketDelivery>
              </RocketWrapper>
            </OrderDateWrapper>
            <OrderItemContainer>
              <DeliveryStatusWrapper>
                <DeliveryStatus>{group.status}</DeliveryStatus>
                <Icon>|</Icon>
                <DeliveryDate>5/12(일) 도착</DeliveryDate>
              </DeliveryStatusWrapper>
              {items.map(item => (
                <HistoryItem key={item.id} imageUrl={item.imageUrl} name={item.name} price={item.price} orderDate={date} cartItems={cartItems} />
              ))}
            </OrderItemContainer>
          </DateGroupContainer>
        ))} */}
        {items.map((group: HistoryGroup) => (
          <DateGroupContainer key={group.date}>
            <OrderDateWrapper>
              <OrderDate>{group.date}</OrderDate>
              <RocketWrapper>
                <RocketSvg />
                <RocketDelivery>동글로켓배송</RocketDelivery>
              </RocketWrapper>
            </OrderDateWrapper>
            <OrderItemContainer>
              <DeliveryStatusWrapper>
                <DeliveryStatus>{group.status}</DeliveryStatus>
                <Icon>|</Icon>
                <DeliveryDate>{formatDeliveryDate(group.date)} 도착</DeliveryDate>
              </DeliveryStatusWrapper>
              {group.items.map(item => (
                <HistoryItem
                  key={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  orderDate={group.date}
                  cartItems={cartItems}
                />
              ))}
            </OrderItemContainer>
          </DateGroupContainer>
        ))}
      </div>
      <MyMarketFooterNav />
    </div>
  );
}