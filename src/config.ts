import path from "path";
import dotenv from "dotenv";

const envFileName = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env.development";
const envPath = path.resolve(process.cwd(), envFileName);

dotenv.config({ path: envPath });

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

export type ConfigType = {
  environment: string;
  PORT: number;
  HOST: string;
  MONGO_URI: string;
};

// Configuration object to hold all environment variables and settings
export const config: ConfigType = {
  environment: process.env.NODE_ENV as string,
  PORT: Number(process.env.PORT) || 3001,
  HOST: process.env.HOST ?? "127.0.0.1",
  MONGO_URI: process.env.MONGO_URI! as string,
};
