import { isMobile } from "@/utils/detectDevice"

export const kakaoLogin = () => {
  if (isMobile()) {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    })
  } else {
    console.log("PC 환경에서는 지원하지 않습니다.")
  }

}