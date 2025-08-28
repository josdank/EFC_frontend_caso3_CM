import React from 'react'
import Layout from '../components/Layout.jsx'
import FormRenderer from '../components/FormRenderer.jsx'
import { CASE } from '../config/cases.js'
import { listRequest, getRequest, createRequest, updateRequest } from '../lib/api.js'
import { useParams, useNavigate } from 'react-router-dom'

export default function EntityForm({ entityKey }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const entity = CASE.entities.find(e => e.key === entityKey)
  const [values, setValues] = React.useState({})
  const [lookups, setLookups] = React.useState({})
  const isEdit = Boolean(id)

  React.useEffect(() => {
    async function fetchData() {
      const v = {}
      const lk = {}
      for (const f of entity.fields) {
        if (f.type === 'select' || f.type === 'multiselect') {
          lk[f.ref] = await listRequest(f.ref)
        }
      }
      setLookups(lk)
      if (isEdit) {
        const data = await getRequest(entityKey, id)
        setValues(data || {})
      }
    }
    fetchData()
  }, [entityKey, id])

  async function onSubmit(e) {
    e.preventDefault()
    const payload = {}
    for (const f of entity.fields) {
      const val = values[f.key]
      if (f.required && (val === undefined || val === "" || (Array.isArray(val) && val.length === 0))) {
        alert(`El campo "${f.label}" es obligatorio.`)
        return
      }
      payload[f.key] = val
    }
    if (isEdit) {
      await updateRequest(entityKey, id, payload)
    } else {
      await createRequest(entityKey, payload)
    }
    navigate(`/app/${entityKey}`)
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{isEdit ? 'Editar' : 'Nuevo'} {entity.name.slice(0, -1)}</h2>
          <p className="text-gray-500 text-sm">{entity.name}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="card space-y-4">
        <FormRenderer fields={entity.fields} values={values} setValues={setValues} lookups={lookups} />
        <div className="flex gap-2">
          <button className="btn" type="submit">Guardar</button>
          <button className="btn !bg-gray-600 hover:!bg-gray-700" type="button" onClick={() => history.back()}>Cancelar</button>
        </div>
      </form>
    </Layout>
  )
}
