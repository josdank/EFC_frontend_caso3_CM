import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import EntityList from './pages/EntityList.jsx'
import EntityForm from './pages/EntityForm.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { CASE } from './config/cases.js'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<Dashboard />} />
        {CASE.entities.map(e => (
          <Route
            key={e.key}
            path={`/app/${e.key}`}
            element={<EntityList entityKey={e.key} />}
          />
        ))}
        {CASE.entities.map(e => (
          <Route
            key={`${e.key}-new`}
            path={`/app/${e.key}/new`}
            element={<EntityForm entityKey={e.key} />}
          />
        ))}
        {CASE.entities.map(e => (
          <Route
            key={`${e.key}-edit`}
            path={`/app/${e.key}/:id`}
            element={<EntityForm entityKey={e.key} />}
          />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
