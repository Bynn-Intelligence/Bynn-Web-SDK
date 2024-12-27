import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: 'src/core.ts',
  output: [
    {
      file: 'dist/bynn.js',
      format: 'umd',
      name: 'Bynn'
    },
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
};