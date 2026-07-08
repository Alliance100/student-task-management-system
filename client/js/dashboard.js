function updateStatistics(tasks) {

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task =>
        task.status.toLowerCase() === "completed").length;

    const progressTasks = tasks.filter(task => {
        const status = task.status.toLowerCase();
        return status === "inprogress" || status === "in progress";
    }).length;

    const pendingTasks = tasks.filter(task =>
        task.status.toLowerCase() === "pending").length;

    document.getElementById("totalTasks").textContent = totalTasks;
    document.getElementById("completedTasks").textContent = completedTasks;
    document.getElementById("progressTasks").textContent = progressTasks;
    document.getElementById("pendingTasks").textContent = pendingTasks;
}