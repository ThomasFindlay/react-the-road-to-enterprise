import clsx from 'clsx'

export type EventTab = 'all' | 'upcoming' | 'past'

type EventsTabsProps = {
  activeTab: EventTab
  setActiveTab: (tab: EventTab) => void
}

const activeTabClass = '!border-blue-500 text-blue-500'
const tabClass = 'px-2 pb-2 border-b border-transparent'

const EventsTabs = (props: EventsTabsProps) => {
  const { activeTab, setActiveTab } = props
  return (
    <div className="border-b border-blue-100 flex gap-4">
      <button
        className={clsx(tabClass, activeTab === 'all' && activeTabClass)}
        onClick={() => setActiveTab('all')}
      >
        All
      </button>
      <button
        className={clsx(tabClass, activeTab === 'upcoming' && activeTabClass)}
        onClick={() => setActiveTab('upcoming')}
      >
        Upcoming
      </button>
      <button
        className={clsx(tabClass, activeTab === 'past' && activeTabClass)}
        onClick={() => setActiveTab('past')}
      >
        Past
      </button>
    </div>
  )
}

export default EventsTabs
