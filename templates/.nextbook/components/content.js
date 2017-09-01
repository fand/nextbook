export default (props) => (
  <article dangerouslySetInnerHTML={{ __html: props.article.body }}></article>
)
