'use client';

import Header from "@/components/layout/CategoryHeader";
import FooterNav from "@/components/layout/CategoryFooterNav";
import styled from 'styled-components';

const TitleContainer = styled.div`
  display: flex;
  align-items: center;   /* 텍스트와 선을 수직 가운데로 정렬 */
  margin-top: 16px;
  padding: 0px 16px;
`;

const Title = styled.div`
  font-size: 20px;
  margin-right: 16px;     /* 텍스트와 선 사이의 간격 */
`;

const Line = styled.div`
  flex-grow: 1;          /* 남은 공간을 채워서 선이 길게 늘어남 */
  height: 1.2px;           /* 선의 두께 */
  background-color: #d9d9d9; /* 선의 색상 (여기서는 검정색) */
  margin-right: 16px;
`;

const ContentContainer = styled.div`
  margin-top: 20px;
`;

const Subtitle = styled.div`
    padding: 16px;
    font-size: 16px;
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
      <TitleContainer>
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
      <FooterNav />
    </div>
  );
}
