// /mydongle/add.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyDongleHeader from '@/components/header/CategoryHeader';
import MyDongleFooterNav from '@/components/navbar/MyDongleFooterNav';
import CartItem from '@/components/items/CartItem';
import ErrorSvg from '/public/svgs/element/error.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import MyDongleAddHeader from '../../components/header/MyDongleHeader';

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

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 16px 16px;
`;

const Title = styled.span`
    font-size: 24px;
    font-weight: 600;
    /* color: #E55737; */
    color: #352412;
`;

const SemiTitle = styled.span`
    font-size: 16px;
    color: #E55737;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 48px;
`;

const RegistrationCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Question = styled.span`
    font-size: 16px;
`;

const NameInput = styled.input`
  background-color: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  box-sizing: border-box;
  height: 50px;
  padding: 10px;
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`;

const OptionButton = styled.button<{ selected: boolean }>`
  padding: 12px 16px;
  font-size: 16px;
  background-color: ${props => props.selected ? '#FFE6DD' : '#FFFFFF'};
  color: ${props => props.selected ? '#E55737' : '#5E5E5E'};
  border: ${props => props.selected ? '1.5px solid #E55737' : '1px solid #D9D9D9'};
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #FFE6DD;
    color: #E55737;
    border: 1.5px solid #E55737
  }
`;

const AgeInputWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const AgeInput = styled.input`
    width: 60px;
    background-color: #FFFFFF;
    border: 1px solid #D9D9D9;
    border-radius: 10px;
    box-sizing: border-box;
    height: 50px;
    padding: 10px;
    font-size: 16px;
`;

const AgeLabel = styled.span`
    margin-left: 8px;
    font-size: 16px;
`;

const PetProfileImageOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  align-items: center;
  width: 100%;
  gap: 12px;
  box-sizing: border-box;
  
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const PetProfileImageOptionButton = styled.button<{ selected: boolean, imageUrl: string }>`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  color: ${props => props.selected ? '#E55737' : '#5E5E5E'};
  border: ${props => props.selected ? '2px solid #E55737' : '1px solid #D9D9D9'};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #FFE6DD;
    color: #E55737;
    border: 2px solid #E55737
  }
`;

const pets = [
    { id: 1, imageUrl: '/images/petprofileimages/dog1.png' },
    { id: 2, imageUrl: '/images/petprofileimages/cat1.png' },
    { id: 3, imageUrl: '/images/petprofileimages/dog2.png' },
    { id: 4, imageUrl: '/images/petprofileimages/cat2.png' },
    { id: 5, imageUrl: '/images/petprofileimages/dog3.png' },
    { id: 6, imageUrl: '/images/petprofileimages/cat3.png' },
];

const RegistButton = styled.button`
  padding: 15px;
  background-color: #080808;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 12px;
`;

const NonRegistButton = styled.button`
  padding: 15px;
  background-color: #EEEEEE;
  color: #888888;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  font-size: 16px;
  margin-top: 12px;
  text-align: center;
`;

export default function MyDongleAddPage() {
    const [items, setItems] = useState<CartItem[]>(initialItems);
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
    const [name, setName] = useState('');
    const [animalType, setAnimalType] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [nameError, setNameError] = useState('');
    const [ageError, setAgeError] = useState('');

    const isFormFilled = name && animalType && gender && age && profileImage;

    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isFormFilled) {
            toast.error('모든 입력 필드를 채워주세요.', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            router.push('/mydongle');
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputName = e.target.value;
        if (inputName.length > 20) {
            setNameError('20자까지 입력 가능합니다.');
            setName(inputName.slice(0, 20));
        } else {
            setNameError('');
            setName(inputName);
        }
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputAge = e.target.value;
        const ageNumber = Number(inputAge);
        if (!inputAge || (ageNumber >= 0 && ageNumber <= 200)) {
            setAgeError('');
            setAge(inputAge);
        } else {
            setAgeError('숫자만 입력 가능합니다. (0~200)');
        }
    };

    const handleAnimalTypeChange = (type: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setAnimalType(type);
    };

    const handleGenderChange = (gender: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setGender(gender);
    };

    const handleProfileImageChange = (profileImage: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setProfileImage(profileImage);
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
            <MyDongleHeader itemCount={itemCount} />
            <ToastContainer
                position="top-center"
                style={{ marginTop: '32px', boxSizing: 'border-box' }}
                toastStyle={{ margin: '16px', width: 'calc(100% - 32px)' }}
            />
            <div className='content'>
                <MyDongleAddHeader />
                <TitleWrapper>
                    <Title>ARRIVAL CARD</Title>
                    <SemiTitle>입국신고서 (댕냥전용)</SemiTitle>
                </TitleWrapper>
                <Wrapper>
                    <form onSubmit={handleSubmit}>
                        <RegistrationCard>
                            <InfoContainer>
                                <Question>반려동물의 프로필 사진을 선택해주세요.</Question>
                                <PetProfileImageOptionContainer>
                                    {pets.map(pet => (
                                        <PetProfileImageOptionButton
                                            key={pet.id}
                                            selected={profileImage === `profileImage${pet.id}`}
                                            imageUrl={pet.imageUrl}
                                            onClick={(e) => handleProfileImageChange(`profileImage${pet.id}`, e)}
                                        />
                                    ))}
                                </PetProfileImageOptionContainer>
                            </InfoContainer>
                            <InfoContainer>
                                <Question>반려동물의 이름을 입력하세요.</Question>
                                {nameError && (
                                    <div style={{ color: 'red', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                                        <ErrorSvg style={{ marginRight: '4px' }} />
                                        {nameError}
                                    </div>
                                )}
                                <NameInput type="text" value={name} onChange={handleNameChange} />
                            </InfoContainer>
                            <InfoContainer>
                                <Question>반려동물의 종은 무엇인가요?</Question>
                                <ButtonWrapper>
                                    <OptionButton selected={animalType === 'dog'} onClick={(e) => handleAnimalTypeChange('dog', e)}>
                                        🐶 강아지
                                    </OptionButton>
                                    <OptionButton selected={animalType === 'cat'} onClick={(e) => handleAnimalTypeChange('cat', e)}>
                                        😺 고양이
                                    </OptionButton>
                                </ButtonWrapper>
                            </InfoContainer>
                            <InfoContainer>
                                <Question>반려동물의 성별은 무엇인가요?</Question>
                                <ButtonWrapper>
                                    <OptionButton selected={gender === 'male'} onClick={(e) => handleGenderChange('male', e)}>
                                        남
                                    </OptionButton>
                                    <OptionButton selected={gender === 'female'} onClick={(e) => handleGenderChange('female', e)}>
                                        여
                                    </OptionButton>
                                </ButtonWrapper>
                            </InfoContainer>
                            <InfoContainer>
                                <Question>반려동물의 나이는 몇 살인가요?</Question>
                                {ageError && (
                                    <div style={{ color: 'red', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                                        <ErrorSvg style={{ marginRight: '4px' }} />
                                        {ageError}
                                    </div>
                                )}
                                <AgeInputWrapper>
                                    <AgeInput type="text" value={age} onChange={handleAgeChange} />
                                    <AgeLabel>살</AgeLabel>
                                </AgeInputWrapper>
                            </InfoContainer>
                            {isFormFilled && !nameError && !ageError ? (
                                <RegistButton type="submit">등록하기</RegistButton>
                            ) : (
                                <NonRegistButton type="submit">등록하기</NonRegistButton>
                            )}
                        </RegistrationCard>
                    </form>
                </Wrapper>
            </div>
            <MyDongleFooterNav />
        </div>
    );
}