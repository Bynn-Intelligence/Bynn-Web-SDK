import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default [
  // ESM build
  {
    input: 'src/core.ts',
    output: [
      {
        file: 'dist/bynn.esm.js',
        format: 'es'
      }
    ],
    plugins: [
      json(),
      typescript({
        tsconfig: './tsconfig.json'
      })
    ]
  },
  // UMD build
  {
    input: 'src/core.ts',
    output: [
      {
        file: 'dist/bynn.js',
        format: 'umd',
        name: 'Bynn'
      }
    ],
    plugins: [
      json(),
      typescript({
        tsconfig: './tsconfig.json'
      })
    ]
  },
  // Minified UMD build
  {
    input: 'src/core.ts',
    output: [
      {
        file: 'dist/bynn.min.js',
        format: 'umd',
        name: 'Bynn',
        sourcemap: true
      }
    ],
    plugins: [
      json(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true
        }
      })
    ]
  }
];