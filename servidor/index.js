const express = require('express')
const conectarDB = require('./config/db')

// Crear el servidor
const app = express()

// Conectar a la base de datos
conectarDB()

// Habilitar express.json
app.use(express.json({ extended: true }))

// crear un puerto - puerto de la app 
const PORT = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))

// arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`)
})