const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const { request } = require('express');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

//POST
router.post('/', async (req, res) => {
    const { nombre, descripcion, precio, codigo } = req.body;
    new Task({
        nombre, descripcion, precio, codigo
    });
    const task = new Task({ nombre, descripcion, precio, codigo });
    await task.save();
    res.json({ status: 'Tarea guardada' });
});


//PUT
router.put('/:id', async (req, res) => {
    const { nombre, descripcion, precio, codigo } = req.body;
    const newTask = { nombre, descripcion, precio, codigo };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({ status: 'Tarea actualizada' })
});

//DELETE
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ status: 'Tarea eliminada' })
});

module.exports = router;