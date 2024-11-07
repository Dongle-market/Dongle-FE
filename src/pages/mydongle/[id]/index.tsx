// /mydongle/index.tsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyDongleFooterNav from "@/components/navbar/MyDongleFooterNav";
import Header from "@/components/header/CategoryHeader";
import MyDongleHeader from "@/components/header/MyDongleHeader";
import MyDongleHistoryItem from "@/components/items/MyDongleHistoryItem";
import PetsPort, { imageMap } from "@/components/items/PetsPort";
import { PetInfoResponseType } from "@/services/pets/pets.type";
import { getPetInfo, getPets } from "@/services/pets/pets";
import { useParams } from "next/navigation";
import router from "next/router";
import { deletePetToOrderItem } from "@/services/order/order";

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

interface PetProfileType {
  petId: number;
  profileImg: string;
  petName: string;
}

export default function MyDonglePage() {
  const params = useParams<{ id: string }>();
  const petId = params ? parseInt(params.id) : 0;

  const [activeTab, setActiveTab] = useState(1);

  const [petData, setPetData] = useState<PetInfoResponseType>();
  const [petProfiles, setPetProfiles] = useState<PetProfileType[]>([]);

  useEffect(() => {
    if (!petId) {
      // id가 없을 경우 /mydongle/add로 리다이렉트
      router.replace("/mydongle/add");
      return;
    }
    const fetchData = async () => {
      try {
        // 전체 반려동물 목록 가져오기
        const pets = await getPets();
        const formattedPets: PetProfileType[] = pets.map((pet) => ({
          petId: pet.petId,
          profileImg: imageMap[pet.profileImg] || "",
          petName: pet.petName,
        }));
        setPetProfiles(formattedPets);

        // 선택된 반려동물 정보 가져오기
        const data = await getPetInfo(Number(petId));
        setPetData(data);
      } catch (error) {
        console.error("반려동물 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchData();
  }, [petId]);

  const removeItem = async (orderItemId: number, petId: number) => {
    await deletePetToOrderItem(orderItemId, petId);
    const data = await getPetInfo(petId);
    setPetData(data);
  };

  return (
    <div className="page">
      <Header />
      <div className="mydonglecontent">
        <MyDongleHeader petProfiles={petProfiles} />
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
                    key={item.orderItemId}
                    imageurl={item.image}
                    name={item.title}
                    price={item.price}
                    orderDate={item.orderDate}
                    removeItem={() => removeItem(item.orderItemId, petId)}
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
