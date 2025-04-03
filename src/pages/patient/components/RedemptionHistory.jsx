import React, { useState } from 'react'

export default function RedemptionHistory({ userId }) {
  const [history, setHistory] = useState([
    {
      id: '1',
      date: '2023-09-10',
      reward: 'Limpeza Grátis',
      points: 100,
      status: 'COMPLETED'
    },
    {
      id: '2',
      date: '2023-09-25',
      reward: 'Clareamento',
      points: 200,
      status: 'PENDING'
    }
  ])

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

  return (
    <div className="overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
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
          {history.map((redemption) => (
            <tr key={redemption.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(redemption.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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
    </div>
  )
}
