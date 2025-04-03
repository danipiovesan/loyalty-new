const API_URL = 'http://localhost:8080/api'

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  
  if (!response.ok) {
    throw new Error('Erro ao fazer login')
  }
  
  return response.json()
}

export async function register(userData) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  
  if (!response.ok) {
    throw new Error('Erro ao criar usuário')
  }
  
  return response.json()
}
