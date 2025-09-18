const Task = require("../models/Task");
const asyncHandler = require("express-async-handler");

// Create a task for the logged in user
const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate, category } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: "Please add a title" });
  }

  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    completed: false,
    user: req.user.id,
    category,
  });

  res.status(201).json(task);
});

// Fetch all the tasks of the logged in user (For the selected category)
const getTasks = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const filter = { user: req.user.id };
  if (category) {
    filter.category = category;
  }

  const tasks = await Task.find(filter);

  res.status(200).json(tasks);
});

// Fetch a task based on id
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });;
  }

  // Check if the task found belongs to the logged in user or not
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "Not authorized to view this task" });;
  }

  res.status(200).json(task);
});

// Update a specific task
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, completed, priority, dueDate } = req.body;

  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });;
  }

  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "Not authorized to update this task" });;
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate;

  const updatedTask = await task.save();

  res.status(200).json(updatedTask);
});

// Delete a specific task
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "Not authorized to delete this task" });;
  }

  await task.deleteOne();

  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
