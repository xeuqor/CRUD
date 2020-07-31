const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database');
//CONFIG
app.set('port', process.env.PORT || 3000);

//FUNCIONES ANTES DE RUTAS (MIDDLEWARES)
app.use(morgan('dev'));
app.use(express.json());

//RUTAS
app.use('/api/task', require('./routes/task.routes'));


//ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public')));

//INICIAR EL SERVER
app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
});