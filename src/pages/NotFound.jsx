import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-gray-600">Página no encontrada.</p>
      <Link to="/" className="btn">Ir al inicio</Link>
    </div>
  )
}
