const request = require('supertest')
const app = require('../index') // Asegúrate de exportar tu app desde el archivo principal
const Curso = require('../src/models/Curso')
const mongoose = require('mongoose')

// Test para el endpoint GET /api/v1/cursos
describe('GET /api/v1/cursos', () => {
  it('Debe devolver una lista de cursos', async () => {
    const res = await request(app).get('/api/v1/cursos')
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
  })
})
