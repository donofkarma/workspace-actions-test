import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json' assert { type: 'json' };

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      compilerOptions: {
        emitDeclarationOnly: false,
        noEmit: false,
      },
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.ts', '.tsx'],
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime'],
    }),
  ],
  // Why is @babel/runtime a regex? https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
  external: [/@babel\/runtime/, 'react', 'react-dom'],
};
