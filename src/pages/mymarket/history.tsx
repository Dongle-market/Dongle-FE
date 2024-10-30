// /mymarket/history/pages.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HistoryHeader from '@/components/header/CategoryHeader';
import MyMarketFooterNav from '@/components/navbar/MyMarketFooterNav';
import TabMenu from '@/components/header/TabMenu';
import HistoryItem from '@/components/items/HistoryItem';

interface HistoryItem {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

const items: HistoryItem[] = [
  { id: 1, imageUrl: '/images/An.png', name: '보류입니다.', price: 34000 },
  { id: 2, imageUrl: '/images/Baek.png', name: '어얼얽--', price: 34000 },
  { id: 3, imageUrl: '/images/An.png', name: '고기가 이븐하게 익지 않아써여', price: 34000 },
  { id: 4, imageUrl: '/images/Baek.png', name: '이거는 장바구니에 없는 거지롱~~', price: 34000 },
  { id: 5, imageUrl: '/images/An.png', name: '저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여', price: 34000 },
  { id: 6, imageUrl: '/images/Baek.png', name: '이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ', price: 34000 },
  { id: 7, imageUrl: '/images/product1.png', name: '이건 장바구니에 없는 거지롱~~‼️', price: 34000 },
  { id: 8, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
  { id: 9, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
  { id: 10, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 }
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

const HistoryContainer = styled.div`
  padding: 0 16px;
  background-color: #FFFFFF;
`;

export default function HistoryPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [itemCount, setItemCount] = useState(0);

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
      <HistoryHeader itemCount={itemCount}/>
      <div className='content'>
        <TabMenu />
        <HistoryContainer>
          {items.map(item => (
            <HistoryItem key={item.id} imageUrl={item.imageUrl} name={item.name} price={item.price} cartItems={cartItems} />
          ))}
        </HistoryContainer>
      </div>
      <MyMarketFooterNav />
    </div>
  );
}