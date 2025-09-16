const Task = require("../models/Task");
const asyncHandler = require("express-async-handler");

// Create a task for the logged in user
const createTask = asyncHandler(async (req, res) => {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
        res.status(400);
        throw new Error("Please add a title");
    }

    const task = await Task.create({
        title,
        description,
        priority,
        dueDate,
        completed: false,
        user: req.user.id,
    });

    res.status(201).json(task);
});


// Fetch all the tasks of the logged in user
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
});


// Fetch a task based on id
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check if the task found belongs to the logged in user or not
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to view this task");
  }

  res.status(200).json(task);
});

  
module.exports = { createTask, getTasks, getTaskById };