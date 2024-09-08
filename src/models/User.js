const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Definición del esquema del usuario
const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['user', 'admin'], default: 'user' },
    cursos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }]
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// Exportar el modelo de usuario
module.exports = mongoose.models.User || mongoose.model('User', userSchema)
