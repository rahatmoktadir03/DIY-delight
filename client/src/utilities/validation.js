export const validateCombo = (features) => {
  if (features.color === "green" && features.material === "leather") {
    return { valid: false, message: "Green leather is not available." };
  }
  return { valid: true };
};
