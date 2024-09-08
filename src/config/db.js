const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Conectado a MongoDB Atlas')
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err)
    process.exit(1)
  }
}

module.exports = connectDB
