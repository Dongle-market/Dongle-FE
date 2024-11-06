// PetsPort.tsx

import React from "react";
import styled from "styled-components";
import { useRouter } from 'next/router';


const PassportContainer = styled.div`
  position: relative;
  width: 100%;
  height: 230px;
  padding: 0 16px;
`;

const Passport = styled.div`
  position: absolute;
  bottom: 0;
  border-top-right-radius: 14px;
  border-top-left-radius: 14px;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
`;

const FirstPassport = styled(Passport)`
  background-color: #35241E;
  width: 98%;
  height: 98%;
  z-index: 2;
`;

const SecondPassport = styled(Passport)`
  background-color: #DCDCDC;
  border: 1.5px solid #C2C2C2;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const PassportBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 38px;
  padding: 16px;
`;

const PassPortHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const PassportHeaderLeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2px;
`;

const PassportHeaderLeft = styled.div`
  font-size: 10px;
  color: #FF9E7E;
`;

const BoldText = styled.div`
    font-size: 10px;
    color: #FF9E7E;
    font-weight: 600;
`;

const PassportHeaderRight = styled.div`
  font-size: 8px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
`;

const PassportInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 12px;
  gap: 32px;
  align-items: center;
`;

const InputBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 48%;
`;

const InputTitle = styled.span`
    font-size: 8px;
    font-weight: 600;
    color: #FFFFFF;
`;

const InputContent = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #FF9E7E;
    text-decoration: none;
`;

const PassportImage = styled.img`
  width: 85px;
  height: 85px;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
`;

const PetsPortCode = styled.img`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 0 12px;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
`;

export const imageMap: { [key: number]: string } = {
  1: "/images/petprofileimages/dog1.png",
  2: "/images/petprofileimages/dog2.png",
  3: "/images/petprofileimages/dog3.png",
  4: "/images/petprofileimages/cat1.png",
  5: "/images/petprofileimages/cat2.png",
  6: "/images/petprofileimages/cat3.png",
};

const Pet = [
  {
    pet: {
      petId: 13,
      petName: "동글이",
      profileImg: 1,
      type: "dog",
      gender: "male",
      age: 5,
      userId: 2,
    },
    orderItems: [
      {
        itemId: 21,
        title:
          "슈퍼벳 리퀴드잇 노령견 <b>강아지 습식사료</b> 액상사료 회복식 노견 200ml 5개",
        image:
          "https://shopping-phinf.pstatic.net/main_8358452/83584527138.7.jpg",
        price: 29000,
        orderDate: "2024-11-04T00:27:57.031Z",
      },
      {
        itemId: 22,
        title:
          "개똑 유기농 <b>강아지 습식사료</b> 치매예방 그레인프리 쇠고기맛 12개입 1팩",
        image:
          "https://shopping-phinf.pstatic.net/main_8239770/82397707016.3.jpg",
        price: 16900,
        orderDate: "2024-11-04T01:56:52.659Z",
      },
    ],
  },
];

const PetsPort = () => {

  const router = useRouter();

  const routeToInfo = (petId: number) => {
    router.push(`/mydongle/add?id=${petId}`);
  };


  return (
    <PassportContainer>
      <FirstPassport>
          <PassportBody>
              <PassPortHeaderContainer>
                  <PassportHeaderLeftWrapper>
                      <PassportHeaderLeft>여권</PassportHeaderLeft>
                      <BoldText>PETSPORT</BoldText>
                  </PassportHeaderLeftWrapper>
                  <PassportHeaderRight>동글월드 REPUBLIC OF DONGLE</PassportHeaderRight>
              </PassPortHeaderContainer>
              <PassportInfoContainer>
                  <PassportImage src={imageMap[Pet[0].pet.profileImg]} onClick={() => routeToInfo(Pet[0].pet.petId)}/>
                  <InputBody>
                      <InputContainer>
                          <InputWrapper>
                              <InputTitle>이름</InputTitle>
                              <InputContent>{Pet[0].pet.petName}</InputContent>
                          </InputWrapper>
                      </InputContainer>
                      <InputContainer>
                          <InputWrapper>
                              <InputTitle>국가코드</InputTitle>
                              <InputContent>KOR</InputContent>
                          </InputWrapper>
                          <InputWrapper>
                              <InputTitle>여권번호</InputTitle>
                              <InputContent>URECA001</InputContent>
                          </InputWrapper>
                      </InputContainer>
                      <InputContainer>
                          <InputWrapper>
                              <InputTitle>나이</InputTitle>
                              <InputContent>{Pet[0].pet.age}세</InputContent>
                          </InputWrapper>
                          <InputWrapper>
                              <InputTitle>성별</InputTitle>
                              <InputContent>{Pet[0].pet.gender}</InputContent>
                          </InputWrapper>
                      </InputContainer>
                  </InputBody>
              </PassportInfoContainer>
          </PassportBody>
          <PetsPortCode src='/svgs/pet/passportcode.svg' />
      </FirstPassport>
      <SecondPassport />
    </PassportContainer>
  );
};

export default PetsPort;
