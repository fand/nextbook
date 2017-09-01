const marked = require('marked')

marked.setOptions({
  gfm: true,
  tables:true,
  breaks: true,
})

class Article {
  constructor(source) {
    this.title = source.trim().split('\n')[0].replace(/#+/, '').trim();
    this.body = marked(source)
  }

  toJSON() {
    return JSON.stringify({
      title: this.title,
      body: this.body,
    })
  }

  toJS() {
    return `
      import Layout from '../components/layout'
      const article = ${this.toJSON()}
      export default () => <Layout article={article}/>
    `;
  }
}

module.exports = Article
