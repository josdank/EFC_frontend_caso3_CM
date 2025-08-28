import { ALL_CASES } from '../config/cases.js'

const LS_KEY = 'efc_mock_db_v1'

function loadDB() {
  const raw = localStorage.getItem(LS_KEY)
  if (raw) return JSON.parse(raw)
  // iniciar semilla 
  const db = {}
  Object.values(ALL_CASES).forEach(c => {
    c.entities.forEach(e => {
      db[e.key] = []
      
      if (['usuarios', 'pacientes', 'especialidades'].includes(e.key)) {
        for (let i = 1; i <= 3; i++) {
          db[e.key].push({ id: i, nombre: `${e.name} ${i}`, email: `mail${i}@demo.com` })
        }
      }
    })
  })
  localStorage.setItem(LS_KEY, JSON.stringify(db))
  return db
}

function saveDB(db) {
  localStorage.setItem(LS_KEY, JSON.stringify(db))
}

export function mockList(entityKey) {
  const db = loadDB()
  return db[entityKey] || []
}

export function mockGet(entityKey, id) {
  const db = loadDB()
  return (db[entityKey] || []).find(x => String(x.id) === String(id))
}

export function mockCreate(entityKey, payload) {
  const db = loadDB()
  const list = db[entityKey] || []
  const id = list.length ? Math.max(...list.map(x => Number(x.id) || 0)) + 1 : 1
  const item = { id, ...payload }
  list.push(item)
  db[entityKey] = list
  saveDB(db)
  return item
}

export function mockUpdate(entityKey, id, payload) {
  const db = loadDB()
  const list = db[entityKey] || []
  const idx = list.findIndex(x => String(x.id) === String(id))
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...payload }
    db[entityKey] = list
    saveDB(db)
    return list[idx]
  }
  throw new Error('No existe el registro')
}

export function mockDelete(entityKey, id) {
  const db = loadDB()
  const list = db[entityKey] || []
  const newList = list.filter(x => String(x.id) !== String(id))
  db[entityKey] = newList
  saveDB(db)
  return { ok: true }
}
