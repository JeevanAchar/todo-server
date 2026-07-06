import { Request, Response } from "express";
import { loginUser, signupUser } from "../service/Auth";
import { validateEmail, validatePassword } from "../middleware/validation";

export async function signup(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const { email, password } = request.body;

    // Validation
    if (!email || !password) {
      response.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    if (!validateEmail(email)) {
      response.status(400).json({
        success: false,
        message: "Invalid email format",
      });
      return;
    }

    if (!validatePassword(password)) {
      response.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
      return;
    }

    const user = await signupUser({
      email,
      password,
    });

    response.status(201).json({
      success: true,
      message: "Signup successful",
      data: user,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";

    if (message.includes("already exists")) {
      response.status(409).json({
        success: false,
        message: "User already exists",
      });
    } else {
      response.status(400).json({
        success: false,
        message,
      });
    }
  }
}

export async function login(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const { email, password } = request.body;

    // Validation
    if (!email || !password) {
      response.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    const user = await loginUser({
      email,
      password,
    });

    response.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    response.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Invalid credentials",
    });
  }
}

