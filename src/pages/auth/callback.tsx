'use client';

import { login } from "@/services/auth/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import LoadingCatSvg from '/public/svgs/logo/loading_cat.svg';

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-width: inherit;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export default function CallbackPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  useEffect(() => {
    const { code } = router.query;
    if (code) {
      setCode(code.toString());
    }
  }, [router.query]);

  const handleLogin = async() => {
    const data = await login({ authCode: code });
    if (data) {
      localStorage.setItem("accessToken", data.token);
      router.push("/dog");
    }
  }

  useEffect(() => {
    if (code) {
      handleLogin();
    }
  }, [code])

  return (
    <div className="page">
      <LogoContainer>
        <LoadingCatSvg />
      </LogoContainer>
    </div>
  );
}