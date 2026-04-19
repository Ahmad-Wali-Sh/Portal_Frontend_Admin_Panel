// ─────────────────────────────────────────────────────────────────────────────
// tokens.js — Design Tokens as JavaScript constants
//
// Why this file exists:
//   Tailwind classes don't work inside Recharts, canvas, or anywhere that
//   needs actual color values at runtime. This file mirrors the design tokens
//   from tailwind.config.js so you can reference them in JS without magic
//   strings scattered throughout the codebase.
//
// Usage:
//   import { colors, chartColors } from '@/lib/tokens'
//   <Bar fill={colors.primary} />
//   tooltip={{ contentStyle: { background: colors.background } }}
// ─────────────────────────────────────────────────────────────────────────────

export const colors = {
  // ── Core palette ────────────────────────────────────────────────────────
  background:  '#FFFFFF',
  foreground:  '#111827',
  border:      '#E5E7EB',

  // ── Primary (Blue 500) ──────────────────────────────────────────────────
  primary: {
    50:  '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    DEFAULT: '#3B82F6',
  },

  // ── Secondary (Emerald 500) ─────────────────────────────────────────────
  secondary: {
    50:  '#ECFDF5',
    100: '#D1FAE5',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    DEFAULT: '#10B981',
  },

  // ── Accent (Amber 500) ──────────────────────────────────────────────────
  accent: {
    50:  '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    DEFAULT: '#F59E0B',
  },

  // ── Muted (Gray 100) ────────────────────────────────────────────────────
  muted: {
    DEFAULT:    '#F3F4F6',
    foreground: '#6B7280',
  },

  // ── Semantic ─────────────────────────────────────────────────────────────
  destructive: '#EF4444',
  success:     '#10B981',
  warning:     '#F59E0B',
  info:        '#3B82F6',

  // ── Gray scale ───────────────────────────────────────────────────────────
  gray: {
    50:  '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
}


// ─────────────────────────────────────────────────────────────────────────────
// Chart color sequences
// Used in Recharts: pie slices, bar series, line series
// ─────────────────────────────────────────────────────────────────────────────

/** Primary ordered palette for charts */
export const chartColors = [
  colors.primary.DEFAULT,   // Blue   — series 1
  colors.secondary.DEFAULT, // Emerald — series 2
  colors.accent.DEFAULT,    // Amber  — series 3
  '#EF4444',                // Red    — series 4
  '#8B5CF6',                // Violet — series 5
  '#EC4899',                // Pink   — series 6
]

/**
 * Get a chart color by index (wraps around if index > length).
 * @param {number} index
 * @returns {string}
 */
export function getChartColor(index) {
  return chartColors[index % chartColors.length]
}

/**
 * Paid status color map — used in payment badges and charts.
 */
export const paidStatusColors = {
  paid:    colors.secondary.DEFAULT,
  partial: colors.accent.DEFAULT,
  pending: colors.destructive,
}

/**
 * Exam session status color map.
 */
export const examStatusColors = {
  draft:     colors.muted.foreground,
  ongoing:   colors.primary.DEFAULT,
  finished:  colors.secondary.DEFAULT,
  cancelled: colors.destructive,
}

/**
 * Attendance color map.
 */
export const attendanceColors = {
  present: colors.secondary.DEFAULT,
  absent:  colors.destructive,
  tardy:   colors.accent.DEFAULT,
}


// ─────────────────────────────────────────────────────────────────────────────
// Recharts shared style objects
// Keeps chart styling consistent without repeating objects everywhere
// ─────────────────────────────────────────────────────────────────────────────

export const chartDefaults = {
  /** Tooltip container style — flat design, no shadow */
  tooltipStyle: {
    background:   colors.background,
    border:       `2px solid ${colors.border}`,
    borderRadius: '8px',
    boxShadow:    'none',
    fontFamily:   "'Outfit', sans-serif",
    fontSize:     '13px',
    color:        colors.foreground,
  },

  /** Legend text style */
  legendStyle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize:   '12px',
    color:      colors.muted.foreground,
  },

  /** CartesianGrid stroke */
  gridStroke: colors.border,

  /** Axis tick style */
  axisStyle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize:   '12px',
    fill:       colors.muted.foreground,
  },
}


// ─────────────────────────────────────────────────────────────────────────────
// Spacing — mirrors Tailwind spacing scale for dynamic use
// ─────────────────────────────────────────────────────────────────────────────
export const spacing = {
  sidebarWidth:   240,   // px — desktop sidebar
  topbarHeight:   64,    // px
  bottombarHeight: 64,   // px
}


// ─────────────────────────────────────────────────────────────────────────────
// Animation durations (ms) — for use in framer-motion or JS timers
// ─────────────────────────────────────────────────────────────────────────────
export const duration = {
  fast: 150,
  base: 200,
  slow: 300,
}