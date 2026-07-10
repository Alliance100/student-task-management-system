const API_URL = 
    window.location.port === "5000" || (!window.location.origin.includes("localhost") && !window.location.origin.includes("127.0.0.1") && window.location.protocol !== "file:")
        ? "/api/tasks"
        : "http://localhost:5000/api/tasks";

// Get all tasks
async function getTasks() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error(error);

        showToast("Something went wrong.", "error");
        return [];
    }
}

// Create new task
async function createTask(taskData) {

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        });

        const result = await response.json();
        return result;

    }

    catch (error) {
        console.error(error);

        showToast("Something went wrong.", "error");
    }

}

// Update Task
async function updateTask(id, taskData) {

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)

        });

        const result = await response.json();
        return result;
    }

    catch (error) {
        console.error(error);

        showToast("Something went wrong.", "error");
    }

}

// Delete Task
async function deleteTask(taskId) {

    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: "DELETE"
        });

        const result = await response.json();
        return result;
    }

    catch (error) {
        console.error(error);

        showToast("Something went wrong.", "error");
    }
}