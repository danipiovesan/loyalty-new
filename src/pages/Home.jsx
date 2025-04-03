import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

export default function Home() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">
                Pio Doze Odontologia
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link
                  to={`/${user.role}`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Minha Conta
                </Link>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Programa de Fidelidade
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Acumule pontos e ganhe recompensas exclusivas em seus tratamentos odontológicos
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Sorriso Iniciante</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Comece sua jornada com benefícios exclusivos
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Sorriso Radiante</h3>
                <p className="mt-2 text-sm text-gray-500">
                  1.000 pontos - Descontos especiais
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Sorriso Deslumbrante</h3>
                <p className="mt-2 text-sm text-gray-500">
                  5.000 pontos - Benefícios premium
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Sorriso Diamante</h3>
                <p className="mt-2 text-sm text-gray-500">
                  10.000 pontos - Experiência VIP
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Comece Agora
          </Link>
        </div>
      </main>
    </div>
  )
}
