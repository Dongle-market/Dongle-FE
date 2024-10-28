// components/SelectBox.tsx
'use client'

import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import ArrowSvg from "/public/svgs/element/down_arrow.svg";

const SelectBoxContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 10px;
  border: 1px solid gray;
  border-radius: 30px;
  position: relative;
`;

const Select = styled.select<{ test: number }>`
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  border: none;
  background: transparent;
  font-size: 12px;
  cursor: pointer;
  color: black;
  padding-right: 20px;
  outline: none;
  width: ${({ test }) => `${test}px`};
`;

const Arrow = styled.div`
  display: flex;
  cursor: pointer;
`;

interface SelectBoxProps {
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
}

export default function SelectBox({ options, selectedOption, onChange }: SelectBoxProps) {
  const [selectWidth, setSelectWidth] = useState(50); // 초기 너비
  const tempSpanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 선택된 옵션의 너비를 측정하여 설정
    if (tempSpanRef.current) {
      tempSpanRef.current.innerText = selectedOption;
      setSelectWidth(tempSpanRef.current.offsetWidth + 20); // 여유 공간 추가
    }
  }, [selectedOption]);

  return (
    <SelectBoxContainer>
      <Select
        test={selectWidth}
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <Arrow>
        <ArrowSvg />
      </Arrow>

      {/* 선택된 옵션의 길이를 계산하는 숨겨진 span */}
      <span ref={tempSpanRef} style={{ visibility: 'hidden', position: 'absolute', fontSize: '12px', whiteSpace: 'pre' }} />
    </SelectBoxContainer>
  );
}
