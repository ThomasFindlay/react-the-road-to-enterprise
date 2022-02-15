import React from 'react'

type ListManagerProps<P> = {
  items: P[]
  keyExtractor: (item: P) => string | number
  renderItem: (item: P, index: number) => React.ReactNode
}

const ListManager = <P,>(props: ListManagerProps<P>) => {
  const { items, keyExtractor, renderItem } = props
  return (
    <div>
      {items.map((item, index) => {
        return <div key={keyExtractor(item)}>{renderItem(item, index)}</div>
      })}
    </div>
  )
}

export default ListManager
