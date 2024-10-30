import styled from "styled-components";
import KakaoLogoSvg from "/public/svgs/element/kakao_logo.svg";
import { kakaoLogin } from "@/services/auth/kakaoLogin";

const KaKaoLoginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 60px);
  max-width: 360px;
  border-radius: 12px;
  margin: 0 16px;
  padding: 12px;
  background-color: #FFE500;
  cursor: pointer;
`

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  flex-grow: 1;
`

const KakaoLoginButton = () => {
  return (
    <KaKaoLoginButtonContainer onClick={kakaoLogin}>
      <KakaoLogoSvg />
      <TextContainer>
        카카오로 시작하기
      </TextContainer>
    </KaKaoLoginButtonContainer>
  );
}

export default KakaoLoginButton;