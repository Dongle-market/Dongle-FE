import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import ArrowSvg from "/public/svgs/element/arrow_down.svg";

const SelectBoxContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 10px;
  border: 1px solid gray;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
`;

const SelectedOption = styled.div<{ $width: number }>`
  font-size: 12px;
  color: black;
  width: ${({ $width }) => `${$width}px`};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Arrow = styled.div`
  display: flex;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid gray;
  border-radius: 8px;
  margin-top: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const Option = styled.div`
  padding: 8px 10px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

interface SelectBoxProps {
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
}

export default function SelectBox({ options, selectedOption, onChange }: SelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectWidth, setSelectWidth] = useState(50);
  const tempSpanRef = useRef<HTMLSpanElement>(null);

  // 선택된 옵션의 너비를 동적으로 설정
  useEffect(() => {
    if (tempSpanRef.current) {
      tempSpanRef.current.innerText = selectedOption;
      setSelectWidth(tempSpanRef.current.offsetWidth + 12); // 추가 padding 여유를 위해 +12
    }
  }, [selectedOption]);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <SelectBoxContainer onClick={toggleDropdown}>
      <SelectedOption $width={selectWidth}>{selectedOption}</SelectedOption>
      <Arrow>
        <ArrowSvg />
      </Arrow>
      {isOpen && (
        <Dropdown>
          {options.map((option) => (
            <Option key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </Option>
          ))}
        </Dropdown>
      )}
      <span ref={tempSpanRef} style={{ visibility: 'hidden', position: 'absolute', fontSize: '12px', whiteSpace: 'pre' }} />
    </SelectBoxContainer>
  );
}
