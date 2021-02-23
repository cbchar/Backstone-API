const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    id: Number,
    description: String,
    title: String,
    due_date: Date,
    completed: Boolean
})

mongoose.model('Task', TaskSchema);