import React, { useState } from 'react'
import PatientList from './components/PatientList'
import RewardList from './components/RewardList'
import RedemptionList from './components/RedemptionList'
import Analytics from './components/Analytics'
import LoyaltyRules from './components/LoyaltyRules'
import GlobalHistory from './components/GlobalHistory'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('patients')

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('patients')}
            className={`${
              activeTab === 'patients'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Pacientes
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`${
              activeTab === 'rewards'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Recompensas
          </button>
          <button
            onClick={() => setActiveTab('redemptions')}
            className={`${
              activeTab === 'redemptions'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Resgates
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`${
              activeTab === 'history'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Histórico
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`${
              activeTab === 'rules'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Regras
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`${
              activeTab === 'analytics'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Análises
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'patients' && <PatientList />}
        {activeTab === 'rewards' && <RewardList />}
        {activeTab === 'redemptions' && <RedemptionList />}
        {activeTab === 'history' && <GlobalHistory />}
        {activeTab === 'rules' && <LoyaltyRules />}
        {activeTab === 'analytics' && <Analytics />}
      </div>
    </div>
  )
}
