-- Esquema do banco de dados

-- Usuários
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
);

-- Histórico de Pontos
CREATE TABLE IF NOT EXISTS points_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  points INTEGER NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  procedure_id TEXT,
  procedure_value REAL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Recompensas
CREATE TABLE IF NOT EXISTS rewards (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL,
  inventory INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Resgates
CREATE TABLE IF NOT EXISTS redemptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  reward_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(reward_id) REFERENCES rewards(id)
);

-- Regras do Programa
CREATE TABLE IF NOT EXISTS loyalty_rules (
  id TEXT PRIMARY KEY,
  points_per_visit INTEGER DEFAULT 100,
  regularity_bonus INTEGER DEFAULT 50,
  family_multiplier INTEGER DEFAULT 2,
  birthday_multiplier INTEGER DEFAULT 2,
  social_media_bonus INTEGER DEFAULT 200,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Níveis de Fidelidade
CREATE TABLE IF NOT EXISTS loyalty_levels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  points_required INTEGER NOT NULL,
  benefits TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados iniciais
INSERT OR IGNORE INTO loyalty_rules (id) VALUES ('default');

INSERT OR IGNORE INTO loyalty_levels (id, name, points_required, benefits) VALUES
  ('level1', 'Sorriso Iniciante', 0, 'Nível básico para novos clientes'),
  ('level2', 'Sorriso Radiante', 1000, 'Desconto de 10% em procedimentos estéticos'),
  ('level3', 'Sorriso Deslumbrante', 5000, 'Desconto de 15% em procedimentos estéticos + Kit dental premium'),
  ('level4', 'Sorriso Diamante', 10000, 'Desconto de 20% em todos os procedimentos + Atendimento VIP');

-- Criar índices
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_cpf ON users(cpf);
CREATE INDEX IF NOT EXISTS idx_points_history_user_id ON points_history(user_id);
CREATE INDEX IF NOT EXISTS idx_redemptions_user_id ON redemptions(user_id);
CREATE INDEX IF NOT EXISTS idx_redemptions_status ON redemptions(status);
