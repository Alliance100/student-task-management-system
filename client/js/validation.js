function validateTask(task) {

    if (!task.title) {
        showToast("Task title is required.", "error");
        return false;
    }

    if (task.title.length < 3) {
        showToast("Title must be at least 3 characters.", "error");
        return false;
    }

    if (!task.priority) {
        showToast("Please select a priority.", "warning");
        return false;
    }

    if (!task.status) {
        showToast("Please select a status.", "warning");
        return false;
    }

    if (!task.dueDate) {
        showToast("Please select a due date.", "warning");
        return false;
    }
    return true;
}