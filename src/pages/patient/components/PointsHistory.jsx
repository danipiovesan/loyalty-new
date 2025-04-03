import React, { useState, useEffect } from 'react'

export default function PointsHistory({ userId }) {
  const [history, setHistory] = useState([
    {
      id: '1',
      date: '2023-09-01',
      points: 100,
      type: 'VISIT',
      description: 'Consulta de rotina'
    },
    {
      id: '2',
      date: '2023-09-15',
      points: 200,
      type: 'PROCEDURE',
      description: 'Limpeza dental'
    },
    {
      id: '3',
      date: '2023-09-20',
      points: 50,
      type: 'BONUS',
      description: 'Bônus de aniversário'
    }
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

  return (
    <div className="overflow-hidden">
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {history.map((event, eventIdx) => (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== history.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                      ${event.points >= 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                      {event.points >= 0 ? '+' : '-'}{Math.abs(event.points)}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">
                        {event.description}
                        <span className="font-medium text-gray-900 ml-2">
                          ({getTypeLabel(event.type)})
                        </span>
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
