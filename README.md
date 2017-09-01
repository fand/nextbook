# nextbook - GitBook like static site generator with Next.js

## Usage

```sh
npm i -g nextbook
nextbook new blog
cd blog
npm i
nextbook serve
```


## Customize components

nextbook consists of 5 components: Layout, Navigation, NavigationBody, Content, and ContentBody.
To override default components, put `components/sidebar` or `components/content` like this:

<!-- TODO: put image here -->

### Customizing Navigation

```js
// components/navigation.js
import { NavigationBody } from 'nextbook'

export default (summary) => (
  <div>
    foo
    <NavigationBody summary={summary}/>
    bar
  </div>
)
```

### Customizing Content

```js
// components/content.js
import { ContentBody } from 'nextbook'

export default (content) => (
  <article>
    head
    <ContentBody content={content}/>
    foot
  </article>
)
```

### Customizing Layout

Put `components/layout.js`:

```js
// components/layout.js
import { Navigation, Content } from 'nextbook'

export default ({ summary, content }) => (
  <div>
    <header>
      <h1>THIS IS GLOBAL HEADER</h1>
    </header>
    <Navigation summary={summary}/>
    <Content content={content}/>
  </div>
)
```

If you wanna use customized `Sidebar` or `Content`, just import them:

```js
import Sidebar from './sidebar'
import Content from './content'
```


# License

MIT
