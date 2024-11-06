// /mydongle/index.tsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyDongleFooterNav from "@/components/navbar/MyDongleFooterNav";
import Header from "@/components/header/CategoryHeader";
import MyDongleHeader from "@/components/header/MyDongleHeader";
import CategoryItem from "@/components/items/CategoryItem";
import MyDongleHistoryItem from "@/components/items/MyDongleHistoryItem";
import PetsPort from "@/components/items/PetsPort";
import { PetInfoResponseType } from "@/services/pets/pets.type";
import { getPetInfo } from "@/services/pets/pets";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

interface WishlistItem {
  itemId: number;
  image: string;
  title: string;
  lprice: number;
  selectedPetIds?: number[];
}

const items: WishlistItem[] = [
  { itemId: 1, image: "/images/An.png", title: "보류입니다.", lprice: 34000 },
  { itemId: 2, image: "/images/Baek.png", title: "어얼얽--", lprice: 34000 },
  {
    itemId: 3,
    image: "/images/An.png",
    title: "고기가 이븐하게 익지 않아써여",
    lprice: 34000,
  },
  {
    itemId: 4,
    image: "/images/Son&Jeon.png",
    title: "왜저뤠ㅞㅞㅞ~~",
    lprice: 34000,
  },
  {
    itemId: 5,
    image: "/images/An.png",
    title: "저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여",
    lprice: 34000,
  },
  {
    itemId: 6,
    image: "/images/Baek.png",
    title: "이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ",
    lprice: 34000,
  },
  {
    itemId: 7,
    image: "/images/product1.png",
    title: "도치빌 리더스",
    lprice: 34000,
  },
  {
    itemId: 8,
    image: "/images/product1.png",
    title: "도치빌 리더스",
    lprice: 34000,
  },
  {
    itemId: 9,
    image: "/images/product1.png",
    title: "도치빌 리더스",
    lprice: 34000,
  },
  {
    itemId: 10,
    image: "/images/product1.png",
    title: "도치빌 리더스",
    lprice: 34000,
  },
];

interface MyDongleHistoryItemProps {
  itemId: number;
  image: string;
  title: string;
  lprice: number;
  date: string;
  selectedPetIds?: number[];
}

const initialHistoryItems: MyDongleHistoryItemProps[] = [
  {
    itemId: 1,
    image: "/images/An.png",
    title: "보류입니다.",
    lprice: 34000,
    date: "2024-10-30",
    selectedPetIds: [1, 2],
  },
  {
    itemId: 2,
    image: "/images/Baek.png",
    title: "어얼얽--",
    lprice: 34000,
    date: "2024-10-30",
    selectedPetIds: [2],
  },
  {
    itemId: 3,
    image: "/images/An.png",
    title: "고기가 이븐하게 익지 않아써여",
    lprice: 34000,
    date: "2024-10-30",
  },
  {
    itemId: 4,
    image: "/images/Son&Jeon.png",
    title: "왜저뤠ㅞㅞㅞ~~",
    lprice: 34000,
    date: "2024-10-30",
    selectedPetIds: [3],
  },
  {
    itemId: 5,
    image: "/images/An.png",
    title: "저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여",
    lprice: 34000,
    date: "2024-11-04",
    selectedPetIds: [1, 2],
  },
  {
    itemId: 6,
    image: "/images/Baek.png",
    title: "이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ",
    lprice: 34000,
    date: "2024-11-04",
    selectedPetIds: [2],
  },
  {
    itemId: 7,
    image: "/images/product1.png",
    title: "이건 장바구니에 없는 거지롱~~‼️",
    lprice: 34000,
    date: "2024-11-04",
    selectedPetIds: [1, 2, 3],
  },
  {
    itemId: 8,
    image: "/images/product1.png",
    title: "도치빌 리더스",
    lprice: 34000,
    date: "2024-11-04",
    selectedPetIds: [1, 2],
  },
  {
    itemId: 9,
    image: "/images/product1.png",
    title: "도치빌 리더스",
    lprice: 34000,
    date: "2024-11-04",
    selectedPetIds: [1, 3],
  },
  {
    itemId: 10,
    image: "/images/product1.png",
    title: "도치빌 리더스",
    lprice: 34000,
    date: "2024-11-04",
    selectedPetIds: [1, 2, 3],
  },
];

