import express from 'express'
import Curso from '../../models/Curso'
const router = express.Router()

// Obtener todos los cursos
router.get('/', async (_, res) => {
  const cursos = await Curso.find().populate('categoria')
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

// Actualizar un curso
router.put('/:id', async (req, res) => {
  try {
    const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!curso) return res.status(404).json({ error: 'Curso no encontrado' })
    res.json(curso)
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el curso' })
  }
})

// Eliminar un curso
router.delete('/:id', async (req, res) => {
  try {
    const curso = await Curso.findByIdAndDelete(req.params.id)
    if (!curso) return res.status(404).json({ error: 'Curso no encontrado' })
    res.json({ message: 'Curso eliminado' })
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar el curso' })
  }
})

export default router
