// Simple client-side validators. Each returns an error string or "" if valid.

export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";
  const re = /^\S+@\S+\.\S+$/;
  if (!re.test(email)) return "Please enter a valid email";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
};

export const validateRequired = (value, fieldName = "This field") => {
  if (!value || !value.trim()) return `${fieldName} is required`;
  return "";
};
