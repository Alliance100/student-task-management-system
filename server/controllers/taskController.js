/**
 * Task Controller
 * Handles all task-related business logic
 */

const Task = require("../models/Task");

/**
 * Create Task
 */

const createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        });

    } catch (error) {
        next(error);
    }
};

/**
 * Get All Tasks
 */

const getAllTasks = async (req, res, next) => {
    try {

        const tasks = await Task.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            message: "Tasks retrieved successfully",
            count: tasks.length,
            data: tasks
        });

    } catch (error) {
        next(error);
    }
};

/**
 * Get Single Task
 */

const getTaskById = async (req, res, next) => {
    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task retrieved successfully",
            data: task
        });

    } catch (error) {
        next(error);
    }
};

/**
 * Update Task
 */

const updateTask = async (req, res, next) => {
    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });

    } catch (error) {
        next(error);
    }
};

/**
 * Delete Task
 */

const deleteTask = async (req, res, next) => {
    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};