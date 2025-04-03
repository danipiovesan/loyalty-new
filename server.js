import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { database } from './src/lib/database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '0.0.0.0'

app.use(cors())
app.use(express.json())

// Servir arquivos estáticos do build
app.use(express.static(join(__dirname, 'dist')))

// Middleware de log
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Rotas da API
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, cpf, password, role, termsAccepted } = req.body
    const user = await database.createUser({
      name,
      email,
      cpf,
      password,
      role: role || 'patient',
      termsAccepted,
      termsAcceptedDate: termsAccepted ? new Date().toISOString() : null
    })
    const { password: _, ...userWithoutPassword } = user
    res.status(201).json(userWithoutPassword)
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    res.status(500).json({ error: 'Erro ao criar usuário' })
  }
})

app.get('/api/users', async (req, res) => {
  try {
    const { role } = req.query
    const users = await database.getUsers(role)
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })
    res.json(usersWithoutPasswords)
  } catch (error) {
    console.error('Erro ao listar usuários:', error)
    res.status(500).json({ error: 'Erro ao listar usuários' })
  }
})

// Rota para adicionar pontos
app.post('/api/users/:id/points', async (req, res) => {
  try {
    const { id } = req.params
    const { points, type, description } = req.body
    const updatedUser = await database.addPoints(id, points, type, description)
    const { password, ...userWithoutPassword } = updatedUser
    res.json(userWithoutPassword)
  } catch (error) {
    console.error('Erro ao adicionar pontos:', error)
    res.status(500).json({ error: 'Erro ao adicionar pontos' })
  }
})

// Todas as outras rotas não encontradas serão redirecionadas para o index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Erro interno do servidor' })
})

// Inicializa o banco e inicia o servidor
database.init()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Servidor rodando em http://${HOST}:${PORT}`)
    })
  })
  .catch(error => {
    console.error('Erro ao inicializar o servidor:', error)
    process.exit(1)
  })
