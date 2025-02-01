interface EventScheduleProps {
  items: string[]
}

export function EventSchedule({ items }: EventScheduleProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium dark:text-white">Event Schedule</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium dark:bg-gray-800">
              {index + 1}
            </div>
            <span className="flex-1 dark:text-white">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

