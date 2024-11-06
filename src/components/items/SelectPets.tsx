// SelectPets.tsx
'use client';

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

const SelectPetsItem = styled.div<{ $isSelected: boolean; $backgroundUrl: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-image: url(${props => props.$backgroundUrl});
  background-size: cover;
  background-position: center;
  border: 2px solid ${props => props.$isSelected ? '#E55737' : '#F8F8F8'};
  cursor: 'pointer';
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border-color 0.2s;
`;

interface SelectPetsProps {
  selectedPetIds: number[];
  isInteractive: boolean;
}

const SelectPets = ({ selectedPetIds }: SelectPetsProps) => {
  const [selectedIndexes, setSelectedIndexes] = React.useState<number[]>(selectedPetIds);

  const toggleSelection = (petId: number) => {
    setSelectedIndexes(prev => {
      if (prev.includes(petId)) {
        return prev.filter(id => id !== petId);
      } else {
        return [...prev, petId];
      }
    });
  };

  const pets = [
    { id: 1, imageurl: '/images/selectpets/DogEmoji.png' },
    { id: 2, imageurl: '/images/selectpets/CatEmoji.png' },
    { id: 3, imageurl: '/images/selectpets/MouseEmoji.png' }
  ];


  return (
    <SelectPetsContainer>
      {pets.map(pet => (
        <SelectPetsItem
          key={pet.id}
          $isSelected={selectedIndexes.includes(pet.id)}
          $backgroundUrl={pet.imageurl}
          onClick={() => toggleSelection(pet.id)}
        />
      ))}
    </SelectPetsContainer>
  );
}


export default SelectPets;