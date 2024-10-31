import { isMobile } from "@/utils/detectDevice"

export const kakaoLogin = async () => {
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || 'http://localhost:3000/auth/callback';
  console.log(redirectUri)
  if (isMobile()) {
    window.Kakao.Auth.authorize({
      redirectUri: redirectUri,
    })
  } else {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  }
}