import { create } from 'zustand'
import { loginRequest } from '../lib/api.js'

export const useAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  async login(email, password) {
    set({ loading: true, error: null })
    try {
      const data = await loginRequest(email, password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      set({ user: data.user, token: data.token, loading: false })
      return true
    } catch (e) {
      set({ error: 'Usuario o contraseña incorrectos.', loading: false })
      return false
    }
  },
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null })
  },
}))
