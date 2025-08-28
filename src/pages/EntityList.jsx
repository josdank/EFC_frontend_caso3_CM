import React from 'react'
import Layout from '../components/Layout.jsx'
import DataTable from '../components/DataTable.jsx'
import { CASE } from '../config/cases.js'
import { listRequest, deleteRequest } from '../lib/api.js'
import { Link } from 'react-router-dom'

export default function EntityList({ entityKey }) {
  const entity = CASE.entities.find(e => e.key === entityKey)
  const [rows, setRows] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await listRequest(entityKey)
      setRows(Array.isArray(data) ? data : [])
    } catch (e) {
      setError('No se pudo cargar la información')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => { load() }, [entityKey])

  async function onDelete(id) {
    if (!confirm('¿Eliminar registro?')) return
    await deleteRequest(entityKey, id)
    load()
  }

  const columns = [{ key: 'id', label: 'ID' }].concat(
    (entity.fields || []).slice(0, 4).map(f => ({ key: f.key, label: f.label }))
  )

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{entity.name}</h2>
          <p className="text-gray-500 text-sm">Gestione {entity.name.toLowerCase()}</p>
        </div>
        <Link to={`/app/${entityKey}/new`} className="btn">Nuevo</Link>
      </div>

      {loading ? (
        <div className="card">Cargando…</div>
      ) : error ? (
        <div className="card text-red-600">{error}</div>
      ) : rows.length === 0 ? (
        <div className="card">Sin datos. Cree su primer registro.</div>
      ) : (
        <DataTable columns={columns} data={rows} basePath={`/app/${entityKey}`} onDelete={onDelete} />
      )}
    </Layout>
  )
}
