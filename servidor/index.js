const express = require('express')
const conectarDB = require('./config/db')
const cors = require('cors')

// Crear el servidor
const app = express()

// Conectar a la base de datos
conectarDB()

// Habilitar CORS -- El error de CORS detecta que tenemos el front en una URL y el back en otra
app.use(cors())

// Habilitar express.json
app.use(express.json({ extended: true }))

// crear un puerto - puerto de la app 
const PORT = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))

// arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`)
})