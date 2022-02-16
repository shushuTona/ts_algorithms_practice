const { build } = require('esbuild');
const alias = require('esbuild-plugin-alias');
const glob = require('glob');
const entryPoints = glob.sync('./src/**/index.ts');

build({
  entryPoints,
  bundle: true,
  outbase: './src',
  outdir: './dist' ,
  platform: 'node',
  watch: false,
  minify: true,
  plugins: [
    alias({
      '@/': '/var/ts_algorithms_practice/src/',
    }),
  ],
});
