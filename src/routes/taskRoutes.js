// authRoutes.js
const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();
const authenticateMiddleware = require('../middleware/authenticateToken');

// CRUD Tasks

// create
router.post("/", authenticateMiddleware, taskController.createTask);

// Read / fetch 
router.get("/:taskId?", authenticateMiddleware,  taskController.fetchTask);

// Update
router.put("/:taskId", authenticateMiddleware, taskController.updateTask);

// Delete
router.delete("/:taskId", authenticateMiddleware, taskController.deleteTask);

module.exports = router;
