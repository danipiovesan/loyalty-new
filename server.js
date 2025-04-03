import express from 'express'
import cors from 'cors'
import { database } from './src/lib/database.js'
import bcrypt from 'bcryptjs'

const app = express()

app.use(cors())
app.use(express.json())

// Middleware de log
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Erro interno do servidor' })
})

// Rota para criar novo usuário
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, cpf, password, role, termsAccepted } = req.body

    // Verifica se usuário já existe
    const existingUser = await database.getUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' })
    }

    const existingCPF = await database.getUserByCPF(cpf)
    if (existingCPF) {
      return res.status(400).json({ error: 'CPF já cadastrado' })
    }

    // Cria o usuário
    const user = await database.createUser({
      name,
      email,
      cpf,
      password,
      role: role || 'patient',
      termsAccepted,
      termsAcceptedDate: termsAccepted ? new Date().toISOString() : null
    })

    // Remove a senha antes de enviar
    const { password: _, ...userWithoutPassword } = user
    res.status(201).json(userWithoutPassword)
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    res.status(500).json({ error: 'Erro ao criar usuário' })
  }
})

// Rota para listar usuários
app.get('/api/users', async (req, res) => {
  try {
    const { role } = req.query
    console.log('Buscando usuários com role:', role)
    
    const users = await database.getUsers(role)
    console.log('Usuários encontrados:', users.length)
    
    // Remove as senhas antes de enviar
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

// Inicializa o banco e inicia o servidor
database.init()
  .then(() => {
    app.listen(8080, () => {
      console.log('Servidor rodando na porta 8080')
    })
  })
  .catch(error => {
    console.error('Erro ao inicializar o servidor:', error)
    process.exit(1)
  })
