// MyDongleHeader.tsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import AddPetSvg from "../../../public/svgs/pet/addpet.svg";
import AddPetActiveSvg from "../../../public/svgs/pet/addpetactive.svg";
import { useRouter } from "next/router";
import { getPets } from "@/services/pets/pets";
import { imageMap } from "../items/PetsPort";
import { useParams } from "next/navigation";

const PetHeader = styled.div`
  padding-top: 36px;
  width: 100%;
  display: flex;
  gap: 16px;
  padding: 32px 16px 24px 16px;
  box-sizing: border-box;
`;

interface PetProfileProps {
  selected: boolean;
}

const PetProfile = styled.div<PetProfileProps>`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${({ selected }) => (selected ? '#e55737' : 'transparent')};
`;

const AddPetIcon = styled.div`
  width: 64px;
  height: 64px;
  cursor: pointer;
`;

interface PetType {
  petId: number;
  profileImg: string;
  petName: string;
}

const profiles = [
  { id: 1, imageurl: "/images/petprofileimages/dog1.png" },
  { id: 2, imageurl: "/images/petprofileimages/cat1.png" },
  { id: 3, imageurl: "/images/petprofileimages/dog2.png" },
  { id: 4, imageurl: "/images/petprofileimages/cat2.png" },
  { id: 5, imageurl: "/images/petprofileimages/dog3.png" },
  { id: 6, imageurl: "/images/petprofileimages/cat3.png" },
];


const MyDongleHeader = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [petProfiles, setPetProfiles] = useState<PetType[]>([]);

  useEffect(() => {
    if (router.pathname === '/mydongle/add') {
      setIsActive(true);
    }

    const urlPetId = Number(router.asPath.split("/").pop());
    if (!isNaN(urlPetId)) {
      setSelectedProfile(urlPetId);
    }

    // API를 호출하여 유저의 반려동물 데이터를 가져오기
    const fetchPets = async () => {
      try {
        const pets = await getPets();
        const formattedPets = pets.map((pet) => ({
          petId: pet.petId,
          profileImg: imageMap[pet.profileImg] || "", // profileImg 파일 경로 지정
          petName: pet.petName,
        }));
        setPetProfiles(formattedPets);
      } catch (error) {
        console.error("반려동물 데이터를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchPets();
  }, [router.pathname]);

  const handleAddPetClick = () => {
    if (!isActive) {
      router.push('/mydongle/add');
    }
  };

  const handleProfileClick = (petId: number) => {
    router.push(`/mydongle/${petId}`);
    setSelectedProfile(petId);
  };

  return (
    <PetHeader>
    {petProfiles.map((profile) => (
      <PetProfile
        key={profile.petId}
        selected={selectedProfile === profile.petId}
        onClick={() => handleProfileClick(profile.petId)}
      >
        <Image src={profile.profileImg} alt={profile.petName} layout="fill" objectFit="cover" />
      </PetProfile>
    ))}
    <AddPetIcon onClick={handleAddPetClick}>
      {isActive ? <AddPetActiveSvg /> : <AddPetSvg />}
    </AddPetIcon>
  </PetHeader>
  );
};

export default MyDongleHeader;
