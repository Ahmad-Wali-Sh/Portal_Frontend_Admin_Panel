/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    // ── Override container to match design system max-w-7xl ──────────────
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },

    extend: {
      // ── Design Token: Colors ─────────────────────────────────────────────
      colors: {
        background: '#FFFFFF',
        foreground: '#111827',
        border:     '#E5E7EB',

        primary: {
          DEFAULT: '#3B82F6',
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
          foreground: '#FFFFFF',
        },

        secondary: {
          DEFAULT: '#10B981',
          50:  '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          foreground: '#FFFFFF',
        },

        accent: {
          DEFAULT: '#F59E0B',
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          foreground: '#FFFFFF',
        },

        muted: {
          DEFAULT:    '#F3F4F6',
          foreground: '#6B7280',
        },

        destructive: {
          DEFAULT:    '#EF4444',
          foreground: '#FFFFFF',
        },

        // Sidebar-specific tokens
        sidebar: {
          bg:          '#FFFFFF',
          active:      '#EFF6FF',   // blue-50
          activeBorder:'#3B82F6',   // primary
          activeText:  '#2563EB',   // primary-600
          text:        '#374151',   // gray-700
          muted:       '#9CA3AF',   // gray-400
          group:       '#9CA3AF',   // group label
        },
      },

      // ── Design Token: Typography ─────────────────────────────────────────
      fontFamily: {
        sans:    ['Outfit', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },

      fontSize: {
        // Custom scale aligned with design system
        'xs':   ['0.75rem',  { lineHeight: '1rem' }],
        'sm':   ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem',     { lineHeight: '1.5rem' }],
        'lg':   ['1.125rem', { lineHeight: '1.75rem' }],
        'xl':   ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl':  ['1.5rem',   { lineHeight: '2rem',    letterSpacing: '-0.01em' }],
        '3xl':  ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl':  ['2.25rem',  { lineHeight: '2.5rem',  letterSpacing: '-0.02em' }],
        '5xl':  ['3rem',     { lineHeight: '1',        letterSpacing: '-0.02em' }],
        '6xl':  ['3.75rem',  { lineHeight: '1',        letterSpacing: '-0.02em' }],
      },

      fontWeight: {
        normal:    '400',
        medium:    '500',
        semibold:  '600',
        bold:      '700',
        extrabold: '800',
      },

      // ── Design Token: Border Radius ──────────────────────────────────────
      borderRadius: {
        none: '0px',
        sm:   '4px',
        DEFAULT: '6px',
        md:   '6px',
        lg:   '8px',
        xl:   '12px',
        '2xl':'16px',
        full: '9999px',   // pills only for tags
      },

      // ── Design Token: Shadows — ZERO ────────────────────────────────────
      // Flat design: hierarchy through color + scale, never shadow depth.
      boxShadow: {
        none:    'none',
        sm:      'none',
        DEFAULT: 'none',
        md:      'none',
        lg:      'none',
        xl:      'none',
        '2xl':   'none',
        inner:   'none',
      },

      // ── Design Token: Spacing ────────────────────────────────────────────
      spacing: {
        // Sidebar
        'sidebar':     '240px',
        'sidebar-sm':  '64px',
        // TopBar / BottomTabBar
        'topbar':      '64px',
        'bottombar':   '64px',
      },

      // ── Design Token: Transitions ────────────────────────────────────────
      transitionDuration: {
        DEFAULT: '200ms',
        fast:    '150ms',
        base:    '200ms',
        slow:    '300ms',
      },

      // ── Design Token: Z-index scale ──────────────────────────────────────
      zIndex: {
        hide:    '-1',
        base:     '0',
        raised:  '10',
        overlay: '20',
        sidebar: '30',
        modal:   '40',
        toast:   '50',
      },

      // ── Animation ────────────────────────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%':   { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },

      animation: {
        'fade-in':       'fade-in 200ms ease-out',
        'slide-in-left': 'slide-in-left 200ms ease-out',
        'slide-in-up':   'slide-in-up 200ms ease-out',
        'scale-in':      'scale-in 200ms ease-out',
      },
    },
  },

  plugins: [],
}