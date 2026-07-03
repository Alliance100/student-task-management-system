const validateTask = (req, res, next) => {
    const { title, priority, dueDate } = req.body;

    const errors = [];

    // Title
    if (!title || title.trim() === "") {
        errors.push("Title is required.");
    } else if (title.trim().length < 3) {
        errors.push("Title must be at least 3 characters.");
    } else if (title.trim().length > 100) {
        errors.push("Title cannot exceed 100 characters.");
    }

    // Priority
    const validPriorities = ["Low", "Medium", "High"];

    if (!priority) {
        errors.push("Priority is required.");
    } else if (!validPriorities.includes(priority)) {
        errors.push("Priority must be Low, Medium, or High.");
    }

    // Status
    const validStatuses = ["Pending", "InProgress", "Completed"];

    if (req.body.status && !validStatuses.includes(req.body.status)) {
        errors.push("Status must be Pending, InProgress, or Completed.");
    }

    // Due Date
    if (!dueDate) {
        errors.push("Due date is required.");
    } else if (isNaN(new Date(dueDate).getTime())) {
        errors.push("Due date must be a valid date.");
    } else if (new Date(dueDate) < new Date().setHours(0, 0, 0, 0)) {
        errors.push("Due date cannot be in the past.");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors
        });
    }

    next();
};

module.exports = validateTask;