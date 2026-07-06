export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

export const validatePassword = (password: string): boolean => {
  // Minimum 8 chars, 1 uppercase, 1 number
  return password.length >= 8;
};

export const validateTodo = (todo: string): boolean => {
  const trimmed = todo.trim();
  return trimmed.length > 0 && trimmed.length <= 500;
};

export const validateUserId = (user_id: string): boolean => {
  return !!(user_id && user_id.length > 0);
};
