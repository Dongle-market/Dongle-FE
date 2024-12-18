// /mydongle/add.tsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyDongleHeader from "@/components/header/CategoryHeader";
import MyDongleFooterNav from "@/components/navbar/MyDongleFooterNav";
import ErrorSvg from "/public/svgs/element/error.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import MyDongleAddHeader from "../../components/header/MyDongleHeader";
import { PetPostRequestType, PetInfoResponseType } from "@/services/pets/pets.type";
import { postPet, getPetInfo, patchPet, DeletePet, getPets } from "@/services/pets/pets";
import { imageMap } from "@/components/items/PetsPort";
import { useUserStore } from "@/store/user";


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
  color: #e55737;
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
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
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
  background-color: ${(props) => (props.selected ? "#FFE6DD" : "#FFFFFF")};
  color: ${(props) => (props.selected ? "#E55737" : "#5E5E5E")};
  border: ${(props) =>
    props.selected ? "1.5px solid #E55737" : "1px solid #D9D9D9"};
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ffe6dd;
    color: #e55737;
    border: 1.5px solid #e55737;
  }
`;

const AgeInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AgeInput = styled.input`
  width: 60px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
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

const PetProfileImageOptionButton = styled.button<{
  selected: boolean;
  imageurl: string;
}>`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background-image: url(${(props) => props.imageurl});
  background-size: cover;
  background-position: center;
  color: ${(props) => (props.selected ? "#E55737" : "#5E5E5E")};
  border: ${(props) =>
    props.selected ? "2px solid #E55737" : "1px solid #D9D9D9"};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #ffe6dd;
    color: #e55737;
    border: 2px solid #e55737;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 16px;
  width: 100%;
  justify-content: center;
`;

const RegistButton = styled.div<{ $isActive: boolean }>`
  flex: 1;
  padding: 15px;
  background-color: ${(props) => (props.$isActive ? "#080808" : "#eeeeee")};
  color: ${(props) => (props.$isActive ? "white" : "#888888")};
  border: ${(props) => (props.$isActive ? "none" : "1px solid #d9d9d9")};
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  `;

const EditButton = styled.div<{ $isActive: boolean }>`
  flex: 1;
  padding: 15px;
  background-color: ${(props) => (props.$isActive ? "#080808" : "#eeeeee")};
  color: ${(props) => (props.$isActive ? "white" : "#888888")};
  border: ${(props) => (props.$isActive ? "none" : "1px solid #d9d9d9")};
  border-radius: 10px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`;

const RemoveButton = styled.div`
  flex: 1;
  padding: 15px;
  background-color: #d9d9d9;
  opacity: 70%;
  color: black;
  border: 1px #d9d9d9;
  border-radius: 10px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`;

const pets = [
  { id: 1, imageurl: "/images/petprofileimages/dog1.png" },
  { id: 2, imageurl: "/images/petprofileimages/cat1.png" },
  { id: 3, imageurl: "/images/petprofileimages/dog2.png" },
  { id: 4, imageurl: "/images/petprofileimages/cat2.png" },
  { id: 5, imageurl: "/images/petprofileimages/dog3.png" },
  { id: 6, imageurl: "/images/petprofileimages/cat3.png" },
];

interface PetProfileType {
  petId: number;
  profileImg: string;
  petName: string;
}

