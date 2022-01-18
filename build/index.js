const { build } = require('esbuild');
const glob = require('glob');
const entryPoints = glob.sync('./src/**/index.ts');

build({
  entryPoints,
  bundle: true,
  outfile: 'out.js',
  outbase: './src',
  outdir: './public' ,
  platform: 'node',
  watch: false,
});
