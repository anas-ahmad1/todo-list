const Task = require("../models/Task");
const asyncHandler = require("express-async-handler");


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

  
module.exports = { createTask };