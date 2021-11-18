import express from 'express';
import mongoose from 'mongoose';

import Task from '../models/task.js';

const router = express.Router();

export const fetchTasks = async (req, res) => { 
    try {
        const Tasks = await Task.find();
        
        res.status(200).json(Tasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    const task = req.body;
    const maxTask = await Task.find({ status: { $in: ["BACKLOG", "OPEN"] } }).sort({ _id: -1 }).limit(1)
    var nextNumber = 1;

    if (maxTask.length > 0) {
        nextNumber = maxTask[0].ticketNumber + 1;
    }

    const isoDate = new Date().toISOString();
    const shortDate = new Date().toLocaleDateString('en-US');

    const newTask = new Task({ ...task, ticketNumber: nextNumber, status: "BACKLOG", createdAt: isoDate, createdAtShort: shortDate })

    try {
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, assignee, assigneeName, description, status, priority } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No task with id: ${id}`);

    const updatedTask = { title, assignee, assigneeName, description, status, priority, _id: id };

    await Task.findByIdAndUpdate(id, updatedTask, { new: true });

    res.status(200).json(updatedTask);
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No task with id: ${id}`);

    await Task.findByIdAndRemove(id);

    res.json({ message: "Task deleted successfully." });
}

export default router;