import React, { useState } from 'react'

export default function RedemptionList() {
  const [redemptions, setRedemptions] = useState([
    {
      id: '1',
      patientName: 'João Silva',
      rewardName: 'Limpeza Grátis',
      requestDate: '2023-08-20',
      status: 'pending'
    },
    {
      id: '2',
      patientName: 'Maria Santos',
      rewardName: 'Clareamento',
      requestDate: '2023-08-19',
      status: 'approved'
    }
  ])

  const handleStatusChange = (id, newStatus) => {
    setRedemptions(redemptions.map(redemption =>
      redemption.id === id ? { ...redemption, status: newStatus } : redemption
    ))
  }

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Pendente',
      approved: 'Aprovado',
      rejected: 'Rejeitado'
    }
    return statusMap[status] || status
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Solicitações de Resgate
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paciente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recompensa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {redemptions.map((redemption) => (
              <tr key={redemption.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {redemption.patientName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {redemption.rewardName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {redemption.requestDate}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(redemption.status)}`}>
                    {getStatusText(redemption.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {redemption.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(redemption.id, 'approved')}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => handleStatusChange(redemption.id, 'rejected')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Rejeitar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
