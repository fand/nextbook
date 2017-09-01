const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const mkdirp = require('mkdirp')
const p = require('pify')
const glob = require('glob')

const md2js = require('./md2js')

const cwd = process.cwd()
const dir = path.resolve(cwd, 'nextbook')
const pagesDir = path.resolve(dir, 'pages')

module.exports = async (dst) => {
  // mkdir -p nextbook
  await p(mkdirp)(pagesDir)

  const files = await p(glob)(cwd + '/src/**/*.md')
  files.forEach(md2js)

  // Run next.js
  await execa(
    path.resolve(cwd, 'node_modules/.bin/next'), ['build', dir],
    { stdio: 'inherit' }
  )
  await execa(
    path.resolve(cwd, 'node_modules/.bin/next'), ['export', dir, '-o', 'out'],
    { stdio: 'inherit' }
  )

  // Move out to dst
  if (dst && dst !== 'out') {
    const out = path.resolve(cwd, 'out')

    if (dst === '.') {
      const outs = await p(glob)(cwd + '/out/*')
      // await
      await Promise.all(outs.map(o =>
        p(fs.move)(o, path.relative(out, o))
      ))
    }
    else {
      await p(fs.rename)(out, path.resolve(cwd, dst))
    }

    await p(fs.remove)(out)
  }

  console.log('Built to', dst || 'out');
}
