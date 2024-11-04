// Toggle.tsx
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1.5px solid #E55737;
  padding: 4px;
  box-sizing: border-box;
`;

const Button = styled.button<{ $isSelected: boolean }>`
  flex: 1;
  border: none;
  background-color: ${({ $isSelected }) => ($isSelected ? '#E55737' : 'transparent')};
  color: white;
  border-radius: 18px;
  font-size: 12px;
  padding: 6px 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:focus {
    outline: none;
  }
`;

interface ToggleProps {
  selected: string;
  onToggleChange: (newToggle: string) => void;
}

const ToggleButton: React.FC<ToggleProps> = ({ selected, onToggleChange }) => {
  return (
    <ToggleContainer>
      <Button
        $isSelected={selected === 'dog'}
        onClick={() => onToggleChange('dog')}
      >
        강아지
      </Button>
      <Button
        $isSelected={selected === 'cat'}
        onClick={() => onToggleChange('cat')}
      >
        고양이
      </Button>
    </ToggleContainer>
  );
};


export default ToggleButton;