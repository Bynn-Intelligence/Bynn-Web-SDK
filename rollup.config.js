import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const cssInject = `
function injectStyles(css) {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.setAttribute('data-bynn', '');
    style.textContent = css;
    document.head.appendChild(style);
  }
}
`;

const postcssPlugins = [
  autoprefixer(),
  cssnano({
    preset: ['default', {
      discardComments: {
        removeAll: true,
      },
    }],
  }),
];

const commonPlugins = [
  json(),
  postcss({
    plugins: postcssPlugins,
    extract: false,
    modules: false,
    autoModules: false,
    minimize: true,
    inject: cssInject
  }),
  typescript({ tsconfig: './tsconfig.json' })
];

export default [
  // ESM build
  {
    input: 'src/core.ts',
    output: {
      file: 'dist/bynn.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins: commonPlugins
  },
  // UMD builds
  {
    input: 'src/core.ts',
    output: [
      {
        file: 'dist/bynn.js',
        format: 'umd',
        name: 'Bynn',
        sourcemap: true
      },
      {
        file: 'dist/bynn.min.js',
        format: 'umd',
        name: 'Bynn',
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins: commonPlugins
  }
];