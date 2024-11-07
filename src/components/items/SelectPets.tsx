// SelectPets.tsx
'use client';

import { addPetToOrderItem, deletePetToOrderItem } from '@/services/order/order';
import { PetDigestType } from '@/services/pets/pets.type';
import React from 'react';
import styled from 'styled-components';

const SelectPetsContainer = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const SelectPetsItem = styled.img<{ $isSelected: boolean; }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${props => props.$isSelected ? '#E55737' : '#F8F8F8'};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border-color 0.2s;
`;


export const imageMap: { [key: number]: string } = {
  1: "/images/petprofileimages/dog1.png",
  2: "/images/petprofileimages/cat1.png",
  3: "/images/petprofileimages/dog2.png",
  4: "/images/petprofileimages/cat2.png",
  5: "/images/petprofileimages/dog3.png",
  6: "/images/petprofileimages/cat3.png",
};

interface SelectPetsProps {
  selectedPetIds: number[];
  isInteractive: boolean;
  petList: PetDigestType[];
  orderItemId: number;
}

const SelectPets = ({ orderItemId, selectedPetIds, petList }: SelectPetsProps) => {
  const [selectedIndexes, setSelectedIndexes] = React.useState<number[]>(selectedPetIds);
  
  const toggleSelection = async (petId: number) => {
    if (selectedIndexes.includes(petId)) {
      const data = await deletePetToOrderItem(orderItemId, petId);
      const newPetIndexes = data.pets.length > 0 ? data.pets.map(pet => pet.petId) : [];
      setSelectedIndexes(newPetIndexes);
    } else {
      const data = await addPetToOrderItem(orderItemId, petId);
      const newPetIndexes = data.pets.length > 0 ? data.pets.map(pet => pet.petId) : [];
      setSelectedIndexes(newPetIndexes);
    }
  };

  return (
    <SelectPetsContainer>
      {petList.length > 0 && petList.map(pet => (
        <SelectPetsItem
          key={pet.petId}
          src={imageMap[pet.profileImg]}
          $isSelected={selectedIndexes.includes(pet.petId)}
          onClick={() => toggleSelection(pet.petId)}
        />
      ))}
    </SelectPetsContainer>
  );
}


export default SelectPets;