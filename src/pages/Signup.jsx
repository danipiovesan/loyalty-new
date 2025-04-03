import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  })
  const [error, setError] = useState('')
  const [showTerms, setShowTerms] = useState(false)
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
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          cpf: formData.cpf.replace(/\D/g, ''),
          email: formData.email,
          password: formData.password,
          termsAccepted: formData.termsAccepted,
          role: 'patient'
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erro ao criar conta')
      }

      const user = await response.json()
      setUser(user)
      navigate('/patient')
    } catch (err) {
      setError(err.message)
    }
  }

  // Resto do componente permanece o mesmo...
}
