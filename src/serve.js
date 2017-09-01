const fs = require('fs')
const path = require('path')
const execa = require('execa')
const chokidar = require('chokidar')
const mkdirp = require('mkdirp')
const p = require('pify')

const md2js = require('./md2js')

const cwd = process.cwd()
const dir = path.resolve(cwd, 'nextbook')
const pagesDir = path.resolve(dir, 'pages')

module.exports = async () => {
  // mkdir -p nextbook
  await p(mkdirp)(pagesDir)

  // Watch Markdown files
  chokidar.watch(cwd + '/src/**/*.md', { cwd })
    .on('add', md2js)
    .on('change', md2js)

  // Run next.js
  execa(
    path.resolve(cwd, 'node_modules/.bin/next'),
    ['dev', dir],
    { stdio: 'inherit' }
  )
}
