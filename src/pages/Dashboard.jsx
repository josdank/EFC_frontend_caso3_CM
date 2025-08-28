import React from 'react'
import Layout from '../components/Layout.jsx'
import { CASE } from '../config/cases.js'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/auth.js'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CASE.entities.filter(e => e.key !== 'usuarios').map(e => (
          <Link to={`/app/${e.key}`} key={e.key} className="card hover:shadow-lg transition">
            <div className="text-sm text-gray-500 mb-1">{CASE.modulesTitle}</div>
            <div className="text-xl font-bold">{e.name}</div>
            <div className="mt-2 text-sm text-gray-600">Gestione {e.name.toLowerCase()} (CRUD)</div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}
