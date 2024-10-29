import styled, { css } from 'styled-components';
import { useState } from 'react';
import HeartSvg from '/public/svgs/element/heart.svg';
import HeartFullSvg from '/public/svgs/element/heart_full.svg';
import PlusSvg from '/public/svgs/element/plus.svg';
import MinusSvg from '/public/svgs/element/minus.svg';

const Wrapper = styled.div`
  padding: 24px 16px;
  position: fixed;
  width: 100%;
  max-width: inherit;
  bottom: 0;
  box-sizing: border-box;
  background-color: #fdfdfd;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

const BottomContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

const QuantityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 110px;
  padding: 8px 16px;
  background-color: #f1f1f1;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid #E55737;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const BuyButton = styled(Button)`
  background-color: #E55737;
  color: white;
`;

const BasketButton = styled(Button)`
  background-color: #ffffff;
  color: black;
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const ProfileImage = styled.img<{ $isSelected: boolean }>`
  width: 31px;
  height: 31px;
  border-radius: 50%;
  border: 2px solid #f8f8f8;
  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border: 2px solid #FF9E7E;
    `}
`;

const HeartContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

interface ItemFooterProps {
  price: number;
  profileImages: string[];
}

const ItemFooter = ({ price, profileImages }: ItemFooterProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState<boolean[]>(() =>
    Array(profileImages.length).fill(false)
  );

  const formattedPrice = `${price.toLocaleString('ko-KR')} 원`;

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const toggleProfileBorder = (index: number) => {
    setSelectedProfiles((prevSelected) =>
      prevSelected.map((isSelected, i) => (i === index ? !isSelected : isSelected))
    );
  };

  return (
    <Wrapper>
      <TopContainer>
        <Price>{formattedPrice}</Price>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isHeartFilled && (
            <ProfileWrapper>
              {profileImages.map((src, index) => (
                <ProfileImage
                  key={index}
                  src={src}
                  alt={`Profile ${index + 1}`}
                  $isSelected={selectedProfiles[index]}
                  onClick={() => toggleProfileBorder(index)}
                />
              ))}
            </ProfileWrapper>
          )}
          {/* 하트와 프로필 이미지를 개별 컨테이너에 넣어 분리 */}
          <HeartContainer onClick={toggleHeart}>
            {isHeartFilled ? <HeartFullSvg /> : <HeartSvg />}
          </HeartContainer>
        </div>
      </TopContainer>
      <BottomContainer>
        <QuantityContainer>
          <MinusSvg onClick={handleDecrease} style={{ cursor: 'pointer' }}>-</MinusSvg>
          <span>{quantity}개</span>
          <PlusSvg onClick={handleIncrease} style={{ cursor: 'pointer' }}>+</PlusSvg>
        </QuantityContainer>
        <BasketButton>장바구니</BasketButton>
        <BuyButton>주문하기</BuyButton>
      </BottomContainer>
    </Wrapper>
  );
};

export default ItemFooter;
