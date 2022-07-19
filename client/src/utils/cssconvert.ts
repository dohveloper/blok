export const PxVw = (px: number) => {
  return (100 * px) / 1120 + 'vw';
};
export const RemtoVw = (px: number, rem: number) => {
  return (rem * 100 * px) / 1120 + 'vw';
};
