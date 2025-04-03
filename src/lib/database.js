import { createClient } from '@libsql/client'
import bcrypt from 'bcryptjs'

const db = createClient({
  url: 'http://localhost:8080',
  authToken: 'development_token'
})

class Database {
  async init() {
    try {
      // Usuários
      await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          cpf TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'patient',
          points INTEGER DEFAULT 0,
          birth_date TEXT,
          phone TEXT,
          terms_accepted BOOLEAN DEFAULT FALSE,
          terms_accepted_date TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `)

      // Verificar se existe usuário admin
      const adminExists = await this.getUserByEmail('admin@piodoze.com')
      if (!adminExists) {
        // Criar usuário admin padrão
        await this.createUser({
          name: 'Administrador',
          email: 'admin@piodoze.com',
          cpf: '00000000000',
          password: 'admin123',
          role: 'admin'
        })
      }

      // Verificar se existe usuário teste
      const testUserExists = await this.getUserByEmail('paciente@teste.com')
      if (!testUserExists) {
        // Criar usuário teste padrão
        await this.createUser({
          name: 'Paciente Teste',
          email: 'paciente@teste.com',
          cpf: '11111111111',
          password: '123456',
          role: 'patient'
        })
      }

      console.log('Banco de dados inicializado com sucesso')
    } catch (error) {
      console.error('Erro ao inicializar banco de dados:', error)
      throw error
    }
  }

  async createUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10)
      const userId = crypto.randomUUID()

      await db.execute(`
        INSERT INTO users (
          id, name, email, cpf, password, role, 
          terms_accepted, terms_accepted_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        userId,
        userData.name,
        userData.email,
        userData.cpf,
        hashedPassword,
        userData.role || 'patient',
        userData.termsAccepted || false,
        userData.termsAccepted ? new Date().toISOString() : null
      ])

      return this.getUserById(userId)
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      throw error
    }
  }

  async getUsers(role = null) {
    try {
      let query = 'SELECT * FROM users'
      const params = []

      if (role) {
        query += ' WHERE role = ?'
        params.push(role)
      }

      query += ' ORDER BY created_at DESC'

      const result = await db.execute(query, params)
      return result.rows
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      throw error
    }
  }

  async getUserById(id) {
    try {
      const result = await db.execute('SELECT * FROM users WHERE id = ?', [id])
      return result.rows[0]
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error)
      throw error
    }
  }

  async getUserByEmail(email) {
    try {
      const result = await db.execute('SELECT * FROM users WHERE email = ?', [email])
      return result.rows[0]
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error)
      throw error
    }
  }

  async getUserByCPF(cpf) {
    try {
      const result = await db.execute('SELECT * FROM users WHERE cpf = ?', [cpf])
      return result.rows[0]
    } catch (error) {
      console.error('Erro ao buscar usuário por CPF:', error)
      throw error
    }
  }

  async addPoints(userId, points, type, description = '') {
    try {
      await db.execute(`
        UPDATE users 
        SET points = points + ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [points, userId])

      return this.getUserById(userId)
    } catch (error) {
      console.error('Erro ao adicionar pontos:', error)
      throw error
    }
  }
}

export const database = new Database()
export default database
