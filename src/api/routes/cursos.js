const express = require('express')
const Curso = require('../../models/Curso') // Verificar esta ruta
const router = express.Router()

// Obtener todos los cursos
router.get('/', async (req, res) => {
  const cursos = await Curso.find()
  res.json(cursos)
})

// Crear un nuevo curso
router.post('/', async (req, res) => {
  try {
    const curso = new Curso(req.body)
    await curso.save()
    res.status(201).json(curso)
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el curso' })
  }
})

module.exports = router
