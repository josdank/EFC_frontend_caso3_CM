import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth.js'
import { CASE } from '../config/cases.js'

export default function Login() {
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('demo@demo.com')
  const [password, setPassword] = React.useState('123456')

  async function onSubmit(e) {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate('/app')
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="card w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <img src="/logo.svg" className="h-10 w-10" />
          <div>
            <h1 className="text-xl font-bold">Iniciar sesión</h1>
            <p className="text-sm text-gray-500">{CASE.name}</p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Clave</label>
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="btn w-full" disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</button>
        </form>
      </div>
    </div>
  )
}
