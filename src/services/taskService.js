const { Task } = require("../models/Task.js");

const createTask = async (taskData, user) => {
  try {
    const task = new Task({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      userID: user._id,
    });
    await task.save();
    return task;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

const fetchTask = async (taskId, userId) => {
  try {
    let task;

    if (taskId) {
      // If taskId is provided, fetch the task with the given taskId for the given userId
      task = await Task.find({ _id: taskId, userID: userId });
    } else {
      // If taskId is not provided, fetch all tasks for the given userId
      task = await Task.find({ userID: userId });
    }

    return task; 
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error; 
  }
};

const updateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, taskData, { new: true });
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };
  
  const deleteTask = async (taskId) => {
    try {
      const deletedTask = await Task.findOneAndDelete({ _id: taskId });
      return deletedTask;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

module.exports = {
  createTask,
  fetchTask,
  updateTask,
  deleteTask,
};
