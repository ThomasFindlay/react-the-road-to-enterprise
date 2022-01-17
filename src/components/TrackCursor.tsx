import { useMousePosition } from '@/hooks/useMousePosition'

type TrackCursorProps = {}

const TrackCursor = (props: TrackCursorProps) => {
  const position = useMousePosition()

  return (
    <div>
      Last tracked position - x: {position.x}, y: {position.y}
    </div>
  )
}

export default TrackCursor
