// /myDongle/pages.tsx
"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyDongleFooterNav from "@/components/navbar/MyDongleFooterNav";
import Header from "@/components/header/CategoryHeader";
import Image from "next/image";
import Link from "next/link";
import { CategoryItemWrapper } from "@/components/items/CategoryItem";
import DogImg from "../../../public/images/dog01.png";
import CatImg from "../../../public/images/cat01.png";
import Addpet from "../../../public/svgs/pet/addpet.svg";
import MyDongleHeader from "../../components/myDongle/myDongleHeader";
import MyDongleHistoryItem from "@/components/items/MyDongleHistoryItem";

const PetHeader = styled.div`
  padding-top: 36px;
  height: 124px;
  width: 100%;
  background-color: #f8f8f8;
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
`;

const CodeBlock = styled.img`
  width: 90%;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const DogImg01 = styled(Image)`
  margin-left: 16px;
  width: 64px;
  height: 64px;
  border-radius: 100%;
  border: 2px solid #e55737;
`;

const DogImg02 = styled(Image)`
  margin-left: 20px;
  width: 86px;
  height: 86px;
  border-radius: 10%;
`;

const CatImg01 = styled(Image)`
  margin-left: 16px;
  margin-right: 16px;
  width: 64px;
  height: 64px;
  border-radius: 100%;
`;

const CodeBlockImg = styled(Image)`
  width: 64px;
  height: 64px;
`;

const PetsportComponent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Petsport = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 22px 22px 0 0;
  margin: 0 16px;
  width: 100%;
  height: 238.5px;
  background-color: #dcdcdc;
  border: 1.5px solid #c2c2c2;
`;

const PetsportPage = styled.div`
  position: relative;
  border-radius: 15px 15px 0 0;
  width: 100%;
  margin: 8px 8px;
  height: 232px;
  background-color: #35241e;
`;
const TextLine = styled.div`
  display: flex;
  justify-content: space-between; /* 양쪽 끝에 요소 배치 */
`;

const PetsportText = styled.span`
  margin: 20px;
  font-size: 10px;
  color: #ff9e7e;
  font-family: "Pretendard";
  font-weight: 400;
  text-align: left;
`;

const BoldText = styled.span`
  font-weight: 700; /* "PETSPORT" 부분만 굵게 */
`;

const DongleText = styled.span`
  margin: 20px;
  font-size: 10px;
  color: #ffffff;
  font-family: "Pretendard";
  opacity: 0.6;
  font-weight: 400;
  text-align: right;
`;

const TitleText = styled.span`
  margin-bottom: 4px;
  margin-left: 20px;
  font-size: 8px;
  color: #ffffff;
  font-family: "Pretendard";
  font-weight: 500;
`;

const InfoText = styled.span`
  margin-left: 20px;
  font-size: 14px;
  color: #ff9e7e;
  font-family: "Pretendard";
  font-weight: 500;
`;

const TitleTextContianer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄바꿈을 자동으로 적용 */
  gap: 20px;
  margin-left: 20px;
`;

const Position = styled.div`
  display: flex;
`;

// const LineComponent = styled.div`
//   margin-top: 10px;
//   background-color: #080808;
//   width: 50%;
//   height: 1.5px;
// `;
const PetsPortContainer = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  position: absolute;
  width: 100%;
  height: 30px;
  bottom: 24px;
`;

const Tab = styled.span`
  margin-top: 10px;
  text-align: center;
  font-size: 16px;
  font-family: "Pretendard";
  font-weight: 600;
  width: 50%;
  line-height: 48px;
  font-weight: ${(props) => (props.isActive ? "600" : "400")};
  color: ${(props) =>
    props.isActive ? "#080808" : "#5e5e5e"}; /* 선택된 탭 색상 */
  border-top: ${(props) =>
    props.isActive
      ? "1.5px solid #080808"
      : "1.5px solid #d9d9d9"}; /* 선택된 탭 밑줄 */
  cursor: pointer;
`;

const TabComponent = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const NoneComponent = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  gap: 16px; /* 텍스트와 버튼 사이 여백 */
  text-align: center;
`;

const NoneText = styled.span`
  font-size: 16px;
  font-family: "Pretendard";
  font-weight: 400;
  color: #5e5e5e;
`;

const GoToWishListButton = styled.a`
  font-family: "Pretendard";
  padding: 10px 18px;
  font-size: 14px;
  background-color: #eeeeee;
  color: #888888;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.5s ease;
  text-decoration: none; /* 기본 밑줄 제거 */

  &:hover {
    background-color: #080808; /* 버튼 호버 색상 */
    color: white;
  }
`;

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

