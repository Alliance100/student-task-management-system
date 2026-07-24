const express = require("express");

const router = express.Router();

const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

const validateTask = require("../middleware/validateTask");
const { protect } = require("../middleware/auth");

// All task routes are protected
router.use(protect);

// GET all tasks
router.get("/", getAllTasks);

// GET single task
router.get("/:id", getTaskById);

// POST create task
router.post("/", validateTask, createTask);

// PUT update task
router.put("/:id", validateTask, updateTask);

// DELETE task
router.delete("/:id", deleteTask);

module.exports = router;