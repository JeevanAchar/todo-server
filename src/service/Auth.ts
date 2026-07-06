import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User";
import { generatedUuid } from "../utils/CommonUtils";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";

export const signupUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const existingUser = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user_id = generatedUuid();

    const user = await UserModel.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      user_id,
    });

    const token = jwt.sign({ user_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    } as any);

    return {
      user_id: user.user_id,
      email: user.email,
      token,
    };
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    } as any);

    return {
      user_id: user.user_id,
      email: user.email,
      token,
    };
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};