export default function MyDongleAddPage() {
  const [petInfo, setPetInfo] = useState<PetPostRequestType>({
    petName: "",
    profileImg: 0,
    type: "",
    gender: "",
    age: 0,
  });

  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const isFormFilled = Object.values(petInfo).every((value) => value !== "" && value !== 0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [petProfiles, setPetProfiles] = useState<PetProfileType[]>([]);
  const storePetId = useUserStore((state) => state.petId);
  const setStorePetId = useUserStore((state) => state.setPetId);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      getPetInfo(Number(id))
        .then((data: PetInfoResponseType) => {
          const pet = data.pet;
          setPetInfo({
            petName: pet.petName,
            profileImg: pet.profileImg,
            type: pet.type,
            gender: pet.gender,
            age: pet.age,
          });
        })
        .catch(() => toast.error("반려동물 정보를 불러오는 데 실패했습니다."));
    }
    else {
      setIsEditMode(false);
      setPetInfo({
        petName: "",
        profileImg: 0,
        type: "",
        gender: "",
        age: 0,
      });
    }
  }, [id]);

  const fetchPets = async () => {
    try {
      const pets = await getPets(); // PetType[]을 반환
      const formattedPets: PetProfileType[] = pets.map((pet) => ({
        petId: pet.petId,
        profileImg: imageMap[pet.profileImg] || "",
        petName: pet.petName,
      }));
      setPetProfiles(formattedPets);
    } catch (error) {
      console.error("반려동물 데이터를 불러오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  // const toastOptions = {
  //   position: "top-center",
  //   hideProgressBar: true,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   style: {
  //     marginTop: '82px',
  //     marginRight: '16px',
  //     marginLeft: '16px',
  //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //     backdropFilter: 'blur(10px)',
  //     WebkitBackdropFilter: 'blur(10px)',
  //     borderRadius: '16px',
  //     color: 'white',
  //     textAlign: 'center'
  //   }
  // };

  const handleProfileImageChange = (imageId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPetInfo((prev) => ({
      ...prev,
      profileImg: imageId,
    }));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    if (inputName.length > 20) {
      setNameError("20자까지 입력 가능합니다.");
      setPetInfo((prev) => ({
        ...prev,
        petName: inputName.slice(0, 20),
      }));
    } else {
      setNameError("");
      setPetInfo((prev) => ({
        ...prev,
        petName: inputName,
      }));
    }
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputAge = event.target.value;
    const ageNumber = Number(inputAge);

    if (!inputAge || (ageNumber >= 0 && ageNumber <= 30)) {
      setAgeError("");
      setPetInfo((prev) => ({
        ...prev,
        age: isNaN(ageNumber) ? 0 : ageNumber,
      }));
    } else {
      setAgeError("숫자만 입력 가능합니다. (0~30)");
    }
  };

  const handleInputChange = (key: keyof PetPostRequestType, value: string | number) => {
    setPetInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!isFormFilled) {
      toast.error("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    try {
      if (isEditMode && id) {
        await patchPet(Number(id), petInfo);
        await fetchPets(); // 반려동물 목록 업데이트
        toast.success("반려동물 정보가 수정되었습니다.", {
          onClose: () => router.push(`/mydongle/${id}`),
          autoClose: 1000,
        });
      } else {
        const newPet = await postPet(petInfo);
        await fetchPets(); // 반려동물 목록 업데이트
        if (storePetId === null) setStorePetId(newPet.petId);
        toast.success("반려동물이 등록되었습니다.", {
          onClose: () => router.push(`/mydongle/${newPet.petId}`),
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("반려동물 정보 처리 중 오류가 생겼습니다.");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await DeletePet(Number(id));
      await fetchPets(); // 반려동물 목록 업데이트

      const remainingPets = await getPets();
      if (remainingPets.length > 0) {
        setStorePetId(remainingPets[0].petId);
        toast.success("반려동물 정보가 삭제되었습니다.", {
          onClose: () => router.push(`/mydongle/${remainingPets[0].petId}`),
          autoClose: 1000,
        });
      } else {
        setStorePetId(null);
        setPetInfo({
          petName: "",
          profileImg: 0,
          type: "",
          gender: "",
          age: 0,
        });
        setIsEditMode(false);
        toast.success("반려동물 정보가 삭제되었습니다.", {
          autoClose: 1000,
          onClose:()=>router.push('/mydongle/add'),
        });

      }
    } catch (error) {
      toast.error("반려동물 정보 삭제 중 오류가 생겼습니다.");
      // setTimeout(() => {
      //   router.push('/mydongle/add');
      // }, 500);
      console.error(error);
    }
  };

  return (
    <div className="page">
      <MyDongleHeader />
      <div className="content">
        <ToastContainer position="top-center" style={{ marginTop: "32px", padding: "0 16px"}} />
        <MyDongleAddHeader petProfiles={petProfiles} />
        <TitleWrapper>
          <Title>ARRIVAL CARD</Title>
          <SemiTitle>입국신고서 (댕냥전용)</SemiTitle>
        </TitleWrapper>
        <Wrapper>
          <form onSubmit={(e) => e.preventDefault()}>
            <RegistrationCard>
              <InfoContainer>
                <Question>반려동물의 프로필 사진을 선택해주세요.</Question>
                <PetProfileImageOptionContainer>
                  {pets.map((pet) => (
                    <PetProfileImageOptionButton
                      key={pet.id}
                      selected={petInfo.profileImg === pet.id}
                      imageurl={pet.imageurl}
                      onClick={(e) => handleProfileImageChange(pet.id, e)}
                    />
                  ))}
                </PetProfileImageOptionContainer>
              </InfoContainer>
              <InfoContainer>
                <Question>반려동물의 이름을 입력하세요.</Question>
                {nameError && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ErrorSvg style={{ marginRight: "4px" }} />
                    {nameError}
                  </div>
                )}
                <NameInput
                  type="text"
                  value={petInfo.petName}
                  onChange={handleNameChange}
                />
              </InfoContainer>
              <InfoContainer>
                <Question>반려동물의 종은 무엇인가요?</Question>
                <ButtonWrapper>
                  <OptionButton
                    selected={petInfo.type === "dog"}
                    onClick={() => handleInputChange("type", "dog")}
                  >
                    🐶 강아지
                  </OptionButton>
                  <OptionButton
                    selected={petInfo.type === "cat"}
                    onClick={() => handleInputChange("type", "cat")}
                  >
                    😺 고양이
                  </OptionButton>
                </ButtonWrapper>
              </InfoContainer>
              <InfoContainer>
                <Question>반려동물의 성별은 무엇인가요?</Question>
                <ButtonWrapper>
                  <OptionButton
                    selected={petInfo.gender === "male"}
                    onClick={() => handleInputChange("gender", "male")}
                  >
                    남
                  </OptionButton>
                  <OptionButton
                    selected={petInfo.gender === "female"}
                    onClick={() => handleInputChange("gender", "female")}
                  >
                    여
                  </OptionButton>
                </ButtonWrapper>
              </InfoContainer>
              <InfoContainer>
                <Question>반려동물의 나이는 몇 살인가요?</Question>
                {ageError && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ErrorSvg style={{ marginRight: "4px" }} />
                    {ageError}
                  </div>
                )}
                <AgeInputWrapper>
                  <AgeInput
                    type="text"
                    value={petInfo.age === 0 ? "" : petInfo.age}
                    onChange={handleAgeChange}
                  />

                  <AgeLabel>살</AgeLabel>
                </AgeInputWrapper>
              </InfoContainer>
              <ButtonContainer>
                {isEditMode ? (
                  isFormFilled ? (
                    <>
                      <EditButton $isActive={true} onClick={handleSubmit}>수정하기</EditButton>
                      <RemoveButton onClick={handleDelete}>삭제하기</RemoveButton>
                    </>
                  ) : (
                    <>
                      <EditButton $isActive={false}>수정하기</EditButton>
                      <RemoveButton onClick={handleDelete}>삭제하기</RemoveButton>
                    </>
                  )
                ) : (
                  <RegistButton $isActive={isFormFilled} onClick={isFormFilled ? handleSubmit : undefined}>
                    등록하기
                  </RegistButton>
                )}
              </ButtonContainer>
            </RegistrationCard>
          </form>
        </Wrapper>
      </div>
      <MyDongleFooterNav />
    </div>
  );
}