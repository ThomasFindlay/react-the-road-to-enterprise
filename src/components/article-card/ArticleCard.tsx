import { Card, CardTitle, CardActions, CardContent } from '../card'

type Props = {
  title: string
  content?: React.ReactNode
  actions?: React.ReactNode
}

const ArticleCard = (props: Props) => {
  const { title, content, actions } = props
  return (
    <Card>
      <div>hello</div>
      {/* <CardTitle>{title}</CardTitle>
      <CardContent>{content}</CardContent>
      <CardActions>{actions}</CardActions> */}
    </Card>
  )
}

export default ArticleCard
