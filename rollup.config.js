import typescript from '@rollup/plugin-typescript';

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
    typescript()
  ]
};