const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Task title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters"],
            maxlength: [100, "Title cannot exceed 100 characters"]
        },

        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
            default: ""
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
            required: true
        },

        status: {
            type: String,
            enum: ["Pending", "Completed"],
            default: "Pending"
        },

        dueDate: {
            type: Date,
            required: [true, "Due date is required"]
        }
    },
    {
        timestamps: true
    }
);

// Index for faster searching
taskSchema.index({ title: "text" });

module.exports = mongoose.model("Task", taskSchema);