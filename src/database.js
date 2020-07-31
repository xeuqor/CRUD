const mongoose = require('mongoose');

const URI = 'mongodb://localhost/minitienda';

mongoose.connect(URI)
    .then(db => console.log('BASE DE DATOS CONECTADA'))
    .catch(err => console.err(err));

module.exports = mongoose;
