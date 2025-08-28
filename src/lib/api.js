import { BACKEND } from '../config/backend.js'
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api') + (BACKEND.basePath || '')
const MOCK = String(import.meta.env.VITE_MOCK || 'true') === 'true'

function getToken() {
  return localStorage.getItem('token')
}

function entityPath(entityKey) {
  const caseId = Number(import.meta.env.VITE_CASE_ID || 1)
  const caseCfg = BACKEND.cases[caseId] || {}
  const map = (caseCfg.entities || {})
  const p = map[entityKey] || `/${entityKey}`
  const base = BACKEND.defaultEntityBase || ''
  return `${base}${p}`
}

async function doFetch(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Error de red')
  }
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) return res.json()
  return res.text()
}

export async function apiFetch(path, options = {}) {
  if (MOCK) {
    throw new Error('MOCK_MODE')
  }
  return doFetch(path, options)
}

export async function loginRequest(email, password) {
  try {
    const data = await doFetch(BACKEND.auth.loginPath, {
      method: BACKEND.auth.method || 'POST',
      body: JSON.stringify({ email, password }),
    })
    const token = data?.[BACKEND.auth.tokenField || 'token']
    const user = data?.[BACKEND.auth.userField || 'user'] || { nombre: 'Usuario' }
    if (!token) throw new Error('Respuesta de login inválida')
    return { token, user }
  } catch (e) {
    if (MOCK) {
      return { token: 'demo-token', user: { id: 1, nombre: 'Usuario Demo', email } }
    }
    throw e
  }
}

export async function listRequest(entityKey) {
  try {
    const data = await apiFetch(entityPath(entityKey))
    return BACKEND.onAfterReceiveList(entityKey, data)
  } catch (e) {
    if (e.message === 'MOCK_MODE') {
      const { mockList } = await import('./mock.js')
      return mockList(entityKey)
    }
    throw e
  }
}

export async function getRequest(entityKey, id) {
  try {
    const data = await apiFetch(`${entityPath(entityKey)}/${id}`)
    return BACKEND.onAfterReceiveOne(entityKey, data)
  } catch (e) {
    if (e.message === 'MOCK_MODE') {
      const { mockGet } = await import('./mock.js')
      return mockGet(entityKey, id)
    }
    throw e
  }
}

export async function createRequest(entityKey, payload) {
  try {
    const body = JSON.stringify(BACKEND.onBeforeSend(entityKey, payload))
    return await apiFetch(entityPath(entityKey), { method: 'POST', body })
  } catch (e) {
    if (e.message === 'MOCK_MODE') {
      const { mockCreate } = await import('./mock.js')
      return mockCreate(entityKey, payload)
    }
    throw e
  }
}

export async function updateRequest(entityKey, id, payload) {
  try {
    const body = JSON.stringify(BACKEND.onBeforeSend(entityKey, payload))
    return await apiFetch(`${entityPath(entityKey)}/${id}`, { method: 'PUT', body })
  } catch (e) {
    if (e.message === 'MOCK_MODE') {
      const { mockUpdate } = await import('./mock.js')
      return mockUpdate(entityKey, id, payload)
    }
    throw e
  }
}

export async function deleteRequest(entityKey, id) {
  try {
    return await apiFetch(`${entityPath(entityKey)}/${id}`, { method: 'DELETE' })
  } catch (e) {
    if (e.message === 'MOCK_MODE') {
      const { mockDelete } = await import('./mock.js')
      return mockDelete(entityKey, id)
    }
    throw e
  }
}
