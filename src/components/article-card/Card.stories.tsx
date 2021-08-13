import { ComponentMeta, ComponentStory } from '@storybook/react'
import ArticleCardComponent from './ArticleCard'
import styles from '../card/card.module.css'
export default {
  title: 'ArticleCard',
  component: ArticleCardComponent,
  argTypes: {},
} as ComponentMeta<typeof ArticleCardComponent>

const Template: ComponentStory<typeof ArticleCardComponent> = (args) => (
  <ArticleCardComponent {...args} />
)

export const ArticleCard = Template.bind({})
ArticleCard.args = {
  title: 'The latest features added to JavaScript',
  content: undefined,
  actions: undefined,
}
