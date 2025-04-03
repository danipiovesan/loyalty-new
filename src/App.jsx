import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import PatientDashboard from './pages/patient/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import Home from './pages/Home'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/patient" element={<PrivateRoute role="patient" />}>
        <Route element={<Layout />}>
          <Route index element={<PatientDashboard />} />
        </Route>
      </Route>

      <Route path="/admin" element={<PrivateRoute role="admin" />}>
        <Route element={<Layout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
