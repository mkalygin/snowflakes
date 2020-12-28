import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/snowflakes.js',
  output: {
    name: 'snowflakes',
    file: 'dist/snowflakes.min.js',
    format: 'iife',
  },
  plugins: [
    buble({ objectAssign: 'Object.assign' }),
    terser()
  ],
};
