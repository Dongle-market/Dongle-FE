'use client';

import Header from "@/components/header/CategoryHeader";
import FooterNav from "@/components/navbar/CategoryFooterNav";
import styled from 'styled-components';
import Link from "next/link";


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

export default function Home() {
    return (
        <div className="page">
            <Header itemCount={0} />
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
                    <Item href="/category/snack">수제간식</Item>
                    <Item href="/category/snack">빵/케이크</Item>
                    <Item href="/category/snack">뼈간식</Item>
                    <Item href="/category/snack">껌</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>용품</Subtitle>
                <Content>
                    <Item href="/category/goods">전체</Item>
                    <Item href="/category/goods">위생용품</Item>
                    <Item href="/category/goods">목욕용품</Item>
                    <Item href="/category/goods">훈련용품</Item>
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
                    <Item href="/category/food">전체</Item>
                    <Item href="/category/food">캔/통조림</Item>
                    <Item href="/category/food">건식사료</Item>
                    <Item href="/category/food">습식사료</Item>
                    <Item href="/category/food">에어/동결사료</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>간식</Subtitle>
                <Content>
                    <Item href="/category/snack">전체</Item>
                    <Item href="/category/snack">파우치/츄르</Item>
                    <Item href="/category/snack">수제간식</Item>
                    <Item href="/category/snack">캣닢/캣그라스</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>용품</Subtitle>
                <Content>
                    <Item href="/category/goods">전체</Item>
                    <Item href="/category/goods">캣타워</Item>
                    <Item href="/category/goods">급수기</Item>
                    <Item href="/category/goods">목욕용품</Item>
                </Content>
            </ContentContainer>
            </div>
            <FooterNav />
        </div>
    );
}
