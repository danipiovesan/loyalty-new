import React, { useState, useEffect } from 'react'
import useAuthStore from '../../stores/authStore'
import PointsHistory from './components/PointsHistory'
import RedemptionHistory from './components/RedemptionHistory'

export default function PatientDashboard() {
  const user = useAuthStore((state) => state.user)
  const [rewards, setRewards] = useState([])
  const [level, setLevel] = useState({
    name: 'Sorriso Iniciante',
    points: 0,
    benefits: 'Nível básico para novos clientes'
  })
  const [activeTab, setActiveTab] = useState('overview')

  // ... resto do código existente ...

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Bem-vindo(a), {user?.name}</h2>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('points')}
              className={`${
                activeTab === 'points'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Histórico de Pontos
            </button>
            <button
              onClick={() => setActiveTab('redemptions')}
              className={`${
                activeTab === 'redemptions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Histórico de Resgates
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Seus Pontos</h3>
                <p className="text-3xl font-bold">{user?.points}</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Seu Nível</h3>
                <p className="text-xl font-bold">{level.name}</p>
                <p className="text-sm text-gray-600 mt-2">{level.benefits}</p>
              </div>
            </div>

            {/* Resto do conteúdo da visão geral */}
          </>
        )}

        {activeTab === 'points' && <PointsHistory userId={user?.id} />}
        {activeTab === 'redemptions' && <RedemptionHistory userId={user?.id} />}
      </div>
    </div>
  )
}
