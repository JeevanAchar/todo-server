import TodoModel from "../models/Todo";
import { generatedUuid } from "../utils/CommonUtils";
import { formatTodoResponse } from "../utils/ResponseFormatter";

export const createTodoList = async ({
  todo,
  user_id,
}: {
  todo: string;
  user_id: string;
}) => {
  try {
    const result = await TodoModel.create({
      todo: todo.trim(),
      user_id,
      todo_id: generatedUuid(),
    });
    return formatTodoResponse(result);
  } catch (error) {
    throw error;
  }
};

export const getTodoList = async (user_id: string) => {
  try {
    const todos = await TodoModel.find(
      { user_id },
      { todo: 1, todo_id: 1, createdAt: 1, _id: 0 }
    ).sort({ createdAt: -1 });
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const updateTodoList = async ({
  todo_id,
  todo,
}: {
  todo_id: string;
  todo: string;
}) => {
  try {
    const result = await TodoModel.findOneAndUpdate(
      { todo_id },
      { todo: todo.trim() },
      {
        new: true,
        runValidators: true,
        projection: { todo: 1, todo_id: 1, createdAt: 1, _id: 0 },
      }
    );
    return result;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodoList = async (todo_id: string) => {
  try {
    return await TodoModel.findOneAndDelete({ todo_id });
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