const initialCartItems = [
  {
    id: 1,
    imageurl: "/images/Son&Jeon.png",
    brand: "아디다스",
    name: "왜저뤠ㅞㅞ~~",
    price: 34000,
    selected: true,
  },
  {
    id: 2,
    imageurl: "/images/Baek.png",
    brand: "아디다스",
    name: "어얼얽--",
    price: 34000,
    selected: true,
  },
  {
    id: 3,
    imageurl: "/images/An.png",
    brand: "아디다스",
    name: "고기가 이븐하게 익지 않아써여",
    price: 34000,
    selected: true,
  },
  {
    id: 4,
    imageurl: "/images/An.png",
    brand: "아디다스",
    name: "보류입니다.",
    price: 34000,
    selected: true,
  },
  {
    id: 5,
    imageurl: "/images/An.png",
    brand: "아디다스",
    name: "저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여",
    price: 34000,
    selected: true,
  },
  {
    id: 6,
    imageurl: "/images/Baek.png",
    brand: "아디다스",
    name: "이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ",
    price: 34000,
    selected: true,
  },
  {
    id: 7,
    imageurl: "/images/product1.png",
    brand: "아디다스",
    name: "도치빌 리더스",
    price: 34000,
    selected: false,
  },
  {
    id: 8,
    imageurl: "/images/product1.png",
    brand: "아디다스",
    name: "도치빌 리더스",
    price: 34000,
    selected: false,
  },
  {
    id: 9,
    imageurl: "/images/product1.png",
    brand: "아디다스",
    name: "도치빌 리더스",
    price: 34000,
    selected: false,
  },
  {
    id: 10,
    imageurl: "/images/product1.png",
    brand: "아디다스",
    name: "도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스",
    price: 34000,
    selected: false,
  },
  {
    id: 11,
    imageurl: "/images/Son&Jeon.png",
    brand: "아디다스",
    name: "왜저뤠ㅞㅞ~~",
    price: 34000,
    selected: false,
  },
];

const PetsPortWrapper = styled.div`
  display: flex;
  padding: 0 16px 16px 16px;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  text-align: center;
  font-size: 16px;
  width: 50%;
  line-height: 48px;
  font-weight: ${(props) => (props.$isActive ? "600" : "400")};
  color: ${(props) => (props.$isActive ? "#080808" : "#5e5e5e")};
  border-top: ${(props) =>
    props.$isActive ? "1.5px solid #080808" : "1.5px solid #d9d9d9"};
  background-color: ${(props) => (props.$isActive ? "#ffffff" : "transparent")};
  cursor: pointer;
`;

const TabComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoneComponent = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  text-align: center;
  background-color: #ffffff;
`;

const SorryMessage = styled.div`
  display: flex;
  text-align: center;
  font-size: 16px;
  color: #545454;
`;

const NoneText = styled.span`
  font-size: 16px;
  font-family: "Pretendard";
  font-weight: 400;
  color: #5e5e5e;
`;

const GoToWishListButton = styled.a`
  font-family: "Pretendard";
  padding: 10px 18px;
  font-size: 14px;
  background-color: #eeeeee;
  color: #888888;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.5s ease;
  text-decoration: none;

  &:hover {
    background-color: #080808;
    color: white;
  }
`;

const TabContent = styled.div`
  background-color: #ffffff;
`;

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`;

interface SelectedItems {
  [key: number]: boolean;
}

export default function MyDonglePage() {
  const params = useParams<{ id: string }>();
  const petId = params ? parseInt(params.id) : 0;

  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState(initialHistoryItems);
  const [, setSelectedItems] = useState<SelectedItems>({});
  const [cartItems] = useState(initialCartItems);
  const [petData, setPetData] = useState<PetInfoResponseType>();

  useEffect(() => {
    const fetchPetData = async () => {
      const data = await getPetInfo(petId);
      setPetData(data);
    };
    if (petId) {
      fetchPetData();
    }
  }, [petId]);

  const removeItem = (id: number) => {
    const newItems = items.filter((item) => item.itemId !== id);
    setItems(newItems);
    setSelectedItems((prevState) => {
      const newState: SelectedItems = { ...prevState };
      delete newState[id];
      return newState;
    });
  };

  return (
    <div className="page">
      <Header />
      <div className="mydonglecontent">
        <MyDongleHeader />
        <PetsPortWrapper>
          {petData && petData.pet && (
            <PetsPort
              petId={petData.pet.petId}
              petName={petData.pet.petName}
              profileImg={petData.pet.profileImg}
              type={petData.pet.type}
              gender={petData.pet.gender}
              age={petData.pet.age}
              userId={petData.pet.userId}
            />
          )}
        </PetsPortWrapper>
        <TabComponent>
          <Tab $isActive={activeTab === 0} onClick={() => setActiveTab(0)}>
            위시리스트
          </Tab>
          <Tab $isActive={activeTab === 1} onClick={() => setActiveTab(1)}>
            주문내역
          </Tab>
        </TabComponent>
        <TabContent>
          {activeTab === 0 && (
            <NoneComponent>
              <SorryMessage>아직 준비중인 기능이에요 😢</SorryMessage>
              <GoToWishListButton href="/home">
                동글마켓 구경가기
              </GoToWishListButton>
            </NoneComponent>
          )}
          {activeTab === 1 && (
            petData && petData.orderItems.length > 0 ? (
              <HistoryContainer>
                {petData?.orderItems.map((item) => (
                  <MyDongleHistoryItem
                    itemId={item.itemId}
                    key={item.itemId}
                    imageurl={item.image}
                    name={item.title}
                    price={item.price}
                    orderDate={item.orderDate}
                    removeItem={() => removeItem(item.itemId)}
                  />
                ))}
              </HistoryContainer>
            ) : (
              <NoneComponent>
                <NoneText>
                  내 아이에게 준 물건을
                  <br />
                  실제 주문내역에서 고를 수 있어요!
                </NoneText>
                <GoToWishListButton href="/mymarket/history">
                  주문내역 바로가기
                </GoToWishListButton>
              </NoneComponent>
            ))}
        </TabContent>
      </div>
      <MyDongleFooterNav />
    </div>
  );
}
