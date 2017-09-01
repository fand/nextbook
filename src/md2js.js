const fs = require('fs')
const path = require('path')
const p = require('pify')

const Article = require('./article')

const cwd = process.cwd()
const dir = path.resolve(cwd, 'nextbook')
const pagesDir = path.resolve(dir, 'pages')

const md2js = src => {
  const name = path.basename(src).replace('.md', '')
  const dst = path.resolve(pagesDir, (name === 'README' ? 'index' : name) + '.js')
  const article = new Article(fs.readFileSync(src, 'utf8'))
  p(fs.writeFile)(dst, article.toJS(), 'utf8')
    // .then(() => console.log('Updated ', dst))
    .catch(e => console.error(e))
}

module.exports = md2js
