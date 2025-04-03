import { createClient } from '@libsql/client'

const db = createClient({
  url: 'file:loyalty.db'
})

export const initDb = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT,
      name TEXT,
      cpf TEXT UNIQUE,
      birth_date TEXT,
      phone TEXT,
      points INTEGER DEFAULT 0,
      terms_accepted INTEGER DEFAULT 0,
      terms_accepted_date TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS points_history (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      points INTEGER,
      type TEXT,
      description TEXT,
      procedure_id TEXT,
      procedure_value REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS rewards (
      id TEXT PRIMARY KEY,
      name TEXT,
      description TEXT,
      points_required INTEGER,
      inventory INTEGER,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS redemptions (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      reward_id TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(reward_id) REFERENCES rewards(id)
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS loyalty_rules (
      id TEXT PRIMARY KEY,
      points_per_visit INTEGER,
      regularity_bonus INTEGER,
      family_multiplier INTEGER,
      birthday_multiplier INTEGER,
      social_media_bonus INTEGER,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS loyalty_levels (
      id TEXT PRIMARY KEY,
      name TEXT,
      points_required INTEGER,
      benefits TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export default db
