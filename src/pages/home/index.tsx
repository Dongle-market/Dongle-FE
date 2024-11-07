// home.tsx

import React, { useEffect, useState } from 'react';
import { ItemAPI } from '@/services/item/item';
import styled from 'styled-components';
import MainHeader from "@/components/header/MainHeader";
import FooterNav from "@/components/navbar/MainFooterNav";
import Banner from "@/components/main/Banner";
import MainItem from "@/components/items/MainItem";
import { UserResponse } from '@/services/users/users.type';
import { getUserInfo } from '@/services/users/users';
import { useUserStore } from '@/store/user';
import LoadingComponent from '@/components/common/Loading';

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
  font-family: "Pretendard";
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

// 하위 카테고리 정의
const subCategories = {
  dog: {
    사료: ["wet", "dry", "soft"],
    간식: ["soft", "wet", "dry"],
    용품: ["dry", "soft", "wet"],
  },
  cat: {
    사료: ["soft", "dry", "wet"],
    간식: ["dry", "soft", "wet"],
    용품: ["wet", "dry", "soft"],
  },
} as const;

// const mainCategoryMapping: { [key: string]: string } = {
//   사료: "food",
//   간식: "snack",
//   용품: "product",
// };

type MainCategory = keyof (typeof subCategories)["dog"];
// type SubCategory = (typeof subCategories)["dog"][MainCategory][number];

type Species = "dog" | "cat";

export default function PetHome() {
  const [species, setSpecies] = useState<Species>("dog");
  const [mainCategory, setMainCategory] = useState<MainCategory | null>(null);
  const [products, setProducts] = useState<{ [key: string]: Item[] }>({});
  const setPetId = useUserStore((state) => state.setPetId);
  const setCartCount = useUserStore((state) => state.setCartCount);
  const cartCount = useUserStore((state) => state.cartCount);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data: UserResponse = await getUserInfo();
        setPetId(data.petId);
        setCartCount(data.cartCount);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [setPetId, setCartCount]);

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      try {
        if (mainCategory && subCategories[species][mainCategory]) {
          // 특정 메인 카테고리가 선택된 경우 (e.g., '사료', '간식', '용품')
          const subCategoryList = subCategories[species][mainCategory];
          const results = await Promise.all(
            subCategoryList.map((sub) =>
              ItemAPI.fetchCategoryData(sub, "dog", species === "cat" ? "low" : "").catch(() => [])
            )
          );

          const dataBySubCategory = subCategoryList.reduce(
            (acc, sub, index) => {
              acc[sub] = results[index];
              return acc;
            },
            {} as { [key: string]: Item[] }
          );

          setProducts(dataBySubCategory);
        } else {
          // 메인 카테고리가 선택되지 않은 경우 (e.g., 강아지/고양이만 선택된 경우)
          const categories = ["food", "snack", "product"];
          const results = await Promise.all(
            categories.map(() =>
              ItemAPI.fetchCategoryData("", "dog", species === "cat" ? "low" : "").catch(() => [])
            )
          );

          const dataByMainCategory = categories.reduce(
            (acc, category, index) => {
              acc[category] = results[index];
              return acc;
            },
            {} as { [key: string]: Item[] }
          );

          setProducts(dataByMainCategory);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [mainCategory, species]);

  // 동적 Title 설정
  const getTitle = (category: string) => {
    const titles = {
      dog: {
        wet: "촉촉한 사료를 찾는 댕댕이 🥫",
        dry: "건조한 사료로 건강하게! 🥨",
        soft: "말랑말랑한 사료 좋아해요? 🍖",
        hand: "손에 쏙 들어오는 간편 간식 🍪",
        bread: "맛있는 빵 간식 🥖",
        bone: "튼튼한 뼈 간식 🦴",
        clean: "청결을 위한 필수 아이템 🧼",
        bath: "목욕시간 필수템 🛁",
        practice: "훈련에 꼭 필요한 용품 🐾",
        food: (
          <>
            날도 선선해졌으니 <BoldText>산책하러 갈까?</BoldText> 🍂
          </>
        ),
        snack: (
          <>
            가을은 살 찌는 계절 <BoldText>다이어트 해볼까!</BoldText> 💪
          </>
        ),
        product: (
          <>
            우리집 <BoldText>댕댕이</BoldText>를 위하여〰️🐶
          </>
        ),
      },
      cat: {
        soft: "캔 사료로 기분 좋은 한 끼 🍱",
        dry: "건조한 사료로 건강을 챙기자! 🥨",
        wet: "촉촉한 사료를 찾는 냥이 🥫",
        chur: "냥이가 좋아하는 츄르 🐟",
        hand: "한입에 딱 좋은 간편 간식 🍪",
        catnip: "기분 전환용 캣닢 🌿",
        tower: "냥이의 전용 타워 🏰",
        water: "항상 신선한 물 💧",
        bath: "목욕시간 필수템 🛁",
        food: (
          <>
            쌀쌀한 날씨에 <BoldText>건강 챙겨볼까?</BoldText> 🍁
          </>
        ),
        snack: (
          <>
            가을은 묘생의 계절 <BoldText>간식은 필수!</BoldText> 🐾
          </>
        ),
        product: (
          <>
            우리집 <BoldText>냥이</BoldText>를 위한 필수템〰️🐱
          </>
        ),
      },
    };
    return titles[species][category as keyof (typeof titles)[Species]];
  };

  const renderProductSections = () => {
    const categories = mainCategory
      ? subCategories[species][mainCategory]
      : ["food", "snack", "product"];

    return categories.map((category) => (
      <ProductWrapper key={category}>
        <Title>{getTitle(category)}</Title>
        <ProductContainer>
          {products[category]?.map((product) => (
            <MainItem key={product.itemId} item={product} />
          ))}
        </ProductContainer>
      </ProductWrapper>
    ));
  };
  
  if (isLoading) return <LoadingComponent src="/images/skeleton/mainpage_skeleton.png" />

  return (
    <div className="page">
      <MainHeader
        itemCount={cartCount}
        species={species}
        onSpeciesChange={(newSpecies) => {
          setSpecies(newSpecies as Species);
          setMainCategory(null);
        }}
        onMainCategoryChange={(newMainCategory) =>
          setMainCategory(newMainCategory as MainCategory)
        }
      />

      <div className="mainpage">
        <DogMainPage>
          <Banner />
          {renderProductSections()}
        </DogMainPage>
        <FooterNav />
      </div>
    </div>
  );
}
