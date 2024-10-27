import styled,{ css } from 'styled-components';
import { useState } from 'react';
import HeartSvg from '/public/svgs/element/heart.svg';
import HeartFullSvg from '/public/svgs/element/heart_full.svg';
import PlusSvg from '/public/svgs/element/plus.svg';
import MinusSvg from '/public/svgs/element/minus.svg';

const Wrapper = styled.div`
  padding: 16px;
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

const ProfileWrapper = styled.div<{ $isSelected: boolean }>`
  width: 24px;
  height: 24px;
  overflow: hidden;
  cursor: pointer;
  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border: 1px solid #000;
    `}
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const ItemFooter = ({ price }: { price: number }) => {
  const [quantity, setQuantity] = useState(1);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isProfileSelected, setIsProfileSelected] = useState(false);

  const formattedPrice = `${price.toLocaleString('ko-KR')} 원`;

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const toggleProfileBorder = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsProfileSelected(!isProfileSelected);
  };

  return (
    <Wrapper>
      <TopContainer>
        <Price>{formattedPrice}</Price>
        <div onClick={toggleHeart} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isHeartFilled && (
              <ProfileWrapper
              $isSelected={isProfileSelected}
              onClick={toggleProfileBorder}
            >
              <ProfileImage
                src="https://via.placeholder.com/24x24.png?text=%20"
                alt="Profile"
              />
            </ProfileWrapper>
            )}
          {isHeartFilled ? <HeartFullSvg /> : <HeartSvg />}
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
