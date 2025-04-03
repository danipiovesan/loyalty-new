import bcrypt from 'bcryptjs'
import { getUserByEmail, getUserByCPF } from './database'

export async function authenticateUser(email, password) {
  const user = await getUserByEmail(email)
  if (!user) {
    return null
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return null
  }

  // Remove senha antes de retornar
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function validateNewUser(userData) {
  const errors = []

  // Verifica se email já existe
  const existingEmail = await getUserByEmail(userData.email)
  if (existingEmail) {
    errors.push('Email já cadastrado')
  }

  // Verifica se CPF já existe
  const existingCPF = await getUserByCPF(userData.cpf)
  if (existingCPF) {
    errors.push('CPF já cadastrado')
  }

  // Validação de senha
  if (userData.password.length < 6) {
    errors.push('A senha deve ter no mínimo 6 caracteres')
  }

  // Validação de CPF
  const cpfNumbers = userData.cpf.replace(/\D/g, '')
  if (cpfNumbers.length !== 11) {
    errors.push('CPF inválido')
  }

  // Validação dos termos
  if (!userData.termsAccepted) {
    errors.push('É necessário aceitar os termos do programa')
  }

  return errors
}
