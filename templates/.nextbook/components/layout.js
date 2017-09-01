import Head from 'next/head'
import Navigation from './navigation'
import Content from './content'

const summary = [
  { title: 'Hello', href: './' },
  { title: 'Hello again', href: './another' },
]

export default ({ article }) => (
  <div>
    <Head>
      <title>{article.title}</title>
      <meta charSet='utf-8' />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navigation summary={summary}/>
    <Content article={article}/>
  </div>
)
