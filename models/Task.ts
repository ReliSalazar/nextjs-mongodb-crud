import { Schema, model, models } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      trim: true,
      maxLength: [40, "Title must be less than 40 charaters"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: [200, "Description must be less than 200 charaters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Task || model("Task", taskSchema);
