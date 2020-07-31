const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    nombre: { type: String, require: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    codigo: { type: Number, required: true }
});

module.exports = mongoose.model('Task', TaskSchema);