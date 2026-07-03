const validateTask = (req, res, next) => {
    const { title, priority, dueDate } = req.body;

    const errors = [];

    // Title Validation
    if (!title || title.trim() === "") {
        errors.push("Title is required.");
    } else if (title.trim().length < 3) {
        errors.push("Title must be at least 3 characters.");
    } else if (title.trim().length > 100) {
        errors.push("Title cannot exceed 100 characters.");
    }

    // Priority Validation
    const validPriorities = ["Low", "Medium", "High"];

    if (!priority) {
        errors.push("Priority is required.");
    } else if (!validPriorities.includes(priority)) {
        errors.push("Priority must be Low, Medium, or High.");
    }

    // Due Date Validation
    if (!dueDate) {
        errors.push("Due date is required.");
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