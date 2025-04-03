import React from 'react'

export default function Analytics() {
  const stats = {
    totalPatients: 150,
    activePatients: 120,
    totalPoints: 15000,
    averagePoints: 100,
    totalRedemptions: 45,
    pendingRedemptions: 8
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Análise do Programa
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 p-6">
          <div className="bg-gray-50 px-4 py-5 rounded-lg">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total de Pacientes
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.totalPatients}
            </dd>
          </div>

          <div className="bg-gray-50 px-4 py-5 rounded-lg">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Pacientes Ativos
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.activePatients}
            </dd>
          </div>

          <div className="bg-gray-50 px-4 py-5 rounded-lg">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total de Pontos Distribuídos
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.totalPoints}
            </dd>
          </div>

          <div className="bg-gray-50 px-4 py-5 rounded-lg">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Média de Pontos por Paciente
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.averagePoints}
            </dd>
          </div>

          <div className="bg-gray-50 px-4 py-5 rounded-lg">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total de Resgates
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.totalRedemptions}
            </dd>
          </div>

          <div className="bg-gray-50 px-4 py-5 rounded-lg">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Resgates Pendentes
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.pendingRedemptions}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
