require('dotenv').config()
const express = require('express')
const connectDB = require('./src/config/db')
const cursosRouter = require('./src/api/routes/cursos')
const usersRouter = require('./src/api/routes/users')
const authMiddleware = require('./src/middleware/auth')

const app = express()

// Conectar a la base de datos
connectDB()

// Middleware para parsear JSON
app.use(express.json())

// Usar rutas
app.use('/api/v1/cursos', cursosRouter)
app.use('/api/v1/users', usersRouter)

// Ruta por defecto para manejar 404
app.use('*', (req, res) => res.status(404).json({ message: 'Not found' }))

// Iniciar el servidor solo si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () =>
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
  )
}

module.exports = app // Exportar la instancia de app para Supertest
