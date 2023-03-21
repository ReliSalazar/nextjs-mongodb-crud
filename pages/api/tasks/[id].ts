import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/mongoose";
import Task from "@/models/task";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task) return res.status(400).json({ message: "Task not found." });
        return res.status(200).json(task);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }

    case "PUT":
      try {
        const task = await Task.findByIdAndUpdate(id, body, { new: true });
        if (!task) return res.status(400).json({ message: "Task not found." });
        return res.status(200).json({});
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }

    case "DELETE":
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask)
          return res.status(400).json({ message: "Task not found." });
        return res.status(204).json({});
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ message: "This method is not supported." });
  }
}
