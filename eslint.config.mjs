import next from 'eslint-config-next'
import nextTs from 'eslint-config-next/typescript'

/**
 * Flat config, which is what ESLint 9 wants. eslint-config-next 16 already
 * exports flat arrays from both entry points, so no FlatCompat shim is needed.
 */
export default [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  ...next,
  ...nextTs,
]
