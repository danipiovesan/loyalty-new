import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    birthDate: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.termsAccepted) {
      setError('Você precisa aceitar os termos do programa de fidelidade')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não conferem')
      return
    }

    try {
      // Simular criação de usuário
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        cpf: formData.cpf.replace(/\D/g, ''),
        birthDate: formData.birthDate,
        phone: formData.phone,
        role: 'patient',
        points: 0,
        termsAccepted: formData.termsAccepted,
        termsAcceptedDate: new Date().toISOString()
      }

      // Salvar usuário no estado global
      setUser(newUser)
      
      // Redirecionar para a dashboard do paciente
      navigate('/patient')
    } catch (err) {
      setError('Erro ao criar conta. Por favor, tente novamente.')
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Criar nova conta
          </h2>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Nome Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nome Completo"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="cpf" className="sr-only">
                CPF
              </label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="CPF (apenas números)"
                value={formData.cpf}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="birthDate" className="sr-only">
                Data de Nascimento
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Telefone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Telefone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Seu e-mail"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar Senha
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar Senha"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="termsAccepted"
              name="termsAccepted"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-900">
              Li e aceito os termos do programa de fidelidade
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
