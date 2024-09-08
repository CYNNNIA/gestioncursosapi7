require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')
const Curso = require('./models/Curso')

// Conectar a la base de datos
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const seedDatabase = async () => {
  await User.deleteMany({})
  await Curso.deleteMany({})

  const admin = new User({
    nombre: 'Admin',
    email: 'admin@example.com',
    password: 'admin123',
    rol: 'admin'
  })
  await admin.save()

  const user = new User({
    nombre: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
  await user.save()

  const curso1 = new Curso({
    titulo: 'Curso de Node.js',
    descripcion: 'Aprende a crear APIs con Node.js',
    precio: 100,
    profesores: [admin._id]
  })
  await curso1.save()

  const curso2 = new Curso({
    titulo: 'Curso de MongoDB',
    descripcion: 'Aprende a usar MongoDB para bases de datos',
    precio: 80,
    profesores: [admin._id]
  })
  await curso2.save()

  mongoose.connection.close()
}

seedDatabase()
