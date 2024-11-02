// item/index.tsx

'use client';

import Header from "@/components/header/ItemHeader";
import FooterNav from "@/components/navbar/ItemFooter";
import InfoSection from "@/components/items/ItemInfo";
import styled from 'styled-components';
import { useState } from "react";

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

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 390px;
    border-radius: 4px;
    overflow: hidden;
`;

const ItemImage = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const DetailTitle = styled.div`
    padding: 16px;
    font-size: 20px;
    font-weight: 600;
`;

const DetailImage = styled.img`
    width: 100%;
`;

export default function ItemPage() {
    const [items, setItems] = useState<CartItem[]>(initialItems);

    const profileImages = [
        "/images/catdongle.jpeg",
        "/images/gom.jpeg",
        "/images/soogom.jpeg",
    ];

    return (
        <div className="page">
            <Header itemCount={items.length} />
            <div className="content">
                <ImageWrapper>
                    <ItemImage
                        src="https://shopping-phinf.pstatic.net/main_1456236/14562361991.20240903141927.jpg"
                        alt="Product Image"
                    />
                </ImageWrapper>
                <InfoSection
                    categories={['사료', '건식사료']}
                    brand="now"
                    productName="NOW 그레인프리 스몰브리드 시니어 상품명이 과연 2줄로 넘어가면 어떻게 보이는지 한 번 볼까요?"
                    price={44900}
                />
                <DetailTitle>
                    상품설명
                </DetailTitle>
                <DetailImage src="https://shopping-phinf.pstatic.net/20200521_09_28/2968b9a2-aedf-4eda-84c8-cb09b81dae01/C:UsersuserDesktopb1ac3b5d07c1052752f6e75cb610e13d_092143.jpg"
                    alt="Product Detail Image" />
            </div>
            <FooterNav price={44900} profileImages={profileImages} />
        </div>
    );
}
