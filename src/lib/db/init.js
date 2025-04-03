import { createClient } from '@libsql/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function initDatabase() {
  const db = createClient({
    url: process.env.DATABASE_URL || 'file:loyalty.db'
  })

  try {
    // Ler e executar o schema SQL
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
    await db.execute(schema)

    // Criar usuário admin padrão se não existir
    const adminExists = await db.execute('SELECT * FROM users WHERE email = ?', ['admin@piodoze.com'])
    
    if (!adminExists.rows.length) {
      const hashedPassword = await bcrypt.hash('admin123', 10)
      await db.execute(`
        INSERT INTO users (id, name, email, cpf, password, role)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        'admin1',
        'Administrador',
        'admin@piodoze.com',
        '00000000000',
        hashedPassword,
        'admin'
      ])
    }

    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  }
}

initDatabase()
