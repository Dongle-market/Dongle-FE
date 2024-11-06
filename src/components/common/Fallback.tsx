import styled from "styled-components"

const FallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FallbackText = styled.span`
  color: #545454;
  margin-bottom: 32px;
`;

const GoBackButton = styled.button`
  padding: 8px 16px;
  background-color: #E55737;
  color: white;
  border: 1px solid #E55737;
  border-radius: 20px;
  height: 36px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export default function FallbackComponent() {

  return (
    <div className="page">
      <FallbackContainer>
        <FallbackText>존재하지 않는 페이지에요 😢</FallbackText>
        <GoBackButton onClick={() => window.history.back()}>뒤로가기</GoBackButton>
      </FallbackContainer>
    </div>
  )
}