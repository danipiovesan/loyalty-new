import React, { useState } from 'react'

export default function LoyaltyRules() {
  const [rules, setRules] = useState({
    pointsPerVisit: 100,
    regularityBonus: 50,
    familyMultiplier: 2,
    birthdayMultiplier: 2,
    socialMediaBonus: 200,
    levels: [
      {
        name: 'Sorriso Iniciante',
        points: 0,
        benefits: 'Nível básico para novos clientes'
      },
      {
        name: 'Sorriso Radiante',
        points: 1000,
        benefits: 'Desconto de 10% em procedimentos estéticos'
      },
      {
        name: 'Sorriso Deslumbrante',
        points: 5000,
        benefits: 'Desconto de 15% em procedimentos estéticos + Kit dental premium'
      },
      {
        name: 'Sorriso Diamante',
        points: 10000,
        benefits: 'Desconto de 20% em todos os procedimentos + Atendimento VIP'
      }
    ]
  })

  const [editing, setEditing] = useState(false)
  const [tempRules, setTempRules] = useState(rules)

  const handleSave = () => {
    setRules(tempRules)
    setEditing(false)
  }

  const handleCancel = () => {
    setTempRules(rules)
    setEditing(false)
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Regras do Programa de Fidelidade
        </h3>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Editar Regras
          </button>
        ) : (
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Salvar
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Sistema de Pontuação</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pontos por Consulta/Procedimento
                </label>
                {editing ? (
                  <input
                    type="number"
                    value={tempRules.pointsPerVisit}
                    onChange={(e) => setTempRules({
                      ...tempRules,
                      pointsPerVisit: parseInt(e.target.value)
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600">{rules.pointsPerVisit} pontos</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bônus de Regularidade
                </label>
                {editing ? (
                  <input
                    type="number"
                    value={tempRules.regularityBonus}
                    onChange={(e) => setTempRules({
                      ...tempRules,
                      regularityBonus: parseInt(e.target.value)
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600">{rules.regularityBonus} pontos extras</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Multiplicador Familiar
                </label>
                {editing ? (
                  <input
                    type="number"
                    value={tempRules.familyMultiplier}
                    onChange={(e) => setTempRules({
                      ...tempRules,
                      familyMultiplier: parseInt(e.target.value)
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600">{rules.familyMultiplier}x pontos</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Multiplicador de Aniversário
                </label>
                {editing ? (
                  <input
                    type="number"
                    value={tempRules.birthdayMultiplier}
                    onChange={(e) => setTempRules({
                      ...tempRules,
                      birthdayMultiplier: parseInt(e.target.value)
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600">{rules.birthdayMultiplier}x pontos</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bônus Redes Sociais
                </label>
                {editing ? (
                  <input
                    type="number"
                    value={tempRules.socialMediaBonus}
                    onChange={(e) => setTempRules({
                      ...tempRules,
                      socialMediaBonus: parseInt(e.target.value)
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600">{rules.socialMediaBonus} pontos</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Níveis de Fidelidade</h4>
            <div className="space-y-4">
              {(editing ? tempRules.levels : rules.levels).map((level, index) => (
                <div key={index} className="border rounded-lg p-4">
                  {editing ? (
                    <>
                      <input
                        type="text"
                        value={level.name}
                        onChange={(e) => {
                          const newLevels = [...tempRules.levels]
                          newLevels[index] = {
                            ...newLevels[index],
                            name: e.target.value
                          }
                          setTempRules({
                            ...tempRules,
                            levels: newLevels
                          })
                        }}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-2"
                      />
                      <input
                        type="number"
                        value={level.points}
                        onChange={(e) => {
                          const newLevels = [...tempRules.levels]
                          newLevels[index] = {
                            ...newLevels[index],
                            points: parseInt(e.target.value)
                          }
                          setTempRules({
                            ...tempRules,
                            levels: newLevels
                          })
                        }}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-2"
                      />
                      <textarea
                        value={level.benefits}
                        onChange={(e) => {
                          const newLevels = [...tempRules.levels]
                          newLevels[index] = {
                            ...newLevels[index],
                            benefits: e.target.value
                          }
                          setTempRules({
                            ...tempRules,
                            levels: newLevels
                          })
                        }}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        rows={2}
                      />
                    </>
                  ) : (
                    <>
                      <h5 className="text-lg font-medium">{level.name}</h5>
                      <p className="text-sm text-gray-600">Pontos necessários: {level.points}</p>
                      <p className="text-sm text-gray-600 mt-2">{level.benefits}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
