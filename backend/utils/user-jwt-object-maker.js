// jwt에 담길 유저 object를 만들어주는 함수
const userJWTObjectMaker = (user) => {
  return {
    userId: user.userId,
    email: user.email,
    role: user.role,
    userName: user.userName,
    oauth: user.oauth,
    passwordReset: user.passwordReset,
  };
};

export { userJWTObjectMaker };
