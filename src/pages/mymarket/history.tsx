// /mymarket/history/pages.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import WishlistHeader from '@/components/header/CategoryHeader';
import MyMarketFooterNav from '@/components/navbar/MyMarketFooterNav';
import TabMenu from '@/components/header/TabMenu';
import { CategoryItemWrapper } from '@/components/items/CategoryItem';

interface Item {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
};

const items: Item[] = [
    { id: 1, imageUrl: '/images/An.png', name: '보류입니다.', price: 34000 },
    { id: 2, imageUrl: '/images/Baek.png', name: '어얼얽--', price: 34000 },
    { id: 3, imageUrl: '/images/An.png', name: '고기가 이븐하게 익지 않아써여', price: 34000 },
    { id: 4, imageUrl: '/images/Baek.png', name: '뭐여 이거', price: 34000 },
    { id: 5, imageUrl: '/images/An.png', name: '저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여', price: 34000 },
    { id: 6, imageUrl: '/images/Baek.png', name: '이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ', price: 34000 },
    { id: 7, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
    { id: 8, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
    { id: 9, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
    { id: 10, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 }
];

const WishlistContainer = styled.div`
    display: flex;
    gap: 16px;
    flex-direction: row;
    flex-wrap: wrap;
    width: auto;
    padding: 16px;
    padding-right: 0;
`;

const Wrapper = styled.div`
    box-sizing: border-box;
    width: calc(50% - 16px);
`;

export default function Home() {
    return (
        <div className="page">
            <WishlistHeader />
            <div className='content'>
                <TabMenu />
                
            </div>
            <MyMarketFooterNav />
        </div>
    );
}