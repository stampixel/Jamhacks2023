module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      'blurple': '#501ceb',
      'blight': '#7040ff',
      'dark': '#19191C',
      'white': '#fff',
      'gray': '#808080'
    },
    fontFamily: {
      'syne': 'Syne'
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

    width:{
      buttonSize:{
        'smallx' : '12rem'
      },

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