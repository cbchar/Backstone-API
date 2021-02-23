const express = require('express');
const router = express.Router();

const mongoose = require('mongoose') ;
const Task = mongoose.model('Task');

//add task
router.post('/add', (req,res,next)=>{
    const task = new Task(req.body)
    task.save(function(err, task){
        if(err){
            return next(err)
        }
        res.json(task)
    })
})

//get task
router.get('/get', async (req, res) => {
    Task.find(function (err, task) {
        if (err) {
            return next(err)
        }
        res.json(task)
    })
})

//get for id
router.get('/getid/:id', async (req, res) => {
    const articulo = await Articulo.findOne({ id: req.body.id })
    if (articulo) { return res.send(articulo) }
    return res.send("The task doesn't exist")
}) 

//update task 
router.put('/update', async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { id: req.body.id },
        {
            description: req.body.description,
            title: req.body.title,
            due_date: req.body.due_date,
            completed: req.body.completed
        }, {
        new: true
    })
    res.send(articulo);
})

// delete task
router.post('/delete', async (req, res) => { 
    await Task.findOneAndDelete({ id: req.body.id }, function
        (err, task) {
        if (err) { res.send(err) }
        res.json({ Mensaje: 'El articulo ha sido eliminado' })
    })
})

module.exports = router;
