let editingTaskId = null;
let deleteTaskId = null;
let allTasks = [];
let currentSearch = "";
let currentStatus = "";
let currentPriority = "";
let currentSort = "";

document.addEventListener("DOMContentLoaded", () => {

    // Check authentication first
    if (!checkAuth()) return;

    // Load user profile into sidebar
    loadUserProfile();

    loadTasks();

    initializeSearch();

    initializeFilters();

    initializeSorting();

    const taskForm = document.getElementById("taskForm");

    taskForm.addEventListener("submit", handleTaskSubmit);

    document.getElementById("cancelDelete").addEventListener("click", closeDeleteModal);

document.getElementById("confirmDelete").addEventListener("click", confirmDeleteTask);

document.getElementById("deleteModal").addEventListener("click", (e) => {

    if (e.target.id === "deleteModal") {

        closeDeleteModal();

    }

});

// Logout button
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
    });
}

});

function loadUserProfile() {
    const user = getUser();
    if (!user) return;

    // Set welcome message
    const welcomeH1 = document.querySelector(".welcome-text h1");
    if (welcomeH1) {
        const firstName = user.name.split(" ")[0];
        welcomeH1.textContent = `Welcome Back, ${firstName}!`;
    }

    // Set user avatar initials
    const avatarEl = document.getElementById("userAvatar");
    if (avatarEl) {
        const initials = user.name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
        avatarEl.textContent = initials;
    }

    // Set user name
    const nameEl = document.getElementById("userName");
    if (nameEl) {
        nameEl.textContent = user.name;
    }

    // Set user email
    const emailEl = document.getElementById("userEmail");
    if (emailEl) {
        emailEl.textContent = user.email;
    }
}

async function loadTasks() {
    allTasks = await getTasks();
    renderTasks(allTasks);
    updateStatistics(allTasks);
}

async function handleTaskSubmit(event) {
    event.preventDefault();
    const task = {
        title: document.getElementById("taskTitle").value.trim(),
        description: document.getElementById("taskDescription").value.trim(),
        priority: document.getElementById("taskPriority").value,
        status: document.getElementById("taskStatus").value,
        dueDate: document.getElementById("taskDueDate").value
    };

    if (!validateTask(task)) {
        return;
    }

    let result;

    // UPDATE
    if (editingTaskId) {

        result = await updateTask(editingTaskId, task);

    }
    // CREATE
    else {

        result = await createTask(task);

    }

    // Check backend validation
    if (!result.success) {

        if (result.errors && result.errors.length > 0) {

            showToast(result.errors[0], "error");

        } else {

            showToast(result.message, "error");

        }

        return;

    }

    // Success
    if (editingTaskId) {

        showToast("Task updated successfully!");

        editingTaskId = null;

        document.getElementById("addTaskBtn").innerHTML = `
        <i class="fa-solid fa-paper-plane"></i>
        Add Task`;
        document.querySelector("#add-task .section-header h2").textContent = "Add New Task";

    } else {

        showToast("Task added successfully!");

    }

    event.target.reset();
    loadTasks();
}

function renderTasks(tasks) {

    const tableBody = document.getElementById("taskTableBody");

    tableBody.innerHTML = "";

    tasks.forEach(task => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <input type="checkbox">
            </td>

            <td>
                <div class="task-info">
                    <h4>${task.title}</h4>
                    <p>${task.description}</p>
                </div>
            </td>

            <td>
                <span class="badge ${task.priority.toLowerCase()}">
                    ${formatPriority(task.priority)}
                </span>
            </td>

            <td>
                <span class="badge ${getStatusClass(task.status)}">
                    ${formatStatus(task.status)}
                </span>
            </td>

            <td>
                ${formatDate(task.dueDate)}
            </td>

            <td>

                <button class="action-btn edit-btn" data-id="${task._id}">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>

                <button class="action-btn delete-btn" data-id="${task._id}">
                    <i class="fa-regular fa-trash-can"></i>
                </button>

            </td>
        `;

        tableBody.appendChild(row);

        // Edit Button
        row.querySelector(".edit-btn").addEventListener("click", () => {

            loadTaskIntoForm(task);

        });

        // Delete Button
        row.querySelector(".delete-btn").addEventListener("click", () => {

            handleDelete(task._id);

        });

    });

}

function formatPriority(priority) {
    switch (priority.toLowerCase()) {

        case "low":
            return "Low";

        case "medium":
            return "Medium";

        case "high":
            return "High";

        default:
            return priority;
    }
}

function formatStatus(status) {

    switch (status.toLowerCase()) {

        case "completed":
            return "Completed";

        case "pending":
            return "Pending";

        case "in progress":
        case "inprogress":
            return "In Progress";

        default:
            return status;
    }
}

function getStatusClass(status) {

    switch (status.toLowerCase()) {

        case "completed":
            return "completed";

        case "pending":
            return "pending";

        case "in progress":
        case "inprogress":
            return "progress";

        default:
            return "";
    }
}

function formatDate(date) {

    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function loadTaskIntoForm(task) {

    editingTaskId = task._id;
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskStatus").value = task.status;
    document.getElementById("taskDueDate").value = task.dueDate.split("T")[0];
    document.querySelector("#add-task .section-header h2").textContent = "Update Task";
    const submitButton = document.getElementById("addTaskBtn");

    submitButton.innerHTML = `
        <i class="fa-solid fa-pen-to-square"></i>
        Update Task`;

    submitButton.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    const formSection = document.getElementById("add-task");

    formSection.classList.remove("section-highlight");
    void formSection.offsetWidth;
    formSection.classList.add("section-highlight");
    setTimeout(() => {
        formSection.classList.remove("section-highlight");
    }, 1200);

    setTimeout(() => {
        const titleInput = document.getElementById("taskTitle");
        titleInput.focus();
        titleInput.select();
    }, 300);
}

function applyFilters() {

    let filteredTasks = [...allTasks];

    // Search
    if (currentSearch) {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(currentSearch) ||
            task.description.toLowerCase().includes(currentSearch)
        );
    }

    // Status
    if (currentStatus) {
        filteredTasks = filteredTasks.filter(task =>
            task.status.toLowerCase() === currentStatus.toLowerCase()
        );
    }

    // Priority
    if (currentPriority) {
        filteredTasks = filteredTasks.filter(task =>
            task.priority.toLowerCase() === currentPriority.toLowerCase()
        );
    }
    // Sorting
    switch (currentSort) {

        case "newest":
            filteredTasks.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            break;

        case "oldest":
            filteredTasks.sort((a, b) =>
                new Date(a.createdAt) - new Date(b.createdAt)
            );
            break;

        case "due":
            filteredTasks.sort((a, b) =>
                new Date(a.dueDate) - new Date(b.dueDate)
            );
            break;
    }

    renderTasks(filteredTasks);
}

function handleDelete(taskId) {

    openDeleteModal(taskId);

}

function openDeleteModal(taskId) {

    deleteTaskId = taskId;

    document.getElementById("deleteModal").classList.add("show");

}

function closeDeleteModal() {

    deleteTaskId = null;

    document.getElementById("deleteModal").classList.remove("show");

}

async function confirmDeleteTask() {

    if (!deleteTaskId) {

        return;

    }

    const result = await deleteTask(deleteTaskId);

    if (result.success) {

        showToast("Task deleted successfully!");

        loadTasks();

    }

    closeDeleteModal();

}