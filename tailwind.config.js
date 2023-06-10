module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      'blurple': '#692EE7',
      'dark': '#692EE7',
      'light': '#fff',
    },
    fontFamily: {
      display: ['IBM Plex Mono', 'Menlo', 'monospace'],
      body: ['IBM Plex Mono', 'Menlo', 'monospace'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
    theme: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
    borderRadius: {
      'none': '0',
      'sm': '.125rem',
      DEFAULT: '.25rem',
      'lg': '.5rem',
      'full': '9999px',
    },
    backgroundSize: ({ theme }) => ({
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      ...theme('spacing')
    }),
  },
}