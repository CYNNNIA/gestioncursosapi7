const request = require('supertest')
const app = require('../index')
const Curso = require('../src/models/Curso')
const mongoose = require('mongoose')

describe('GET /api/v1/cursos', () => {
  it('Debe devolver una lista de cursos', async () => {
    const res = await request(app).get('/api/v1/cursos')
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
  })
})
