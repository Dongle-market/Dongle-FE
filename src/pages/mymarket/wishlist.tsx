// /mymarket/wishlist/pages.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WishlistHeader from '@/components/header/CategoryHeader';
import MyMarketFooterNav from '@/components/navbar/MyMarketFooterNav';
import TabMenu from '@/components/header/TabMenu';
import { CategoryItemWrapper } from '@/components/items/CategoryItem';
import EmptyWishlistSvg from '../../../public/svgs/element/empty_heart.svg';
import Link from 'next/link';

interface WishlistItem {
    itemId: number;
    image: string;
    title: string;
    lprice: number;
    selectedPetIds?: number[];
};

const items: WishlistItem[] = [
    { itemId: 1, image: '/images/An.png', title: '보류입니다.', lprice: 34000 },
    { itemId: 2, image: '/images/Baek.png', title: '어얼얽--', lprice: 34000 },
    { itemId: 3, image: '/images/An.png', title: '고기가 이븐하게 익지 않아써여', lprice: 34000 },
    { itemId: 4, image: '/images/Son&Jeon.png', title: '왜저뤠ㅞㅞㅞ~~', lprice: 34000 },
    { itemId: 5, image: '/images/An.png', title: '저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여', lprice: 34000 },
    { itemId: 6, image: '/images/Baek.png', title: '이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ', lprice: 34000 },
    { itemId: 7, image: '/images/product1.png', title: '도치빌 리더스', lprice: 34000 },
    { itemId: 8, image: '/images/product1.png', title: '도치빌 리더스', lprice: 34000 },
    { itemId: 9, image: '/images/product1.png', title: '도치빌 리더스', lprice: 34000 },
    { itemId: 10, image: '/images/product1.png', title: '도치빌 리더스', lprice: 34000 }
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

export default function WishlistPage() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateItemCount = () => {
            const count = parseInt(localStorage.getItem('cartItemCount') || '0');
            setItemCount(count);
        };

        updateItemCount();
        window.addEventListener('storage', updateItemCount);
        return () => window.removeEventListener('storage', updateItemCount);
    }, []);


    return (
        <div className="page">
            <WishlistHeader itemCount={itemCount} />
            <div className='content'>
                <TabMenu />
                {items.length === 0 ? (
                    <PageContent>
                        <EmptyContainer>
                            <EmptyWishlistSvg />
                            <EmptyText>위시리스트가 텅 비었어요</EmptyText>
                            <DongleMarketButton href='/home'>동글마켓 구경가기</DongleMarketButton>
                        </EmptyContainer>
                    </PageContent>
                ) : (
                    <>
                        <WishlistContainer>
                            {items.map((item) => (
                                <Wrapper key={item.itemId} >
                                    <CategoryItemWrapper item={item} hasAdditionalElement={true} defaultLiked={true} isInteractive={true} />
                                </Wrapper>
                            ))}
                        </WishlistContainer>
                    </>
                )}
            </div>
            <MyMarketFooterNav />
        </div>
    );
}