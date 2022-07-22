export const regEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

export const validateEmail = (Email: string) => {
  if (Email.length < 1 || Email.length > 10) {
    return;
  }
};

export const validatePsw = (Password: string) => {
  if (Password.length < 1 || Password.length > 6) {
    return;
  }
};

export const confirmPassword = (psw: string, confirmPassword: string) => {
  if (psw === confirmPassword) {
    return;
  }
};
