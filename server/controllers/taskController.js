const Task = require("../models/Task");

// Create Task

const createTask = async (req, res, next) => {
    try {
        req.body.user = req.user._id;

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

// Get All Tasks (only user's own tasks)

const getAllTasks = async (req, res, next) => {
    try {

        const tasks = await Task.find({ user: req.user._id }).sort({
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

// Get Single Task By ID (only if owned by user)

const getTaskById = async (req, res, next) => {
    try {

        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id
        });

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

// Update Task (only if owned by user)

const updateTask = async (req, res, next) => {
    try {

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
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

// Delete Task (only if owned by user)

const deleteTask = async (req, res, next) => {
    try {

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: null
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