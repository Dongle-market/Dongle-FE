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
import { postPet, GetResponse, patchPet, DeletePet } from "@/services/pets/pets";

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
  imageUrl: string;
}>`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background-image: url(${(props) => props.imageUrl});
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
  /* margin-top: 12px; */
  text-align: center;
  `;

const EditButton = styled.div`
  flex: 1;
  padding: 15px;
  background-color: #080808;
  color: white;
  border: "none";
  border-radius: 10px;
  font-size: 16px;
  /* margin-top: 12px; */
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
  /* margin-top: 12px; */
  text-align: center;
  cursor: pointer;
`;

const pets = [
  { id: 1, imageUrl: "/images/petprofileimages/dog1.png" },
  { id: 2, imageUrl: "/images/petprofileimages/cat1.png" },
  { id: 3, imageUrl: "/images/petprofileimages/dog2.png" },
  { id: 4, imageUrl: "/images/petprofileimages/cat2.png" },
  { id: 5, imageUrl: "/images/petprofileimages/dog3.png" },
  { id: 6, imageUrl: "/images/petprofileimages/cat3.png" },
];
export default function MyDongleAddPage() {
  const [name, setName] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [profileImage, setProfileImage] = useState(1);
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const isFormFilled = (name && animalType && gender && age && profileImage);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      GetResponse(Number(id))
        .then((data: PetInfoResponseType) => {
          setName(data.pet.petName);
          setAnimalType(data.pet.type);
          setGender(data.pet.gender);
          setAge(String(data.pet.age));
          setProfileImage(data.pet.profileImg);
        })
        .catch(() => toast.error("반려동물 정보를 불러오는 데 실패했습니다."));
    }
  }, [id]);

  const handleSubmit = async () => {
    // 기본 데이터가 잘 입력되었는지 확인
    if (!name || !animalType || !gender || !age || !profileImage) {
      toast.error("모든 필드를 올바르게 입력해주세요.");
      return;
    }
  
    const petData: PetPostRequestType = {
      petName: name,
      profileImg: profileImage,
      type: animalType,
      gender: gender,
      age: parseInt(age),
    };
  
    try {
      if (isEditMode && id) {
        // 수정 모드
        await patchPet(Number(id), petData);
        toast.success("반려동물 정보가 수정되었습니다.");
      } else {
        // 등록 모드
        await postPet(petData);
        toast.success("반려동물이 등록되었습니다.");
      }
      router.push("/mydongle");
    } catch (error) {
      // 에러 메시지 추가
      toast.error("반려동물 정보 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await DeletePet(Number(id));
      toast.success("반려동물이 삭제되었습니다.");
      router.push("/mydongle");
    } catch (error) {
      toast.error("반려동물 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleProfileImageChange = (imageId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setProfileImage(imageId);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    if (inputName.length > 20) {
      setNameError("20자까지 입력 가능합니다.");
      setName(inputName.slice(0, 20));
    } else {
      setNameError("");
      setName(inputName);
    }
  };

  const handleAnimalTypeChange = (type: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnimalType(type);
  };

  const handleGenderChange = (genderType: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setGender(genderType);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputAge = event.target.value;
    const ageNumber = Number(inputAge);
    if (!inputAge || (ageNumber >= 0 && ageNumber <= 200)) {
      setAgeError("");
      setAge(inputAge);
    } else {
      setAgeError("숫자만 입력 가능합니다. (0~200)");
    }
  };

  return (
    <div className="page">
      <MyDongleHeader itemCount={5} />
      <ToastContainer
        position="top-center"
        style={{ marginTop: "32px", boxSizing: "border-box" }}
        toastStyle={{ margin: "16px", width: "calc(100% - 32px)" }}
      />
      <div className="content">
        <MyDongleAddHeader />
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
                    selected={profileImage === pet.id}
                    imageUrl={pet.imageUrl}
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
                  value={name}
                  onChange={handleNameChange}
                />
            </InfoContainer>
            <InfoContainer>
              <Question>반려동물의 종은 무엇인가요?</Question>
              <ButtonWrapper>
              <OptionButton
                    selected={animalType === "dog"}
                    onClick={(e) => handleAnimalTypeChange("dog", e)}
                  >
                    🐶 강아지
                  </OptionButton>
                  <OptionButton
                    selected={animalType === "cat"}
                    onClick={(e) => handleAnimalTypeChange("cat", e)}
                  >
                    😺 고양이
                  </OptionButton>
              </ButtonWrapper>
            </InfoContainer>
            <InfoContainer>
              <Question>반려동물의 성별은 무엇인가요?</Question>
              <ButtonWrapper>
              <OptionButton
                    selected={gender === "male"}
                    onClick={(e) => handleGenderChange("male", e)}
                  >
                    남
                  </OptionButton>
                  <OptionButton
                    selected={gender === "female"}
                    onClick={(e) => handleGenderChange("female", e)}
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
                    value={age}
                    onChange={handleAgeChange}
                  />

                <AgeLabel>살</AgeLabel>
                </AgeInputWrapper>
              </InfoContainer>
              <ButtonContainer>
            {isFormFilled ? (
              isEditMode ? (
                <>
                  <EditButton onClick={handleSubmit}>수정하기</EditButton>
                  <RemoveButton onClick={handleDelete}>삭제하기</RemoveButton>
                </>
              ) : (
                <RegistButton $isActive={true} onClick={handleSubmit}>
                  등록하기
                </RegistButton>
              )
            ) : (
              <RegistButton $isActive={false}>등록하기</RegistButton>
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
