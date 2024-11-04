// MyDongleHeader.tsx
"use client";

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

const petProfiles = [
  { id: 1, src: "/images/selectpets/DogEmoji.png", alt: "Dog" },
  { id: 2, src: "/images/selectpets/CatEmoji.png", alt: "Cat" }
];

const MyDongleHeader = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);

  useEffect(() => {
    if (router.pathname === '/mydongle/add') {
      setIsActive(true);
    }
  }, [router.pathname]);

  const handleAddPetClick = () => {
    if (!isActive) {
      router.push('/mydongle/add');
    }
  };

  const handleProfileClick = (id: number) => {
    if (router.pathname !== '/mydongle/add') {
      setSelectedProfile(id);
    }
  };

  return (
    <PetHeader>
      {petProfiles.map((profile) => (
        <PetProfile
          key={profile.id}
          selected={selectedProfile === profile.id}
          onClick={() => handleProfileClick(profile.id)}
        >
          <Image src={profile.src} alt={profile.alt} layout="fill" objectFit="cover" />
        </PetProfile>
      ))}
      <AddPetIcon onClick={handleAddPetClick}>
        {isActive ? <AddPetActiveSvg /> : <AddPetSvg />}
      </AddPetIcon>
    </PetHeader>
  );
};

export default MyDongleHeader;
