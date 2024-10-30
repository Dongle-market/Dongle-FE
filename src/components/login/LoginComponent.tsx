import styled from "styled-components";

import KakaoLoginButton from "@/components/login/KakaoLoginButton";
import BigLogoDongleSvg from '/public/svgs/logo/biglogo_dongle_eng.svg';

const LogoWrapper = styled.div<{show: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-width: inherit;
  position: relative;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.5s;
`;

const KakaoLoginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 10;
  width: 100%;
  bottom: 120px;
`

interface LoginComponentProps {
  show: boolean;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
  show
}) => {
  return (
    <LogoWrapper show={show}>
      <BigLogoDongleSvg />
      <KakaoLoginButtonContainer>
        <KakaoLoginButton />
      </KakaoLoginButtonContainer>
    </LogoWrapper>
  )
}

export default LoginComponent;