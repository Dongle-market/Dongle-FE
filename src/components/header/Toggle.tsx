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

const Button = styled.button<{ selected: boolean }>`
  flex: 1;
  border: none;
  background-color: ${({ selected }) => (selected ? '#E55737' : 'transparent')};
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

const ToggleButton = () => {
  const [selected, setSelected] = useState('dog');

  return (
    <ToggleContainer>
      <Button
        selected={selected === 'dog'}
        onClick={() => setSelected('dog')}
      >
        강아지
      </Button>
      <Button
        selected={selected === 'cat'}
        onClick={() => setSelected('cat')}
      >
        고양이
      </Button>
    </ToggleContainer>
  );
};

export default ToggleButton;