import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

export default function PrivateRoute({ role }) {
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />
  }

  return <Outlet />
}
