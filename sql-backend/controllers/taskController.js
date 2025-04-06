const {Task} = require('../models/taskmodel.js'); 


const postTask = async (req, res) => {
    try {
        const { title, assignedTo, startDate, dueDate, priority, tags, status, description } = req.body;

      // Validate the request body
      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }
  
      // Create a new task
      const task = await Task.create({
        title,
        assignedTo,
        startDate,
        dueDate,
        priority,
        tags,
        status,
        description
      });
  
      // Return the created task
      res.status(201).json(task);
    } catch (error) {
      // Handle any errors that occur during task creation
      console.error(error);
      res.status(500).json({ message: 'Failed to create task' });
    }
  };
  
  const getAllTasks = async (req, res) => {
    try {
      // Retrieve all tasks
      const tasks = await Task.findAll();
  
      // Return the tasks
      res.status(200).json(tasks);
    } catch (error) {
      // Handle any errors that occur during task retrieval
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
  };

  const getTask = async (req, res) => {
    try {
      // Retrieve the task ID from the request parameters
      const taskId = req.params.id;
  
      // Retrieve the task by ID
      const task = await Task.findByPk(taskId);
  
      // Check if the task exists
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Return the task
      res.status(200).json(task);
    } catch (error) {
      // Handle any errors that occur during task retrieval
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve task' });
    }
  };

  const updateTask = async (req, res) => {
    try {
      // Retrieve the task ID from the request parameters
      const taskId = req.params.id;
  
      // Retrieve the task by ID
      const task = await Task.findByPk(taskId);
  
      // Check if the task exists
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Update the task
      await task.update(req.body);
  
      // Return the updated task
      res.status(200).json(task);
    } catch (error) {
      // Handle any errors that occur during task update
      console.error(error);
      res.status(500).json({ message: 'Failed to update task' });
    }
  };

  const deleteTask = async (req, res) => {
    try {
      // Retrieve the task ID from the request parameters
      const taskId = req.params.id;
  
      // Retrieve the task by ID
      const task = await Task.findByPk(taskId);
  
      // Check if the task exists
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Delete the task
      await task.destroy();
  
      // Return a success message
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      // Handle any errors that occur during task deletion
      console.error(error);
      res.status(500).json({ message: 'Failed to delete task' });
    }
  };

  const moveTask = async (req, res) => {
    try {
      // Extract the task ID from the request parameters
      const { taskId } = req.params;
  
      // Extract the destination column from the request body
      const { destinationColumn } = req.body;
  
      // Check if the task ID and destination column are provided
      if (!taskId || !destinationColumn) {
        // Return a 400 error if either field is missing
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      // Update the task status in the database
      const task = await Task.findByPk(taskId);
      if (!task) {
        // Return a 404 error if the task is not found
        return res.status(404).json({ error: "Task not found" });
      }
  
      // Update the task status
      await task.update({ status: destinationColumn });
  
      // Return a success message with the updated task information
      res.json({ message: "Task moved successfully", taskId, status: destinationColumn });
    } catch (error) {
      // Handle any errors that occur during the database query
      console.error(error);
      res.status(500).json({ error: "Failed to move task" });
    }
  };
  module.exports = { postTask, getAllTasks, getTask, updateTask, deleteTask, moveTask };