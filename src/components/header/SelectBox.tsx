// components/SelectBox.tsx
'use client';

import styled from 'styled-components';

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-weight: bold;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
`;

interface SelectBoxProps {
  label: string;
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
}

export default function SelectBox({ label, options, selectedOption, onChange }: SelectBoxProps) {
  return (
    <SelectContainer>
      <Label>{label}</Label>
      <Select value={selectedOption} onChange={(e) => onChange(e.target.value)}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </SelectContainer>
  );
}
