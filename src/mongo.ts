import mongoose from "mongoose";
import { config } from "./config";

const connectMongoDB = async () => {
  try {
    console.log(config.MONGO_URI, "process.env.MONGO_URI");
    await mongoose.connect(config.MONGO_URI!);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
};

export default connectMongoDB;
