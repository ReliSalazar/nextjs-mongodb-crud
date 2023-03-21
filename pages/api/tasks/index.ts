import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/mongoose";
import Task from "@/models/task";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }

    case "POST":
      try {
        const newTask = new Task(body);
        const savedTask = await newTask.save();
        return res.status(201).json(savedTask);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ message: "This method is not supported." });
  }
}
