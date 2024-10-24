'use client';

import Header from "@/components/layout/CategoryHeader";
import FooterNav from "@/components/layout/CategoryFooterNav";
import styled from 'styled-components';


interface TitleContainerProps {
    $marginTop?: number;
}

// Transient props를 사용해 props가 DOM에 전달되지 않도록 설정
const TitleContainer = styled.div<TitleContainerProps>`
    display: flex;
    align-items: center;
    padding: 0px 16px;
    margin-top: ${({ $marginTop = 16 }) => `${$marginTop}px`};  /* $marginTop을 CSS로 처리 */
`;

const Title = styled.div`
    margin-right: 16px;     /* 텍스트와 선 사이의 간격 */
    font-size: 20px;
    font-weight: bold;
`;

const Line = styled.div`
    flex-grow: 1;          /* 남은 공간을 채워서 선이 길게 늘어남 */
    height: 1.2px;
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
    padding: 0 8px;         /* 좌우 패딩 8px 설정 */
    gap: 8px;               /* 요소들 사이의 간격 8px 설정 */
    overflow-x: auto;       /* 내용이 넘치면 가로 스크롤 생성 */
`;

const Item = styled.div`
    padding: 8px;
    border-radius: 4px;
    flex-shrink: 0;        /* 아이템이 작아지지 않도록 설정 */
    font-size: 14px;
`;

export default function Home() {
    return (
        <div className="page">
            <Header />
            {/* 강아지 섹션 */}
            <TitleContainer $marginTop={16}>
                <Title>강아지</Title>
                <Line />
            </TitleContainer>
            <ContentContainer>
                <Subtitle>사료</Subtitle>
                <Content>
                    <Item>전체</Item>
                    <Item>습식사료</Item>
                    <Item>소프트사료</Item>
                    <Item>건식사료</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>간식</Subtitle>
                <Content>
                    <Item>전체</Item>
                    <Item>수제간식</Item>
                    <Item>빵/케이크</Item>
                    <Item>뼈간식</Item>
                    <Item>껌</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>용품</Subtitle>
                <Content>
                    <Item>전체</Item>
                    <Item>위생용품</Item>
                    <Item>목욕용품</Item>
                    <Item>훈련용품</Item>
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
                    <Item>전체</Item>
                    <Item>캔/통조림</Item>
                    <Item>건식사료</Item>
                    <Item>습식사료</Item>
                    <Item>에어/동결사료</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>간식</Subtitle>
                <Content>
                    <Item>전체</Item>
                    <Item>파우치/츄르</Item>
                    <Item>수제간식</Item>
                    <Item>캣닢/캣그라스</Item>
                </Content>
            </ContentContainer>
            <ContentContainer>
            <Subtitle>용품</Subtitle>
                <Content>
                    <Item>전체</Item>
                    <Item>캣타워</Item>
                    <Item>급수기</Item>
                    <Item>목욕용품</Item>
                </Content>
            </ContentContainer>
            <FooterNav />
        </div>
    );
}
