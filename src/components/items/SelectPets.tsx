// SelectPets.tsx
'use client';

import React, { useState } from 'react';
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
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border-color 0.2s;
`;


const SelectPets = () => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const toggleSelection = (index: number) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter(i => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  const images = ['/images/DogEmoji.png', '/images/CatEmoji.png', '/images/RabbitEmoji.png'];

  return (
    <SelectPetsContainer>
      {images.map((image, index) => (
        <SelectPetsItem
          key={index}
          $isSelected={selectedIndexes.includes(index)}
          onClick={() => toggleSelection(index)}
          $backgroundUrl={image}
        />
      ))}
    </SelectPetsContainer>
  );
}


export default SelectPets;