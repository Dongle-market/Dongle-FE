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

const Select = styled.select<{ $width: number }>`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  background: transparent;
  font-size: 12px;
  cursor: pointer;
  color: black;
  outline: none;
  width: ${({ $width }) => `${$width}px`};
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
  const [selectWidth, setSelectWidth] = useState(50);
  const tempSpanRef = useRef<HTMLSpanElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (tempSpanRef.current) {
      tempSpanRef.current.innerText = selectedOption;
      setSelectWidth(tempSpanRef.current.offsetWidth + 12);
    }
  }, [selectedOption]);

  const handleArrowClick = () => {
    selectRef.current?.focus();
  };

  return (
    <SelectBoxContainer>
      <Select
        ref={selectRef}
        $width={selectWidth}
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <Arrow onClick={handleArrowClick}>
        <ArrowSvg />
      </Arrow>
      <span ref={tempSpanRef} style={{ visibility: 'hidden', position: 'absolute', fontSize: '12px', whiteSpace: 'pre' }} />
    </SelectBoxContainer>
  );
}
