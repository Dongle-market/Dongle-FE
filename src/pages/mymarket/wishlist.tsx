// /mymarket/wishlist/pages.tsx
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
}

const items: Item[] = [
    { id: 1, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
    { id: 2, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
    { id: 3, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
    { id: 4, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
    { id: 5, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
    { id: 6, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
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
`

export default function Home() {
    return (
        <div className="page">
            <WishlistHeader />
            <div className='content'>
                <TabMenu />
                <WishlistContainer>
                    {items.map((item) => (
                        <Wrapper key={item.id} >
                            <CategoryItemWrapper item={item} hasAdditionalElement={true} defaultLiked={true} />
                        </Wrapper>    
                    ))}
                </WishlistContainer>
            </div>
            <MyMarketFooterNav />
        </div>
    );
}