import React, { useState } from 'react'

export const useLayout = <
  T extends Record<string, string>,
  L extends Record<T[keyof T], React.ReactNode>
>(
  LAYOUTS: T,
  LAYOUT_COMPONENTS: L,
  initialLayout: T[keyof T]
) => {
  const [layout, setLayout] = useState<T[keyof T]>(initialLayout)
  const LayoutComponent = LAYOUT_COMPONENTS[layout]

  return {
    layout,
    setLayout,
    LayoutComponent,
    LAYOUTS,
  }
}
