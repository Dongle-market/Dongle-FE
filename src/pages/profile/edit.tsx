// /profile/edit.tsx

import React, { useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import UserHeader from '@/components/header/CategoryHeader';
import UserInfoFooterNav from '@/components/navbar/UserInfoFooterNav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KaKaoTalkSvg from '../../../public/svgs/element/kakaotalk.svg';
import BadgeSvg from '/public/svgs/element/badge.svg';
import ErrorSvg from "/public/svgs/element/error.svg";
import { getUserInfo, updateUserInfo } from '@/services/users/users';
import { UserResponse } from '@/services/users/users.type';
import LoadingComponent from '@/components/common/Loading';
import router from 'next/router';
import FallbackComponent from '@/components/common/Fallback';

const ProfileContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const ProfileImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 8px;
`;

const ProfileImage = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
`;

const ClubBadge = styled.div`
    display: flex;
    align-items: center;
    background-color: #0B0D83;
    border-radius: 50px;
    font-size: 10px;
    font-weight: 600;
    padding: 0 4px;
    color: white;
`;

const InfoField = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: black;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  &:disabled {
    background-color: #f3f3f3;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #FFBDA7;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  appearance: none;

  &:disabled {
    background-color: #D9D9D9;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;


const AddressInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const SvgContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  display: flex;
  align-items: center;
`;

const EmailInput = styled(Input)`
  padding-right: 30px;
`;

const SkeletonImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;



export default function ProfileEditPage() {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [isChanged, setIsChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [phoneError, setPhoneError] = useState("");
  
// 1. UserInputData 인터페이스 정의
interface UserInputData {
    phoneNumber: string;
    addr: string;
    addrDetail: string;
  }
  
  // 2. 상태 선언
  const [userInputData, setUserInputData] = useState<UserInputData>({
    phoneNumber: '',
    addr: '',
    addrDetail: ''
  });
  
  const [initialUserData, setInitialUserData] = useState<UserInputData>({
    phoneNumber: '',
    addr: '',
    addrDetail: ''
  });
  
  // 3. 키 배열 정의
  const keys: (keyof UserInputData)[] = ['phoneNumber', 'addr', 'addrDetail'];
  
  // 4. 변경 사항 감지
  useEffect(() => {
    const hasChanged = keys.some(
      key => userInputData[key] !== initialUserData[key]
    );
    setIsChanged(hasChanged);
  }, [userInputData]);
  
  // 5. 사용자 정보 로드
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUser(userData);
  
        const initialData: UserInputData = {
          phoneNumber: userData.phoneNumber || '',
          addr: userData.addr ?? '',
          addrDetail: userData.addrDetail ?? ''
        };
  
        setUserInputData(initialData);
        setInitialUserData(initialData);
      } catch (error) {
        console.error("Failed to fetch user information: ", error);
      }
      finally{
        setIsLoading(false);
      }
    };
  
    fetchUserInfo();
  }, []); 

  if(isLoading) return (
    <LoadingComponent>
      <SkeletonImage src="/images/skeleton/userpage_skeleton.png" alt="skeleton" />
    </LoadingComponent>
  )
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserInputData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value;
      const inputNumber = input.replace(/\D/g, "");
      
      // 숫자가 아닌 문자가 포함된 경우에만 오류 메시지 표시
      if (input !== inputNumber) {
        setPhoneError("전화번호는 숫자만 입력해주세요.");
      } else {
        setPhoneError("");
      }
      setUserInputData((prev) => ({
        ...prev,
        phoneNumber: input.replace(/\D/g, ""),
      }));
    
    };
  
    const patchUserInfo = async () => {
      try {
        await updateUserInfo(userInputData);
        setInitialUserData(userInputData);
        setIsChanged(false);
        toast.success('프로필이 성공적으로 업데이트되었습니다.');
        router.push('/profile');
      } catch (error) {
        toast.error('프로필 업데이트 중 오류가 발생했습니다.');
        console.error(error);
      }
    };
  
    if (!user) {
      return <FallbackComponent />;
    }
  
    return (
      <div className="page">
        <UserHeader />
        <ToastContainer
          position="top-center"
          style={{ marginTop: '32px', boxSizing: 'border-box' }}
          toastStyle={{ margin: '16px', width: 'calc(100% - 32px)' }}
        />
        <div className='content'>
          <ProfileContainer>
            <ProfileImageWrapper>
              <ProfileImage src={user.profilePic} alt="Profile Image" />
              <ClubBadge><BadgeSvg /> 댕니버스 클럽</ClubBadge>
            </ProfileImageWrapper>
            <InfoField>
              <Label>사용자 아이디</Label>
              <InputWrapper>
                <EmailInput type="text" value={user.kakaoId} disabled />
                <SvgContainer>
                  <KaKaoTalkSvg />
                </SvgContainer>
              </InputWrapper>
            </InfoField>
            <InfoField>
              <Label>이름</Label>
              <Input type="text" value={user.userName} disabled />
            </InfoField>
            <InfoField>
              <Label>휴대폰 번호</Label>
              {phoneError && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      padding: "7px 0px 12px",
                    }}
                  >
                    <ErrorSvg style={{ marginRight: "4px" }} />
                    {phoneError}
                  </div>
                )}
              <Input
                type="text"
                name="phoneNumber"
                value={userInputData.phoneNumber}
                onChange={handlePhoneChange}
              />
            </InfoField>
            <InfoField>
              <Label>배송지 정보 (선택)</Label>
              <AddressInputContainer>
                <Input
                  type="text"
                  name="addr"
                  value={userInputData.addr}
                  onChange={handleInputChange}
                  placeholder="도로명 주소"
                />
                <Input
                  type="text"
                  name="addrDetail"
                  value={userInputData.addrDetail}
                  onChange={handleInputChange}
                  placeholder="상세 주소 (동, 호수)"
                />
              </AddressInputContainer>
            </InfoField>
            <Button onClick={patchUserInfo} disabled={!isChanged}>저장하기</Button>
          </ProfileContainer>
        </div>
        <UserInfoFooterNav />
      </div>
    );
  }
  