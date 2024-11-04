// MainHeader.tsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DongleSvg from '/public/svgs/logo/whitelogo_dongle.svg'
import DogSvg from '/public/svgs/logo/logo_dog.svg';
import ShoppingBasketSvg from '/public/svgs/header/white_shoppingbag.svg';
import Link from 'next/link';
import Toggle from '@/components/header/Toggle';
import MenuBar from '@/components/header/MenuBar';
import router, { useRouter } from 'next/router';
import { Main } from 'next/document';

const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  max-width: 600px;
  height: 112px;
  top: 0;
  box-sizing: border-box;
`;
const LogoContainer = styled(Link)`
  display: flex;
  gap: 2px;
  text-decoration: none;
  cursor: pointer;
`;

const LogoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BasketContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const ItemCountBadge = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: white;
  color: #E55737;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  max-width: 600px;
`;

interface MainHeaderProps {
  itemCount: number;
  onSpeciesChange: (species: string) => void;
  onMainCategoryChange: (mainCategory: string | null) => void;
}

interface MainHeaderContainerProps {
  $isTop: boolean;
}

const MainHeaderContainer = styled.div<MainHeaderContainerProps>`
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: 102px;
  top: 0;
  box-sizing: border-box;
  background-color: ${({ $isTop }) => ($isTop ? 'transparent' : '#ED6648')};
  background-size: cover;
  background-position: top;
  z-index: 10000;
  transition: background-color 0.25s ease;
`;

const MainHeader: React.FC<MainHeaderProps> = ({
  itemCount, 
  onSpeciesChange, 
  onMainCategoryChange
}) => {
  const router = useRouter();
  const [isTop, setIsTop] = useState<boolean>(true);
  const [selectedSpecies, setSelectedSpecies] = useState('dog');
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);

  const handleCartClick = () => {
    router.push('/mymarket/cart');
  };

  const handleSpeciesChange = (species: string) => {
    setSelectedSpecies(species);
    onSpeciesChange(species);
    setSelectedMainCategory(null); // species 변경 시 mainCategory 초기화
  };

  const handleMainCategoryChange = (mainCategory: string | null) => {
    setSelectedMainCategory(mainCategory);
    onMainCategoryChange(mainCategory);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <MainHeaderContainer $isTop={isTop}>
      <HeaderContainer>
        <LogoWarpper>
          <LogoContainer href="/home">
            <DongleSvg />
            <DogSvg />
          </LogoContainer>
          <BasketContainer onClick={handleCartClick}>
            <ShoppingBasketSvg />
            {<ItemCountBadge>{itemCount}</ItemCountBadge>}
          </BasketContainer>
        </LogoWarpper>
        <ButtonWrapper>
        <Toggle selected={selectedSpecies} onToggleChange={handleSpeciesChange} />
        <MenuBar
          selectedItem={selectedMainCategory}
          onItemClick={handleMainCategoryChange}
        />
        </ButtonWrapper>
      </HeaderContainer>
    </MainHeaderContainer>
  );
}

export default MainHeader;