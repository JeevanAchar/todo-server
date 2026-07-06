import { Response } from "express";
import {
  createTodoList,
  deleteTodoList,
  getTodoList,
  updateTodoList,
} from "../service/Todo";
import { AuthRequest } from "../middleware/authMiddleware";
import { validateTodo } from "../middleware/validation";
import TodoModel from "../models/Todo";

export async function createTodo(
  request: AuthRequest,
  response: Response,
): Promise<void> {
  try {
    const { todo } = request.body;
    const user_id = request.user_id;

    // Validation
    if (!todo) {
      response.status(400).json({
        success: false,
        message: "Todo content is required",
      });
      return;
    }

    if (!validateTodo(todo)) {
      response.status(400).json({
        success: false,
        message: "Todo must be between 1 and 500 characters",
      });
      return;
    }

    const result = await createTodoList({ todo, user_id: user_id! });

    response.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getTodos(
  request: AuthRequest,
  response: Response,
): Promise<void> {
  try {
    const user_id = request.user_id;

    const result = await getTodoList(user_id!);

    response.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function updateTodo(
  request: AuthRequest,
  response: Response,
): Promise<void> {
  try {
    const todo_id = Array.isArray(request.params.todo_id)
      ? request.params.todo_id[0]
      : request.params.todo_id;
    const { todo } = request.body;
    const user_id = request.user_id;

    // Validation
    if (!todo) {
      response.status(400).json({
        success: false,
        message: "Todo content is required",
      });
      return;
    }

    if (!validateTodo(todo)) {
      response.status(400).json({
        success: false,
        message: "Todo must be between 1 and 500 characters",
      });
      return;
    }

    // Authorization: Verify user owns this todo
    const existingTodo = await TodoModel.findOne({ todo_id });
    if (!existingTodo) {
      response.status(404).json({
        success: false,
        message: "Todo not found",
      });
      return;
    }

    if (existingTodo.user_id !== user_id) {
      response.status(403).json({
        success: false,
        message: "Unauthorized: You cannot modify this todo",
      });
      return;
    }

    const result = await updateTodoList({
      todo_id,
      todo,
    });

    response.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function deleteTodo(
  request: AuthRequest,
  response: Response,
): Promise<void> {
  try {
    const todo_id = Array.isArray(request.params.todo_id)
      ? request.params.todo_id[0]
      : request.params.todo_id;
    const user_id = request.user_id;

    // Authorization: Verify user owns this todo
    const existingTodo = await TodoModel.findOne({ todo_id });
    if (!existingTodo) {
      response.status(404).json({
        success: false,
        message: "Todo not found",
      });
      return;
    }

    if (existingTodo.user_id !== user_id) {
      response.status(403).json({
        success: false,
        message: "Unauthorized: You cannot delete this todo",
      });
      return;
    }

    await deleteTodoList(todo_id);

    response.status(204).send(); // No content response
  } catch (error) {
    console.error(error);

    response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
