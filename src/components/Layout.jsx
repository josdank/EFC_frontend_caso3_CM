import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth.js'
import { CASE } from '../config/cases.js'
import { Menu, LogOut } from 'lucide-react'

export default function Layout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(true)

  const navItem = (e) => (
    <NavLink
      key={e.key}
      to={`/app/${e.key}`}
      className={({ isActive }) =>
        `block rounded-xl px-4 py-2 font-medium ${isActive ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'}`
      }>
      {e.name}
    </NavLink>
  )

  return (
    <div className="min-h-screen flex">
      <aside className={`bg-white border-r w-72 p-4 hidden md:block`}>
        <div className="flex items-center gap-3 mb-6">
          <img src="/logo.png" alt="logo" className="w-8 h-8" />
          <div>
            <h1 className="font-bold">EFC • {CASE.name}</h1>
            <p className="text-sm text-gray-500">{CASE.modulesTitle}</p>
          </div>
        </div>
        <nav className="space-y-1">{CASE.entities.filter(e => e.key !== 'usuarios').map(navItem)}</nav>
      </aside>

      <div className="flex-1">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <button className="md:hidden btn !px-3 !py-2" onClick={() => setOpen(!open)}><Menu size={18} /></button>
            <div className="font-semibold text-gray-700">Bienvenido - {user?.nombre || 'Usuario'}</div>
            <button className="btn" onClick={() => { logout(); navigate('/login') }}><LogOut size={18} />Salir</button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl p-4">
          {children}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-20 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-4 shadow">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="logo" className="w-8 h-8" />
              <div>
                <h1 className="font-bold">EFC • {CASE.name}</h1>
                <p className="text-sm text-gray-500">{CASE.modulesTitle}</p>
              </div>
            </div>
            <nav className="space-y-1">{CASE.entities.filter(e => e.key !== 'usuarios').map(navItem)}</nav>
          </div>
        </div>
      )}
    </div>
  )
}
