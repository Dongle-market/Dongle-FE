// components/ItemFooter.tsx

import styled, { css } from 'styled-components';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeartSvg from '/public/svgs/element/heart.svg';
import HeartFullSvg from '/public/svgs/element/heart_full.svg';
import PlusSvg from '/public/svgs/element/plus.svg';
import MinusSvg from '/public/svgs/element/minus.svg';
import { useRouter } from 'next/router';
import { CartItemType } from '@/types/item';

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
  border: solid 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
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
  flex-grow: 1;
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
  item: CartItemType;
  profileImages: string[];
}

const ItemFooter = ({ item, profileImages }: ItemFooterProps) => {
  const router = useRouter();
  
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState<boolean[]>(() =>
    Array(profileImages.length).fill(false)
  );
  
  const [currItem, setCurrItem] = useState<CartItemType>({
    itemId: item.itemId,
    imageurl: item.imageurl,
    brand: item.brand,
    name: item.name,
    price: item.price,
    itemCount: item.itemCount,
  });

  const formattedPrice = `${currItem.price.toLocaleString('ko-KR')} 원`;

  const handleIncrease = () => setCurrItem(prev => ({...prev, itemCount: prev.itemCount + 1}));
  const handleDecrease = () => {
    if (currItem.itemCount > 1) setCurrItem(prev => ({...prev, itemCount: prev.itemCount + 1}));
  };

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
    if (!isHeartFilled) {
      toast(
        <div>
          상품을 위시리스트에 담았어요!
          <br />
          <strong>이제 상품을 주고 싶은 반려동물을 지정할 수 있어요.</strong>
        </div>
      );
    }
  };

  const toggleProfileBorder = (index: number) => {
    setSelectedProfiles((prevSelected) =>
      prevSelected.map((isSelected, i) => (i === index ? !isSelected : isSelected))
    );
  };

  const handleAddToCart = () => {
    toast(
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        장바구니에 상품을 담았습니다.
        <button onClick={() => router.push('/mymarket/cart')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline' }}>
          바로가기
        </button>
      </div>
    );
  };

  const handleOrderClick = () => {
    sessionStorage.setItem('cartItems', JSON.stringify([currItem]));
    router.push('/payments');
  }

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        style={{
          marginBottom: '135px',
          padding: 0,
          width: '100%',
        }}
      />
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
            <HeartContainer onClick={toggleHeart}>
              {isHeartFilled ? <HeartFullSvg /> : <HeartSvg />}
            </HeartContainer>
          </div>
        </TopContainer>
        <BottomContainer>
          <QuantityContainer>
            <MinusSvg onClick={handleDecrease} style={{ cursor: 'pointer' }}>-</MinusSvg>
            <span>{currItem.itemCount}개</span>
            <PlusSvg onClick={handleIncrease} style={{ cursor: 'pointer' }}>+</PlusSvg>
          </QuantityContainer>
          <BasketButton onClick={handleAddToCart}>장바구니</BasketButton>
          <BuyButton onClick={handleOrderClick}>주문하기</BuyButton>
        </BottomContainer>
      </Wrapper>
      {/* Custom CSS for toast style */}
      <style jsx global>{`
        .Toastify__toast-container {
          max-width: 600px;
          width: 100%;
        }
        .Toastify__toast {
          font-size: 14px;
          background-color: rgba(0, 0, 0, 0.5) !important;
          color: #fff !important;
          backdrop-filter: blur(5px);
          border-radius: 16px;
          margin: 16px;
        }
      `}</style>
    </>
  );
};

export default ItemFooter;
