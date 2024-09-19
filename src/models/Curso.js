const mongoose = require('mongoose')

const cursoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true, min: 0 },
  profesores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' } // Relación con categoría
})

module.exports = mongoose.models.Curso || mongoose.model('Curso', cursoSchema)
