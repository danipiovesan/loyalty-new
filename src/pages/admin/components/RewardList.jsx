import React, { useState } from 'react'

export default function RewardList() {
  const [rewards, setRewards] = useState([
    {
      id: '1',
      name: 'Limpeza Grátis',
      description: 'Ganhe uma sessão de limpeza dental gratuita',
      points_required: 100,
      inventory: 10
    },
    {
      id: '2',
      name: 'Clareamento',
      description: '50% de desconto no clareamento dental',
      points_required: 200,
      inventory: 5
    }
  ])

  const [editingReward, setEditingReward] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newReward, setNewReward] = useState({
    name: '',
    description: '',
    points_required: '',
    inventory: ''
  })

  const handleEdit = (reward) => {
    setEditingReward({ ...reward })
  }

  const handleSave = (id) => {
    setRewards(rewards.map(reward => 
      reward.id === id ? editingReward : reward
    ))
    setEditingReward(null)
  }

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir esta recompensa?')) {
      setRewards(rewards.filter(reward => reward.id !== id))
    }
  }

  const handleAdd = () => {
    const newId = (Math.max(...rewards.map(r => parseInt(r.id))) + 1).toString()
    setRewards([...rewards, { ...newReward, id: newId }])
    setShowAddForm(false)
    setNewReward({
      name: '',
      description: '',
      points_required: '',
      inventory: ''
    })
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Gerenciar Recompensas
        </h3>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          onClick={() => setShowAddForm(true)}
        >
          Nova Recompensa
        </button>
      </div>

      {showAddForm && (
        <div className="border-t border-gray-200 p-4">
          <h4 className="text-lg font-medium mb-4">Adicionar Nova Recompensa</h4>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Nome da Recompensa"
              className="border p-2 rounded"
              value={newReward.name}
              onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
            />
            <textarea
              placeholder="Descrição"
              className="border p-2 rounded"
              value={newReward.description}
              onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Pontos Necessários"
              className="border p-2 rounded"
              value={newReward.points_required}
              onChange={(e) => setNewReward({ ...newReward, points_required: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantidade Disponível"
              className="border p-2 rounded"
              value={newReward.inventory}
              onChange={(e) => setNewReward({ ...newReward, inventory: e.target.value })}
            />
            <div className="flex space-x-2">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleAdd}
              >
                Salvar
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => setShowAddForm(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-gray-200">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
          {rewards.map((reward) => (
            <div key={reward.id} className="border rounded-lg p-4">
              {editingReward?.id === reward.id ? (
                <>
                  <input
                    type="text"
                    className="w-full border p-2 rounded mb-2"
                    value={editingReward.name}
                    onChange={(e) => setEditingReward({
                      ...editingReward,
                      name: e.target.value
                    })}
                  />
                  <textarea
                    className="w-full border p-2 rounded mb-2"
                    value={editingReward.description}
                    onChange={(e) => setEditingReward({
                      ...editingReward,
                      description: e.target.value
                    })}
                  />
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="number"
                      className="w-1/2 border p-2 rounded"
                      value={editingReward.points_required}
                      onChange={(e) => setEditingReward({
                        ...editingReward,
                        points_required: e.target.value
                      })}
                      placeholder="Pontos"
                    />
                    <input
                      type="number"
                      className="w-1/2 border p-2 rounded"
                      value={editingReward.inventory}
                      onChange={(e) => setEditingReward({
                        ...editingReward,
                        inventory: e.target.value
                      })}
                      placeholder="Quantidade"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSave(reward.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditingReward(null)}
                      className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">{reward.name}</h3>
                  <p className="text-gray-600">{reward.description}</p>
                  <div className="mt-2">
                    <p className="text-sm">Pontos necessários: {reward.points_required}</p>
                    <p className="text-sm">Disponível: {reward.inventory}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(reward)}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(reward.id)}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                    >
                      Excluir
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
