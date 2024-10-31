// /pages.tsx
'use client';

import React, { useEffect, useState } from "react";

import SplashComponent from "@/components/login/SplashComponent";
import LoginComponent from "@/components/login/LoginComponent";
import { kakaoLogin } from "@/services/auth/kakaoLogin";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page">
      <SplashComponent show={showSplash} />
      <LoginComponent show={!showSplash} kakaoLogin={kakaoLogin} />
    </div>
  );
}