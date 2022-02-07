import { useState } from 'react'

export const useLayout = <
  L extends Record<string, (props: any) => JSX.Element>
>(
  LAYOUT_COMPONENTS: L,
  initialLayout: keyof L
) => {
  const [layout, setLayout] = useState(initialLayout)
  const LayoutComponent = LAYOUT_COMPONENTS[layout]

  return {
    layout,
    setLayout,
    LayoutComponent,
  }
}
