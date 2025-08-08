import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    const {boardId} = req.params;
    if(!boardId){
        return res.status(401).json({message: "ID is required", success: false});
    }
    const tasks = await Task.find({ boardId });
    return res.status(200).json({message:"Tasks successfully fetched", tasks, success: true});
};

export const createTask = async (req, res) => {
    const {title, description, status, dueDate, boardId} = req.body;
    if(!title || !description || !status || !dueDate || !boardId){
        return res.status(401).json({message: "All data is required", success: false});
    }
    const task = await Task.create({ 
        title,
        description,
        status,
        dueDate,
        boardId 
    });
    return res.status(201).json({message:"Task successfully created", task, success: true});
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, dueDate } = req.body;
  if (!taskId) {
    return res.status(401).json({ message: "TaskID is required", success: false });
  }
  const task = await Task.findByIdAndUpdate(taskId,{ title, description, status, dueDate },{ new: true }    );
  return res.status(201).json({message: "Task successfully updated",task,success: true,});
};

export const deleteTask = async (req, res) => {
    const {taskId} = req.params;
    if(!taskId){
        return res.status(401).json({message: "TaskID is required", success: false});
    }
    await Task.findByIdAndDelete(taskId);
    return res.status(200).json({message:"Task deleted successfully", success: true});
};