//category.tsx

import Header from "@/components/header/CategoryHeader";
import FooterNav from "@/components/navbar/CategoryFooterNav";
import styled from 'styled-components';
import Link from "next/link";
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

interface TitleContainerProps {
    $marginTop?: number;
}

// Transient props를 사용해 props가 DOM에 전달되지 않도록 설정
const TitleContainer = styled.div<TitleContainerProps>`
    display: flex;
    align-items: center;
    padding: 0px 16px;
    margin-top: ${({ $marginTop = 16 }) => `${$marginTop}px`};
`;

const Title = styled.div`
    margin-right: 16px;
    font-size: 20px;
    font-weight: bold;
`;

const Line = styled.div`
    flex-grow: 1;          /* 남은 공간을 채워서 선이 길게 늘어남 */
    height: 1px;
    background-color: #d9d9d9;
`;

const ContentContainer = styled.div`
    margin-top: 20px;
`;

const Subtitle = styled.div`
    padding: 16px;
    font-size: 16px;
    font-weight: bold;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;    /* 요소들을 가로로 나열 */
    padding: 0 8px;         
    gap: 8px;               /* 요소들 사이의 간격 8px 설정 */
    overflow-x: auto;       /* 내용이 넘치면 가로 스크롤 생성 */
`;

const Item = styled(Link)`  /* Link로 Item을 클릭 가능하게 만듦 */
    padding: 8px;
    border-radius: 30px;
    flex-shrink: 0;
    font-size: 14px;
    text-decoration: none;    /* 링크의 기본 스타일을 없앰 */
    color: black;
    display: inline-block;
    &:hover {
        background-color: #F5A48F;
    }
`;

export default function CategoryPage() {
    const [items, ] = useState<CartItem[]>(initialItems);

    return (
        <div className="page">
            <Header />
            <div className="content">
            {/* 강아지 섹션 */}
            <TitleContainer $marginTop={16}>
                <Title>강아지</Title>
                <Line />
            </TitleContainer>
            <ContentContainer>
                <Subtitle>사료</Subtitle>
                <Content>
                    <Item href="/category/food">전체</Item>
                    <Item href="/category/food?species=dog&sub=wet">습식사료</Item>
                    <Item href="/category/food?species=dog&sub=soft">소프트사료</Item>
                    <Item href="/category/food?species=dog&sub=dry">건식사료</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>간식</Subtitle>
                <Content>
                    <Item href="/category/snack">전체</Item>
                    <Item href="/category/snack?species=dog&sub=hand">수제간식</Item>
                    <Item href="/category/snack?species=dog&sub=bread">빵/케이크</Item>
                    <Item href="/category/snack?species=dog&sub=bone">뼈간식</Item>
                    <Item href="/category/snack?species=dog&sub=kkum">껌</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>용품</Subtitle>
                <Content>
                    <Item href="/category/goods">전체</Item>
                    <Item href="/category/goods?species=dog&sub=clean">위생용품</Item>
                    <Item href="/category/goods?species=dog&sub=bath">목욕용품</Item>
                    <Item href="/category/goods?species=dog&sub=practice">훈련용품</Item>
                </Content>
            </ContentContainer>

            {/* 고양이 섹션 */}
            <TitleContainer $marginTop={20}>
                <Title>고양이</Title>
                <Line />
            </TitleContainer>
            <ContentContainer>
                <Subtitle>사료</Subtitle>
                <Content>
                    <Item href="/category/food?species=cat">전체</Item>
                    <Item href="/category/food?species=cat&sub=can">캔/통조림</Item>
                    <Item href="/category/food?species=cat&sub=dry">건식사료</Item>
                    <Item href="/category/food?species=cat&sub=wet">습식사료</Item>
                    <Item href="/category/food?species=cat&sub=air">에어/동결사료</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>간식</Subtitle>
                <Content>
                    <Item href="/category/snack?species=cat">전체</Item>
                    <Item href="/category/snack?species=cat&sub=chur">파우치/츄르</Item>
                    <Item href="/category/snack?species=cat&sub=hand">수제간식</Item>
                    <Item href="/category/snack?species=cat&sub=catnip">캣닢/캣그라스</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>용품</Subtitle>
                <Content>
                    <Item href="/category/goods?species=cat">전체</Item>
                    <Item href="/category/goods?species=cat&sub=tower">캣타워</Item>
                    <Item href="/category/goods?species=cat&sub=water">급수기</Item>
                    <Item href="/category/goods?species=cat&sub=bath">목욕용품</Item>
                </Content>
            </ContentContainer>
            </div>
            <FooterNav />
        </div>
    );
}
