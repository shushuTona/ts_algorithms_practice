const { build } = require('esbuild');
const glob = require('glob');
const entryPoints = glob.sync('./src/**/index.ts');

build({
  entryPoints,
  bundle: true,
  outbase: './src',
  outdir: './dist' ,
  platform: 'node',
  watch: false,
});
