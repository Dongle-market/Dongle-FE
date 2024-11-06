// PetsPort.tsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PetInfoResponseType } from "../../services/pets/pets.type";
import { useRouter } from "next/router";
import { PetType } from "@/services/pets/pets.type";

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
  background-color: #35241e;
  width: 98%;
  height: 98%;
  z-index: 2;
`;

const SecondPassport = styled(Passport)`
  background-color: #dcdcdc;
  border: 1.5px solid #c2c2c2;
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
  color: #ff9e7e;
`;

const BoldText = styled.div`
  font-size: 10px;
  color: #ff9e7e;
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
  align-items: center;
  gap: 32px;
`;

const InputBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const InputTitle = styled.span`
  font-size: 8px;
  font-weight: 600;
  color: #ffffff;
`;

const InputContent = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ff9e7e;
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
  2: "/images/petprofileimages/cat1.png",
  3: "/images/petprofileimages/dog2.png",
  4: "/images/petprofileimages/cat2.png",
  5: "/images/petprofileimages/dog3.png",
  6: "/images/petprofileimages/cat3.png",
};

// const Pet = [
//   {
//     pet: {
//       petId: 13,
//       petName: "동글이",
//       profileImg: 1,
//       type: "dog",
//       gender: "male",
//       age: 5,
//       userId: 2,
//     },
//     orderItems: [
//       {
//         itemId: 21,
//         title:
//           "슈퍼벳 리퀴드잇 노령견 <b>강아지 습식사료</b> 액상사료 회복식 노견 200ml 5개",
//         image:
//           "https://shopping-phinf.pstatic.net/main_8358452/83584527138.7.jpg",
//         price: 29000,
//         orderDate: "2024-11-04T00:27:57.031Z",
//       },
//       {
//         itemId: 22,
//         title:
//           "개똑 유기농 <b>강아지 습식사료</b> 치매예방 그레인프리 쇠고기맛 12개입 1팩",
//         image:
//           "https://shopping-phinf.pstatic.net/main_8239770/82397707016.3.jpg",
//         price: 16900,
//         orderDate: "2024-11-04T01:56:52.659Z",
//       },
//     ],
//   },
// ];

interface PetsPortType {
  petId: number;
  petName: string;
  profileImg: number;
  type: string;
  gender: string;
  age: number;
  userId: number;
}

const PetsPort = ({
  petId,
  petName,
  profileImg,
  type,
  gender,
  age,
}: PetsPortType) => {
  const [petData, setPetData] = useState<PetInfoResponseType | null>(null);
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
            <PassportHeaderRight>
              동글월드 REPUBLIC OF DONGLE
            </PassportHeaderRight>
          </PassPortHeaderContainer>
          <PassportInfoContainer>
            <PassportImage
              src={imageMap[profileImg]}
              onClick={() => routeToInfo(petId)}
            />
            <InputBody>
              <InputContainer>
                <InputWrapper>
                  <InputTitle>이름</InputTitle>
                  <InputContent>{petName}</InputContent>
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
                  <InputContent>{age}세</InputContent>
                </InputWrapper>
                <InputWrapper>
                  <InputTitle>성별</InputTitle>
                  <InputContent>{gender}</InputContent>
                </InputWrapper>
              </InputContainer>
            </InputBody>
          </PassportInfoContainer>
        </PassportBody>
        <PetsPortCode src="/svgs/pet/passportcode.svg" />
      </FirstPassport>
      <SecondPassport />
    </PassportContainer>
  );
};

export default PetsPort;
