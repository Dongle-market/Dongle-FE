// MyDongleHeader.tsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import AddPetSvg from "../../../public/svgs/pet/addpet.svg";
import AddPetActiveSvg from "../../../public/svgs/pet/addpetactive.svg";
import { useRouter } from "next/router";

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

interface PetProfileType {
  petId: number;
  profileImg: string;
  petName: string;
}

interface MyDongleHeaderProps {
  petProfiles: PetProfileType[];
}

const MyDongleHeader: React.FC<MyDongleHeaderProps> = ({ petProfiles }) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);

  useEffect(() => {
    const isAddPage = router.pathname === '/mydongle/add';

    const urlParams = new URLSearchParams(window.location.search);
    const editPetId = urlParams.get("id") ? Number(urlParams.get("id")) : null;

    if (isAddPage && editPetId) {
      setSelectedProfile(editPetId);
    } else {
      const urlSegments = router.asPath.split("/");
      const lastSegment = urlSegments[urlSegments.length - 1];
      const urlPetId = Number(lastSegment);
      if (!isNaN(urlPetId)) {
        setSelectedProfile(urlPetId);
        setIsActive(false);
      } else {
        setSelectedProfile(null);
        setIsActive(true);
      }
    }
  }, [router.asPath]);

  const handleAddPetClick = () => {
    if (!isActive) {
      router.push('/mydongle/add');
    }
  };

  const handleProfileClick = (petId: number) => {
    router.push(`/mydongle/${petId}`);
    setSelectedProfile(petId);
    setIsActive(false);
  };

  return (
    <PetHeader>
      {petProfiles && petProfiles.map((profile) => (
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
