import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../store/auth.js'

export default function ProtectedRoute() {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return <Outlet />
}