export default function myDongle() {
  const items = [
    { id: 1, imageUrl: "/images/An.png", name: "보류입니다.", price: 34000 },
    { id: 2, imageUrl: "/images/Baek.png", name: "어얼얽--", price: 34000 },
    {
      id: 3,
      imageUrl: "/images/An.png",
      name: "고기가 이븐하게 익지 않아써여",
      price: 34000,
    },
    {
      id: 4,
      imageUrl: "/images/Son&Jeon.png",
      name: "왜저뤠ㅞㅞㅞ~~",
      price: 34000,
    },
    {
      id: 5,
      imageUrl: "/images/An.png",
      name: "저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여",
      price: 34000,
    },
    {
      id: 6,
      imageUrl: "/images/Baek.png",
      name: "이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ",
      price: 34000,
    },
    {
      id: 7,
      imageUrl: "/images/product1.png",
      name: "도치빌 리더스",
      price: 34000,
    },
    {
      id: 8,
      imageUrl: "/images/product1.png",
      name: "도치빌 리더스",
      price: 34000,
    },
    {
      id: 9,
      imageUrl: "/images/product1.png",
      name: "도치빌 리더스",
      price: 34000,
    },
    {
      id: 10,
      imageUrl: "/images/product1.png",
      name: "도치빌 리더스",
      price: 34000,
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const tabContents = [
    <>
      <NoneText>
        내 아이에게 주고싶은 물건을
        <br />
        위시리스트에서 고를 수 있어요!
      </NoneText>
      <GoToWishListButton href="/mymarket/wishlist">
        위시리스트 바로가기
      </GoToWishListButton>
    </>,
    <>
      <NoneText>
        내 아이에게 준 물건을
        <br />
        실제 주문내역에서 고를 수 있어요!
      </NoneText>
      <GoToWishListButton href="/mymarket/history">
        주문내역 바로가기
      </GoToWishListButton>
    </>,
  ];

  return (
    <div className="page">
      <Header itemCount={5} />
      <div className="content">
        <MyDongleHeader />
        <PetsportComponent>
          <Petsport>
            <PetsportPage>
              <TextLine>
                <PetsportText>
                  여권 <BoldText>PETSPORT</BoldText>
                </PetsportText>
                <DongleText>동글월드 REPUBLIC OF DONGLE</DongleText>
              </TextLine>
              <Position>
                <DogImg02 src={DogImg} alt="강아지 이미지" />
                <TitleTextContianer>
                  <InfoBlock>
                    <TitleText>이름</TitleText>
                    <InfoText>동글이</InfoText>
                  </InfoBlock>
                  <InfoBlock>
                    <TitleText>국가코드</TitleText>
                    <InfoText>KOR</InfoText>
                  </InfoBlock>
                  <InfoBlock>
                    <TitleText>여권번호</TitleText>
                    <InfoText>DOG001</InfoText>
                  </InfoBlock>
                  <InfoBlock>
                    <TitleText>나이</TitleText>
                    <InfoText>7세</InfoText>
                  </InfoBlock>
                  <InfoBlock>
                    <TitleText>성별</TitleText>
                    <InfoText>여</InfoText>
                  </InfoBlock>
                </TitleTextContianer>
              </Position>
              <PetsPortContainer>
                <CodeBlock src="/svgs/pet/codeBlock.svg" alt="여권코드" />
              </PetsPortContainer>
            </PetsportPage>
          </Petsport>
        </PetsportComponent>
        <TabComponent>
          <Tab isActive={activeTab === 0} onClick={() => setActiveTab(0)}>
            위시리스트
          </Tab>
          <Tab isActive={activeTab === 1} onClick={() => setActiveTab(1)}>
            주문내역
          </Tab>
        </TabComponent>
        <div isActive={activeTab === 0} onClick={() => setActiveTab(0)}>
          {items.length !== 0 ? (
            <WishlistContainer>
              {items.map((item) => (
                <Wrapper key={item.id}>
                  <CategoryItemWrapper
                    item={item}
                    hasAdditionalElement={true}
                    defaultLiked={true}
                    isInteractive={true}
                  />
                </Wrapper>
              ))}
            </WishlistContainer>
          ) : (
            <NoneComponent> {tabContents[activeTab]} </NoneComponent>
          )}
        </div>
        <div isActive={activeTab === 1} onClick={() => setActiveTab(1)}>
          {items.length !== 0 ? (
            <WishlistContainer>
              {items.map((item) => (
                <Wrapper key={item.id}>
                  <MyDongleHistoryItem
                    key={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    price={item.price}
                  />
                </Wrapper>
              ))}
            </WishlistContainer>
          ) : (
            <NoneComponent> {tabContents[activeTab]} </NoneComponent>
          )}
        </div>
      </div>
      <MyDongleFooterNav />
    </div>
  );
}
