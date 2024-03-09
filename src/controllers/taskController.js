const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body, req.user);

    if (task) {
      return res
        .status(201)
        .json({ message: "Task created successfully", task });
    } else {
      return res.status(500).json({ error: "Failed to create task" });
    }
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = createTask;

const fetchTask = async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const userId = req.user._id;
  
      const task = await taskService.fetchTask(taskId, userId);
  
      if (task.length) {
        // If task is found
        return res.status(200).json({ task });
      } else {
        // If task is not found
        return res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      // If an error occurs
      console.error('Error fetching task:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const updatedTask = await taskService.updateTask(taskId, req.body);

    if (updatedTask) {
      return res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } else {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const deletedTask = await taskService.deleteTask(taskId);

    if (deletedTask) {
      return res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createTask,
  fetchTask,
  updateTask,
  deleteTask,
};
