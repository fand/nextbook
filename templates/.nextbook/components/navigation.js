import Link from 'next/link'

const renderItem = item => (
  <li>
    <Link href={item.href}>{item.title}</Link>
    {item.children ? renderList(item.children) : null}
  </li>
)

const renderList = list => (
  <ul>
    {list.map(renderItem)}
  </ul>
)

export default ({ summary }) => renderList(summary)
