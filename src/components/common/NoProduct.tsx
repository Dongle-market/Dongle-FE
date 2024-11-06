// NoProduct.tsx
import styled from "styled-components"

const NoProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 262px);
`;

const NoPrductText = styled.span`
  color: #545454;
`;

export default function NoProductComponent() {
  return (
    <div className="page">
      <NoProductContainer>
        <NoPrductText>아직 준비된 상품이 없어요 😢</NoPrductText>
      </NoProductContainer>
    </div>
  )
}