const generateRandomPassword = () => {
  return Math.floor(Math.random() * 10 ** 8)
    .toString()
    .padStart(8, "0");
};

export { generateRandomPassword };
