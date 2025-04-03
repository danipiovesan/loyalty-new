import React, { useState, useEffect } from 'react'
import AddPointsModal from './AddPointsModal'

export default function PatientList() {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showAddPoints, setShowAddPoints] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simular dados de pacientes para teste
      const mockPatients = [
        {
          id: '1',
          name: 'Paciente Teste',
          email: 'paciente@teste.com',
          cpf: '11111111111',
          points: 100,
          role: 'patient'
        },
        {
          id: '2',
          name: 'João Silva',
          email: 'joao@example.com',
          cpf: '22222222222',
          points: 500,
          role: 'patient'
        },
        {
          id: '3',
          name: 'Maria Santos',
          email: 'maria@example.com',
          cpf: '33333333333',
          points: 1500,
          role: 'patient'
        }
      ]
      
      setPatients(mockPatients)
    } catch (err) {
      console.error('Erro ao carregar pacientes:', err)
      setError('Erro ao carregar pacientes. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddPoints = async (patientId, points) => {
    try {
      // Simular adição de pontos
      setPatients(patients.map(patient => 
        patient.id === patientId 
          ? { ...patient, points: patient.points + parseInt(points) }
          : patient
      ))
      setShowAddPoints(false)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Gerenciar Pacientes
        </h3>
        <div className="flex space-x-3">
          <button
            onClick={fetchPatients}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
          >
            Atualizar Lista
          </button>
        </div>
      </div>

      {error && (
        <div className="m-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative">
          {error}
          <button
            className="ml-4 underline"
            onClick={fetchPatients}
          >
            Tentar novamente
          </button>
        </div>
      )}

      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CPF
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pontos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nível
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  Nenhum paciente encontrado
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {patient.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.points || 0}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${patient.points >= 10000 ? 'bg-purple-100 text-purple-800' :
                        patient.points >= 5000 ? 'bg-blue-100 text-blue-800' :
                        patient.points >= 1000 ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {patient.points >= 10000 ? 'Diamante' :
                        patient.points >= 5000 ? 'Deslumbrante' :
                        patient.points >= 1000 ? 'Radiante' :
                        'Iniciante'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedPatient(patient)
                        setShowAddPoints(true)
                      }}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Adicionar Pontos
                    </button>
                    <button
                      onClick={() => {/* Implementar visualização detalhada */}}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {showAddPoints && (
        <AddPointsModal
          patient={selectedPatient}
          onClose={() => setShowAddPoints(false)}
          onSubmit={handleAddPoints}
        />
      )}
    </div>
  )
}
