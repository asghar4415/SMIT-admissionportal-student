import { postcss } from "tailwindcss"

export default {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
  from: undefined, // Explicitly setting this to avoid the warning
}
