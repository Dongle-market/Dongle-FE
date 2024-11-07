import styled from "styled-components";
import LoadingCatSvg from "/public/svgs/logo/data_loading_cat.svg";
import { ReactNode } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: rgba(248, 248, 248, 0.70);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const LoadingBackground = styled.div`
  width: 100%;
  height: 100%;
  z-index: 50;
`;

const SkeletonImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`


export default function LoadingComponent({src}: {src: string}): ReactNode {
  return (
    <Wrapper className="page">
      <LoadingContainer>
        <LoadingCatSvg />
      </LoadingContainer>
      <LoadingBackground>
        <SkeletonImage src={src} alt="skeleton" />
      </LoadingBackground>
    </Wrapper>
  );
}