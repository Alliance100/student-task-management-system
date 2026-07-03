const express = require("express");
const cors = require("cors");

const logger = require("./middleware/logger");
const taskRoutes = require("./routes/taskRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Student Task Management API Running"
    });
});

// Task Routes
app.use("/api/tasks", taskRoutes);

// 404 Middleware
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

module.exports = app;