/** 모바일 환경일 시 true */
export const isMobile = () => {
  const userAgent = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return userAgent;
};