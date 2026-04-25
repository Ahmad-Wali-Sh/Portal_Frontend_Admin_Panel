// ─────────────────────────────────────────────────────────────────────────────
// api.js — Shared Axios Instance
//
// All requests go through this instance. Base URL is read from the Vite env
// variable VITE_API_URL (falls back to http://localhost:8000 for local dev).
//
// Usage:
//   import api from '@/lib/api'
//   const res = await api.get('/api/students', { params: { search: 'ali' } })
// ─────────────────────────────────────────────────────────────────────────────

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

// ── Request interceptor — attach auth token when present ─────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('portal_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Response interceptor — normalise errors ──────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ??
      error?.message ??
      'An unexpected error occurred.'
    return Promise.reject(new Error(message))
  }
)

export default api