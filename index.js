const express = require('express')
const cors = require('cors')
const app = express()

// Conectar ao MongoDB
require('./db/conn')

// Middleware para JSON e form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS - Allow all for debugging
app.use(cors({ credentials: true, origin: '*' }))

// Pasta pública para imagens
app.use(express.static('public'))

// Rotas
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')
const ArvoresRoutes = require('./routes/ArvoresRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)
app.use('/arvores', ArvoresRoutes)

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err)
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' })
})

app.listen(5000, () => console.log('Servidor rodando na porta 5000'))
