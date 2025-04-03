import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

export default function Navigation() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">
                Pio Doze Odontologia
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
