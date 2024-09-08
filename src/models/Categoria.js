const mongoose = require('mongoose')

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true }
})

module.exports =
  mongoose.models.Categoria || mongoose.model('Categoria', categoriaSchema)
