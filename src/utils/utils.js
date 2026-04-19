import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ─────────────────────────────────────────────────────────────────────────────
// cn — Tailwind class merger
// Combines clsx (conditional classes) + tailwind-merge (deduplication).
// Usage: cn('px-4 py-2', isActive && 'bg-primary text-white', className)
// ─────────────────────────────────────────────────────────────────────────────
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


// ─────────────────────────────────────────────────────────────────────────────
// Date utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format a date value into a readable string.
 * @param {string|Date|null|undefined} value
 * @param {'short'|'medium'|'long'} style
 * @returns {string}
 */
export function formatDate(value, style = 'medium') {
  if (!value) return '—'

  const date = value instanceof Date ? value : new Date(value)
  if (isNaN(date.getTime())) return '—'

  const formats = {
    short:  { day: '2-digit', month: '2-digit', year: 'numeric' },
    medium: { day: 'numeric', month: 'short', year: 'numeric' },
    long:   { day: 'numeric', month: 'long', year: 'numeric' },
  }

  return new Intl.DateTimeFormat('en-GB', formats[style]).format(date)
}

/**
 * Format a datetime value with time included.
 * @param {string|Date|null|undefined} value
 * @returns {string}
 */
export function formatDateTime(value) {
  if (!value) return '—'

  const date = value instanceof Date ? value : new Date(value)
  if (isNaN(date.getTime())) return '—'

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

/**
 * Returns a relative time string like "2 hours ago", "3 days ago".
 * @param {string|Date|null|undefined} value
 * @returns {string}
 */
export function timeAgo(value) {
  if (!value) return '—'

  const date  = value instanceof Date ? value : new Date(value)
  const now   = new Date()
  const diffMs = now - date

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours   = Math.floor(minutes / 60)
  const days    = Math.floor(hours   / 24)
  const weeks   = Math.floor(days    / 7)
  const months  = Math.floor(days    / 30)

  if (seconds < 60)   return 'just now'
  if (minutes < 60)   return `${minutes}m ago`
  if (hours   < 24)   return `${hours}h ago`
  if (days    <  7)   return `${days}d ago`
  if (weeks   <  5)   return `${weeks}w ago`
  if (months  < 12)   return `${months}mo ago`
  return formatDate(date)
}


// ─────────────────────────────────────────────────────────────────────────────
// Number / Currency utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format a decimal number as currency.
 * @param {number|string|null|undefined} amount
 * @param {string} currency  ISO 4217 code, default 'USD'
 * @param {string} locale
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  if (amount === null || amount === undefined || amount === '') return '—'
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(num)) return '—'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

/**
 * Format a plain number with thousand separators.
 * @param {number|string|null|undefined} value
 * @returns {string}
 */
export function formatNumber(value) {
  if (value === null || value === undefined || value === '') return '—'
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '—'
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Format a percentage value.
 * @param {number|string|null|undefined} value  — expects 0–100 range
 * @param {number} decimals
 * @returns {string}
 */
export function formatPercent(value, decimals = 1) {
  if (value === null || value === undefined || value === '') return '—'
  const num = parseFloat(value)
  if (isNaN(num)) return '—'
  return `${num.toFixed(decimals)}%`
}


// ─────────────────────────────────────────────────────────────────────────────
// String utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Get initials from a full name.
 * "Ahmed Al-Rashid" → "AA"
 * @param {string} name
 * @param {string} [lastname]
 * @returns {string}
 */
export function getInitials(name, lastname) {
  const parts = lastname
    ? [name, lastname]
    : (name ?? '').trim().split(/\s+/)

  return parts
    .slice(0, 2)
    .map((p) => (p?.[0] ?? '').toUpperCase())
    .join('')
}

/**
 * Truncate a string to a max length, appending ellipsis.
 */
export function truncate(str, maxLength = 40) {
  if (!str) return ''
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 1) + '…'
}

/**
 * Convert a snake_case or camelCase string to Title Case.
 * "paid_status_id" → "Paid Status"
 */
export function toTitleCase(str) {
  if (!str) return ''
  return str
    .replace(/_id$/, '')
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}


// ─────────────────────────────────────────────────────────────────────────────
// Object / Array utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Safely access a deeply nested value using a dot-notation key.
 * Used by MasterTable to resolve column keys like "gender.name".
 * @param {object} obj
 * @param {string} path  e.g. "gender.name" or "studentClass.student.name"
 * @returns {any}
 */
export function getNestedValue(obj, path) {
  if (!obj || !path) return undefined
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

/**
 * Remove undefined/null entries from an object.
 * Useful for cleaning query params before sending to API.
 */
export function cleanParams(params) {
  return Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  )
}

/**
 * Group an array of objects by a key.
 * groupBy(navigation, 'group') → { People: [...], Academic: [...] }
 */
export function groupBy(array, key) {
  return array.reduce((acc, item) => {
    const group = item[key] ?? 'Other'
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {})
}


// ─────────────────────────────────────────────────────────────────────────────
// CSV Export utility
// Used by MasterExport — no external dependency needed.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert an array of objects to a CSV string and trigger a download.
 * @param {object[]} rows
 * @param {Array<{ key: string, label: string }>} columns
 * @param {string} filename
 */
export function exportToCSV(rows, columns, filename = 'export') {
  const header = columns.map((c) => `"${c.label}"`).join(',')

  const body = rows.map((row) =>
    columns
      .map((col) => {
        const value = getNestedValue(row, col.key)
        if (value === null || value === undefined) return '""'
        const str = String(value).replace(/"/g, '""')
        return `"${str}"`
      })
      .join(',')
  )

  const csv = [header, ...body].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}-${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}