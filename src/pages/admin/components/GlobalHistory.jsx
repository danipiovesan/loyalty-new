import React, { useState } from 'react'

export default function GlobalHistory() {
  const [activeTab, setActiveTab] = useState('points')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 40

  const [pointsHistory, setPointsHistory] = useState([
    // Dados mockados para teste
    ...Array(100).fill(null).map((_, i) => ({
      id: `p${i + 1}`,
      date: new Date(2023, 8, Math.floor(Math.random() * 30) + 1).toISOString(),
      patientName: `Paciente ${i + 1}`,
      points: Math.floor(Math.random() * 200) + 50,
      type: ['VISIT', 'PROCEDURE', 'BONUS', 'FAMILY', 'SOCIAL'][Math.floor(Math.random() * 5)],
      description: 'Descrição do evento'
    }))
  ])

  const [redemptionsHistory, setRedemptionsHistory] = useState([
    // Dados mockados para teste
    ...Array(100).fill(null).map((_, i) => ({
      id: `r${i + 1}`,
      date: new Date(2023, 8, Math.floor(Math.random() * 30) + 1).toISOString(),
      patientName: `Paciente ${i + 1}`,
      reward: ['Limpeza Grátis', 'Clareamento', 'Kit Dental'][Math.floor(Math.random() * 3)],
      points: Math.floor(Math.random() * 200) + 50,
      status: ['COMPLETED', 'PENDING', 'CANCELLED'][Math.floor(Math.random() * 3)]
    }))
  ])

  const getTypeLabel = (type) => {
    const types = {
      VISIT: 'Consulta',
      PROCEDURE: 'Procedimento',
      BONUS: 'Bônus',
      FAMILY: 'Bônus Familiar',
      SOCIAL: 'Redes Sociais'
    }
    return types[type] || type
  }

  const getStatusBadge = (status) => {
    const styles = {
      COMPLETED: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      CANCELLED: 'bg-red-100 text-red-800'
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status) => {
    const labels = {
      COMPLETED: 'Concluído',
      PENDING: 'Pendente',
      CANCELLED: 'Cancelado'
    }
    return labels[status] || status
  }

  const getCurrentPageData = () => {
    const data = activeTab === 'points' ? pointsHistory : redemptionsHistory
    const start = (currentPage - 1) * itemsPerPage
    return data.slice(start, start + itemsPerPage)
  }

  const totalPages = Math.ceil(
    (activeTab === 'points' ? pointsHistory.length : redemptionsHistory.length) / itemsPerPage
  )

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Histórico Global
        </h3>
        
        {/* Tabs */}
        <div className="mt-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => {
                setActiveTab('points')
                setCurrentPage(1)
              }}
              className={`${
                activeTab === 'points'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Histórico de Pontos
            </button>
            <button
              onClick={() => {
                setActiveTab('redemptions')
                setCurrentPage(1)
              }}
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
      </div>

      <div className="border-t border-gray-200">
        {activeTab === 'points' ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pontos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getCurrentPageData().map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {event.patientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getTypeLabel(event.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recompensa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pontos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getCurrentPageData().map((redemption) => (
                <tr key={redemption.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(redemption.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {redemption.patientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {redemption.reward}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {redemption.points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(redemption.status)}`}>
                      {getStatusLabel(redemption.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Paginação */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Próxima
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> até{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, activeTab === 'points' ? pointsHistory.length : redemptionsHistory.length)}
                </span> de{' '}
                <span className="font-medium">{activeTab === 'points' ? pointsHistory.length : redemptionsHistory.length}</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Primeira
                </button>
                <button
                  onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Anterior
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Próxima
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Última
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
