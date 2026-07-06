export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export const successResponse = <T,>(
  message: string,
  data?: T,
): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message: string): ApiResponse => ({
  success: false,
  message,
});

export const formatUserResponse = (user: any) => {
  // Return only safe fields, exclude password
  return {
    user_id: user.user_id,
    email: user.email,
  };
};

export const formatTodoResponse = (todo: any) => {
  return {
    todo_id: todo.todo_id,
    todo: todo.todo,
    createdAt: todo.createdAt,
  };
};
