// 비밀번호 초기화 시 랜덤한 비밀번호 생성해주는 함수
const generateRandomPassword = () => {
  return Math.floor(Math.random() * 10 ** 8)
    .toString()
    .padStart(8, "0");
};

export { generateRandomPassword };
