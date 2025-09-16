const express = require("express");
const router = express.Router();
const { createTask, getTasks, getTaskById, updateTask } = require("../controllers/taskController");

router.post("/", createTask);

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

module.exports = router;