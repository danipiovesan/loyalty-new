import React, { useState } from 'react'

export default function AddPointsModal({ patient, onClose, onSubmit }) {
  const [points, setPoints] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(patient.id, points)
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Adicionar Pontos para {patient.name}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="points" className="block text-sm font-medium text-gray-700">
              Quantidade de Pontos
            </label>
            <input
              type="number"
              id="points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
