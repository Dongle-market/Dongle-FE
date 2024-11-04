// /home/index.tsx

import React, { useEffect, useState } from 'react';
import { fetchItemData } from "@/services/api/itemAPI";
import styled from 'styled-components';
import MainHeader from "@/components/header/MainHeader";
import FooterNav from "@/components/navbar/MainFooterNav";
import Banner from "@/components/main/Banner";
import MainItem from "@/components/items/MainItem";

interface Item {
  itemId: number;
  image: string;
  title: string;
  lprice: number;
  category: {
    mainCategory: string;
    subCategory: string;
    species: string;
  };
}


const DogMainPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  padding-bottom: 70px; 
  box-sizing: border-box;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  align-items: center;
  width: 100%;
  gap: 10px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 16px;
`;

const BoldText = styled.span`
    font-family: 'Pretendard';
    font-size: 16px;
    color: black;
    text-align: center;
    font-weight: 600;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 0 32px 16px;
`;

export default function DogHome() {
  const [itemCount, setItemCount] = useState(0);
  const [species, setSpecies] = useState('dog'); // Default to 'dog'
  const [mainCategory, setMainCategory] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Item[]>([]);


  useEffect(() => {
    fetchItemData()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error.message));
  }, []);

    // 동적 Title 설정
  const getTitle = (category: string, isSubCategory = false) => {
    if (isSubCategory) {
      switch (category) {
        case 'wet':
          return `${species === 'dog' ? '촉촉한 사료를 찾는 댕댕이' : '촉촉한 사료를 찾는 냥이'} 🥫`;
        case 'dry':
          return `${species === 'dog' ? '건조한 사료로 건강하게!' : '건조한 사료로 건강을 챙기자!'} 🥨`;
        case 'soft':
          return `${species === 'dog' ? '말랑말랑한 사료 좋아해요?' : '부드러운 사료로 기분 좋게!'} 🍖`;
        default:
          return `${species === 'dog' ? '강아지' : '고양이'} ${category} 상품`;
      }
    }

    if (species === 'dog') {
      switch (category) {
        case 'food':
          return <>날도 선선해졌으니 <BoldText>산책하러 갈까?</BoldText> 🍂</>;
        case 'snack':
          return <>가을은 살 찌는 계절 <BoldText>다이어트 해볼까!</BoldText> 💪</>;
        case 'product':
          return <>우리집 <BoldText>댕댕이</BoldText>를 위하여〰️🐶</>;
        default:
          return '우리집 댕댕이를 위한 상품';
      }
    } else {
      switch (category) {
        case 'food':
          return <>쌀쌀한 날씨에 <BoldText>건강 챙겨볼까?</BoldText> 🍁</>;
        case 'snack':
          return <>가을은 묘생의 계절 <BoldText>간식은 필수!</BoldText> 🐾</>;
        case 'product':
          return <>우리집 <BoldText>냥이</BoldText>를 위한 필수템〰️🐱</>;
        default:
          return '우리집 냥이를 위한 상품';
      }
    }
  };


 // 카테고리별 및 하위 카테고리 정렬
  const getCategoryItems = (mainCategory: string, subCategory: string | null = null) => {
    return products.filter(
      (product) =>
        product.category.species === species &&
        product.category.mainCategory === mainCategory &&
        (subCategory ? product.category.subCategory === subCategory : true)
    );
};


  return (
    <div className="page">
      <MainHeader
        itemCount={itemCount}
        onCategoryChange={(newSpecies) => {
          setSpecies(newSpecies);
          setMainCategory(null); // 토글 변경 시 메인 카테고리 초기화
          setSubCategory(null); // 서브 카테고리 초기화
        }}
        onMainCategoryChange={(newMainCategory) => {
          setMainCategory(newMainCategory);
          setSubCategory(null); // 메인 카테고리 변경 시 서브 카테고리 초기화
        }}
        onSubCategoryChange={setSubCategory}
      />

      <div className="mainpage">
        <DogMainPage>
          <Banner />
          {mainCategory === 'food' && !subCategory
            ? ['wet', 'dry', 'soft'].map((sub) => (
                <ProductWrapper key={sub}>
                  <Title>{getTitle(sub, true)}</Title>
                  <ProductContainer>
                    {getCategoryItems('food', sub).map((product) => (
                      <MainItem key={product.itemId} item={product} />
                    ))}
                  </ProductContainer>
                </ProductWrapper>
              ))
            : ['food', 'snack', 'product'].map((main) => (
                <ProductWrapper key={main}>
                  <Title>{getTitle(main)}</Title>
                  <ProductContainer>
                    {getCategoryItems(main).map((product) => (
                      <MainItem key={product.itemId} item={product} />
                    ))}
                  </ProductContainer>
                </ProductWrapper>
              ))}
        </DogMainPage>
        <FooterNav />
      </div>
    </div>
  );
}