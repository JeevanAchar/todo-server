import mongoose from "mongoose";

const TodoSchame = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
      trim: true,
    },
    todo_id: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: String,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  },
);

const TodoModel = mongoose.model("todo", TodoSchame);
export default TodoModel;
