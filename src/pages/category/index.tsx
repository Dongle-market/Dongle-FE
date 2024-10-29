'use client';

import Header from "@/components/header/CategoryHeader";
import FooterNav from "@/components/navbar/CategoryFooterNav";
import styled from 'styled-components';
import Link from "next/link";


interface TitleContainerProps {
    $marginTop?: number;
}

const ContentWrapper = styled.div`
    flex-grow: 1;
    padding-bottom: 100px;
    padding-top: 60px;
`;

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
    flex-grow: 1;
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
    flex-direction: row;    
    padding: 0 8px;         
    gap: 8px;               
    overflow-x: auto;
`;

const Item = styled(Link)`
    padding: 8px;
    border-radius: 30px;
    flex-shrink: 0;
    font-size: 14px;
    text-decoration: none;
    color: black;
    display: inline-block;
    &:hover {
        background-color: #F5A48F;
    }
`;

export default function Home() {
    return (
        <div className="page">
            <Header />
            <ContentWrapper>
            {/* 강아지 섹션 */}
            <TitleContainer $marginTop={16}>
                <Title>강아지</Title>
                <Line />
            </TitleContainer>
            <ContentContainer>
                <Subtitle>사료</Subtitle>
                <Content>
                    <Item href="/dog/food">전체</Item>
                    <Item href="/dog/wet-food">습식사료</Item>
                    <Item href="/dog/soft-food">소프트사료</Item>
                    <Item href="/dog/dry-food">건식사료</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>간식</Subtitle>
                <Content>
                    <Item href="/dog/food">전체</Item>
                    <Item href="/dog/food">수제간식</Item>
                    <Item href="/dog/food">빵/케이크</Item>
                    <Item href="/dog/food">뼈간식</Item>
                    <Item href="/dog/food">껌</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>용품</Subtitle>
                <Content>
                    <Item href="/dog/food">전체</Item>
                    <Item href="/dog/food">위생용품</Item>
                    <Item href="/dog/food">목욕용품</Item>
                    <Item href="/dog/food">훈련용품</Item>
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
                    <Item href="/cat/food">전체</Item>
                    <Item href="/cat/food">캔/통조림</Item>
                    <Item href="/cat/food">건식사료</Item>
                    <Item href="/cat/food">습식사료</Item>
                    <Item href="/cat/food">에어/동결사료</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>간식</Subtitle>
                <Content>
                    <Item href="/cat/food">전체</Item>
                    <Item href="/cat/food">파우치/츄르</Item>
                    <Item href="/cat/food">수제간식</Item>
                    <Item href="/cat/food">캣닢/캣그라스</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>용품</Subtitle>
                <Content>
                    <Item href="/cat/food">전체</Item>
                    <Item href="/cat/food">캣타워</Item>
                    <Item href="/cat/food">급수기</Item>
                    <Item href="/cat/food">목욕용품</Item>
                </Content>
            </ContentContainer>
            </ContentWrapper>
            <FooterNav />
        </div>
    );
}
