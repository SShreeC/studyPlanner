// // controllers/taskController.js
// const Task = require('../models/taskModel');
// const moment = require('moment');

// // Fetch tasks for the logged-in user
// exports.getTasks = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const tasks = await Task.find({ userId });
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching tasks', error: error.toString() });
//   }
// };

// // Add a new task
// exports.addTask = async (req, res) => {
//   try {
//     const { subject, taskType, priority, dueDate } = req.body;
//     const userId = req.user._id;

//     const newTask = new Task({
//       userId,
//       subject,
//       taskType,
//       priority,
//       dueDate,
//     });

//     await newTask.save();
//     res.status(201).json(newTask);
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding task', error: error.toString() });
//   }
// };

// // Schedule tasks based on end time
// exports.scheduleTasks = async (req, res) => {
//   try {
//     const { endTime } = req.body;
//     const userId = req.user._id;

//     // Validate endTime
//     if (!endTime || !moment(endTime, 'HH:mm', true).isValid()) {
//       return res.status(400).json({ message: 'Invalid end time format. Please use HH:mm.' });
//     }

//     // Fetch unscheduled tasks for the logged-in user, sorted by due date
//     const tasks = await Task.find({ userId, scheduledDate: null }).sort({ dueDate: 1 });

//     let startTime = moment().set({ hour: endTime.split(':')[0], minute: endTime.split(':')[1], second: 0 });

//     const scheduledTasks = [];

//     for (const task of tasks) {
//       // Check if the task is due at least one day from now
//       if (moment(task.dueDate).subtract(1, 'day').isSameOrAfter(moment())) {
//         // Start scheduling 2 hours after end time
//         startTime = startTime.add(2, 'hours');
        
//         // Set the scheduled date for the task
//         task.scheduledDate = startTime.toDate();
        
//         // Update the task in the database
//         await Task.findByIdAndUpdate(task._id, { scheduledDate: task.scheduledDate });
        
//         scheduledTasks.push(task);

//         // Move the start time for the next task
//         startTime = startTime.add(1.5, 'hours'); // 1.5 hours of work
//         startTime = startTime.add(25, 'minutes'); // 25 mins break
//       }
//     }

//     res.status(200).json({
//       message: 'Tasks scheduled successfully',
//       scheduledTasks: scheduledTasks
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error scheduling tasks', error: error.toString() });
//   }
// };

// // Update a task
// exports.updateTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;
//     const userId = req.user._id;

//     const task = await Task.findOneAndUpdate(
//       { _id: id, userId: userId },
//       updates,
//       { new: true, runValidators: true }
//     );

//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     res.status(200).json(task);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating task', error: error.toString() });
//   }
// };

// // Delete a task
// exports.deleteTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user._id;

//     const task = await Task.findOneAndDelete({ _id: id, userId: userId });

//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     res.status(200).json({ message: 'Task deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting task', error: error.toString() });
//   }
// };

// controllers/scheduledTaskController.js
const ScheduledTask = require('../models/scheduleTask');
const Task = require('../models/task');

// Get all scheduled tasks for the logged-in user
exports.getScheduledTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const scheduledTasks = await ScheduledTask.find({ userId }).populate('taskId');
    res.status(200).json(scheduledTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scheduled tasks', error: error.toString() });
  }
};

// Create or update a scheduled task
exports.updateScheduledTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;
    const { 
      scheduledStartTime, 
      scheduledEndTime, 
      scheduledBreakStartTime, 
      scheduledBreakEndTime, 
      scheduledDurationMinutes 
    } = req.body;

    // Check if the task exists and belongs to the user
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Find existing scheduled task or create a new one
    let scheduledTask = await ScheduledTask.findOne({ taskId, userId });
    
    if (scheduledTask) {
      // Update existing scheduled task
      scheduledTask.scheduledStartTime = scheduledStartTime;
      scheduledTask.scheduledEndTime = scheduledEndTime;
      scheduledTask.scheduledBreakStartTime = scheduledBreakStartTime;
      scheduledTask.scheduledBreakEndTime = scheduledBreakEndTime;
      scheduledTask.scheduledDurationMinutes = scheduledDurationMinutes;
      
      await scheduledTask.save();
    } else {
      // Create new scheduled task
      scheduledTask = new ScheduledTask({
        taskId,
        userId,
        scheduledStartTime,
        scheduledEndTime,
        scheduledBreakStartTime,
        scheduledBreakEndTime,
        scheduledDurationMinutes
      });
      
      await scheduledTask.save();
    }

    res.status(200).json(scheduledTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating scheduled task', error: error.toString() });
  }
};

// Delete a scheduled task
exports.deleteScheduledTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;

    const result = await ScheduledTask.findOneAndDelete({ taskId, userId });
    
    if (!result) {
      return res.status(404).json({ message: 'Scheduled task not found' });
    }

    res.status(200).json({ message: 'Scheduled task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting scheduled task', error: error.toString() });
  }
};

// Get scheduled tasks by date
exports.getScheduledTasksByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req.user._id;
    
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    const scheduledTasks = await ScheduledTask.find({
      userId,
      scheduledStartTime: { $gte: startDate, $lte: endDate }
    }).populate('taskId');
    
    res.status(200).json(scheduledTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scheduled tasks for date', error: error.toString() });
  }
};