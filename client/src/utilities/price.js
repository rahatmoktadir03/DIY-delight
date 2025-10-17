export const calculatePrice = (features) => {
  let base = 100;
  if (features.color === "blue") base += 10;
  if (features.material === "leather") base += 25;
  return base;
};
