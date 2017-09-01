const cpr = require('cpr')
const path = require('path')
const execa = require('execa')
const mkdirp = require('mkdirp')
const p = require('pify')
const fs = require('fs')

const cwd = process.cwd()

const createPackageJson = (name, author) => `
{
  "name": "${name}",
  "version": "0.0.0",
  "description": "",
  "main": "index.html",
  "scripts": {
    "dev": "next",
    "build": "next build && next export"
  },
  "author": "${author}",
  "license": "MIT",
  "dependencies": {
    "next": "*",
    "react": "*",
    "react-dom": "*"
  }
}
`

module.exports = async (name) => {
  const dir = path.resolve(cwd, name)
  const tmpDir = path.resolve(cwd, name)

  await p(mkdirp)(dir)

  const src = path.resolve(__dirname, '../templates')
  await p(cpr)(src, dir, {})

  const author = (await execa('npm', ['whoami'])).stdout
  await p(fs.writeFile)(path.resolve(dir, 'package.json'), createPackageJson(name, author), 'utf8')

  await execa('npm', ['i'], { cwd: dir, stdio: 'inherit' })

  console.log('>> Created dir:', name);
}
