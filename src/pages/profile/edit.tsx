// /profile/edit.tsx

import React, { useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import UserHeader from '@/components/header/CategoryHeader';
import UserInfoFooterNav from '@/components/navbar/UserInfoFooterNav';
import CartItem from '@/components/items/CartItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KaKaoTalkSvg from '../../../public/svgs/element/kakaotalk.svg';
import CalendarSvg from '../../../public/svgs/element/calendar.svg';
import BadgeSvg from '/public/svgs/element/badge.svg';

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

interface SelectedItems {
    [key: number]: boolean;
};

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

const User = {
    name: '최우진',
    imageUrl: '/images/babodaejang.png',
    email: 'ureca@kakao.com',
    phone: '010-1234-5678'
};

export default function ProfileEditPage() {
    const [items, ] = useState<CartItem[]>(initialItems);
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState({
        roadAddress: '',
        detailAddress: ''
    });
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setIsChanged(birthdate !== '' || (address.roadAddress !== '' && address.detailAddress !== ''));
    }, [birthdate, address]);

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const initialSelectedItems: SelectedItems = {};
        items.forEach(item => {
            initialSelectedItems[item.id] = true;
        });
        setSelectedItems(initialSelectedItems);
    }, []);

    const itemCount = Object.values(selectedItems).filter(Boolean).length;

    return (
        <div className="page">
            <UserHeader itemCount={itemCount} />
            <ToastContainer
                position="top-center"
                style={{ marginTop: '32px', boxSizing: 'border-box' }}
                toastStyle={{ margin: '16px', width: 'calc(100% - 32px)' }}
            />
            <div className='content'>
                <ProfileContainer>
                    <ProfileImageWrapper>
                        <ProfileImage src={User.imageUrl} alt="Profile Image" />
                        <ClubBadge><BadgeSvg /> 댕니버스 클럽</ClubBadge>
                    </ProfileImageWrapper>
                    <InfoField>
                        <Label>이메일</Label>
                        <InputWrapper>
                            <EmailInput type="text" value={User.email} disabled />
                            <SvgContainer>
                                <KaKaoTalkSvg />
                            </SvgContainer>
                        </InputWrapper>
                    </InfoField>
                    <InfoField>
                        <Label>이름</Label>
                        <Input type="text" value={User.name} disabled />
                    </InfoField>
                    <InfoField>
                        <Label>휴대폰 번호</Label>
                        <Input type="text" value={User.phone} disabled />
                    </InfoField>
                    <InfoField>
                        <Label>생년월일 (선택)</Label>
                        <InputWrapper>
                            <CalendarSvg style={{ marginRight: '4px' }} />
                            <Input
                                type="date"
                                value={birthdate}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setBirthdate(e.target.value)}
                            />
                        </InputWrapper>
                    </InfoField>
                    <InfoField>
                        <Label>배송지 정보 (선택)</Label>
                        <AddressInputContainer>
                            <Input
                                type="text"
                                name="roadAddress"
                                value={address.roadAddress}
                                onChange={handleAddressChange}
                                placeholder="도로명 주소"
                            />
                            <Input
                                type="text"
                                name="detailAddress"
                                value={address.detailAddress}
                                onChange={handleAddressChange}
                                placeholder="상세 주소 (동, 호수)"
                            />
                        </AddressInputContainer>
                    </InfoField>
                    <Button disabled={!isChanged}>저장하기</Button>
                </ProfileContainer>
            </div>
            <UserInfoFooterNav />
        </div>
    );
}