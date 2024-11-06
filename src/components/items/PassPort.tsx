// PetsPort.tsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BadgeSvg from '/public/svgs/element/badge.svg';
import Link from 'next/link';
import { getUserInfo } from '@/services/users/users';
import { UserResponse } from '@/services/users/users.type';

const PassportContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  box-sizing: border-box;
`;

const Passport = styled.div`
  position: absolute;
  bottom: 0;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
`;

const FirstPassport = styled(Passport)`
  background-color: #FFE5DD;
  width: 96%;
  height: 96%;
  z-index: 3;
  box-shadow: 3px -3px 6px rgba(0, 0, 0, 0.2);
`;

const SecondPassport = styled(Passport)`
  background-color: white;
  width: 98%;
  height: 98%;
  z-index: 2;
  box-shadow: 5px -5px 10px rgba(0, 0, 0, 0.3);
`;

const ThirdPassport = styled(Passport)`
  background-color: #3D3E92;
  width: 100%;
  height: 100%;
  z-index: 1;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
`;

const PassportBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  padding: 16px;
`;

const PassPortHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const PassportHeaderLeft = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: #0B0D83;
`;

const PassportHeaderRight = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #0B0D83;
`;

const PassportInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 12px;
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
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const InputTitle = styled.span`
    font-size: 8px;
    font-weight: 600;
    color: #0B0D83;
`;

const InputContent = styled.span`
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    text-decoration: none;
`;

const ClubBadge = styled.div`
    display: flex;
    align-items: center;
    background-color: #0B0D83;
    border-radius: 50px;
    font-size: 10px;
    font-weight: 600;
    padding: 0 4px;
    margin: 10px 0 0 0;
    color: white;
`;

const PassportImage = styled.img`
  width: 128px;
  height: 160px;
  margin-right: 24px;
  object-fit: cover;
`;

const UserEditButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background-color: rgba(11, 13, 131, 0.75);
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
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

const PassPort = () => {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // 사용자 정보 로딩 중 표시
  }
  
  return (
    <PassportContainer>
      <FirstPassport>
        <PassportBody>
          <PassPortHeaderContainer>
            <PassportHeaderLeft>여권 PETSPORT</PassportHeaderLeft>
            <PassportHeaderRight>동글민국 REPUBLIC OF DONGLE</PassportHeaderRight>
          </PassPortHeaderContainer>
          <PassportInfoContainer>
            <PassportImage src={user.profilePic} alt={user.userName} />
            <InputBody>
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
                  <InputTitle>이름</InputTitle>
                  <InputContent>{user.userName}</InputContent>
                </InputWrapper>
                <ClubBadge><BadgeSvg/> 댕니버스 클럽</ClubBadge>
              </InputContainer>
              <InputWrapper>
                <InputTitle>전화번호</InputTitle>
                <InputContent>{user.phoneNumber ?? "등록된 번호가 없습니다."}</InputContent>
              </InputWrapper>
              <UserEditButton href="/profile/edit">✈️ 회원정보 수정</UserEditButton>
            </InputBody>
          </PassportInfoContainer>
        </PassportBody>
        <PetsPortCode src='/svgs/pet/passportcode.svg' />
      </FirstPassport>
      <SecondPassport />
      <ThirdPassport />
    </PassportContainer>
  )
};

export default PassPort;