const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//creamos el servidor al que llamamos app
const app = express();

conectarDB();

//habilitar cors
app.use(cors()); 

const PORT =  4000;

app.use( express.json({extended: true}))

app.use('/api/producto', require('./routes/producto') );



//arranca la app...

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en por el puerto ${PORT}`);
});
