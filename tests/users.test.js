const request = require('supertest')
const app = require('../index') // Asegúrate de exportar tu app desde el archivo principal
const User = require('../src/models/User')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// Test para el endpoint GET /api/v1/users
describe('GET /api/v1/users', () => {
  let tokenAdmin

  // Antes de las pruebas, sembramos un usuario admin en la base de datos
  beforeAll(async () => {
    // Limpiar la colección de usuarios antes de agregar uno
    await User.deleteMany({})

    // Sembrar un usuario admin
    const admin = new User({
      nombre: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      rol: 'admin'
    })
    await admin.save()

    // Generar un token para el admin
    tokenAdmin = jwt.sign(
      { userId: admin._id, rol: admin.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
  })

  // Cerrar la conexión a MongoDB después de todas las pruebas
  afterAll(async () => {
    await mongoose.connection.close()
  })

  // Test: El admin debe poder obtener la lista de usuarios
  it('Debe permitir al admin obtener la lista de usuarios', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${tokenAdmin}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeInstanceOf(Array) // Verificamos que el resultado sea un array
    expect(res.body.length).toBeGreaterThan(0) // Verificamos que haya al menos un usuario en el array
  })

  // Test: El acceso debe ser denegado para usuarios no autenticados
  it('Debe denegar acceso a usuarios no autenticados', async () => {
    const res = await request(app).get('/api/v1/users')
    expect(res.statusCode).toBe(401)
  })
})
