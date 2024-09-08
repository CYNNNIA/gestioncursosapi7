const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const authMiddleware = require('../../middleware/auth')
const router = express.Router()

// Crear un nuevo usuario (registro)
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body
    const user = new User({ nombre, email, password })
    await user.save()
    res.status(201).json({ message: 'Usuario creado con éxito' })
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario' })
  }
})

// Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ error: 'Usuario no encontrado' })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' })

  const token = jwt.sign(
    { userId: user._id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
  res.json({ token })
})

// Obtener todos los usuarios (solo admin)
router.get('/', authMiddleware, async (req, res) => {
  if (req.user.rol !== 'admin') {
    return res
      .status(403)
      .json({ error: 'Acceso denegado, solo para administradores' })
  }
  const users = await User.find()
  res.json(users)
})

// Cambiar rol de un usuario (solo para admins)
router.put('/rol/:id', authMiddleware, async (req, res) => {
  try {
    const { rol } = req.body
    if (req.user.rol !== 'admin') {
      return res
        .status(403)
        .json({ error: 'No tienes permiso para cambiar roles' })
    }
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    user.rol = rol
    await user.save()
    res.json({ message: 'Rol actualizado', user })
  } catch (error) {
    res.status(400).json({ error: 'Error al cambiar el rol' })
  }
})

// Eliminar un usuario (admin puede eliminar a cualquier usuario, el usuario puede eliminarse a sí mismo)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    // Verificar si el usuario que hace la solicitud es el mismo que el que quiere eliminar o si es admin
    if (req.user.rol !== 'admin' && req.user.userId !== user._id.toString()) {
      return res
        .status(403)
        .json({ error: 'No tienes permiso para eliminar este usuario' })
    }

    await user.remove()
    res.json({ message: 'Usuario eliminado' })
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar el usuario' })
  }
})

module.exports = router
